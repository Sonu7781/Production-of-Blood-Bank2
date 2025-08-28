

const { mongoose } = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// create inventory
const createInventoryController=async(req,res)=>{
    try{
    const { email} = req.body;
    // validation
    const user = await userModel.findOne({ email });
    if(!user){
        throw new Error('User Not Found')
    }
    // if(inventoryType === 'in' && user.role !== 'donar'){
    //     throw new Error('Not a doner account');
    // }
    // if(inventoryType === "out" && user.role !=='hospital'){
    //     throw new Error('No a hospital')
    // }

    if (req.body.inventoryType == 'out') {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.userId)

      //calculate Blood Quanitity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: 'in',
            bloodGroup: requestedBloodGroup,
          }
        },
        {
          $group: {
            _id: '$bloodGroup',
            total: { $sum : '$quantity' },
          },
        },
      ]);
      // console.log("Total In", totalInOfRequestedBlood);
      const totalIn=totalInOfRequestedBlood[0]?.total || 0;
       //calculate Blood Quanitity
      const totalOutOfRequestedBloodGroup=await inventoryModel.aggregate([
        {$match:{
          organisation,
          inventoryType:'out',
          bloodGroup:requestedBloodGroup
        }},
        {
          $group:{
            _id:'$bloodGroup',
            total:{$sum:'$quantity'}
          },
        },
      ]);
      const totalOut=totalOutOfRequestedBloodGroup[0]?.total || 0;

      // in & out calculation
      const availableQuantityOfBloodGroup=totalIn-totalOut;
      if(availableQuantityOfBloodGroup < requestedBloodGroup){
        return res.status(500).send({
          success:false,
          message:`Only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`
        });
      }
      req.body.hospital=user?._id;
    }else{
      req.body.donar=user?._id;
    }

    // save record
    const inventory = new inventoryModel(req.body)
    await inventory.save()
    return res.status(201).send({
        success:true,
        message:'New Blood React Added'
    })
    }catch(error){
      console.log(error);
      return res.status(500).send({
          success:false,
          message:'Error In Create Inventory API',
          error
      })
    }
};

// get all blood records
const getInventoryController=async(req,res)=>{
  try{
    const inventory=await inventoryModel.find({
        organisation:req.userId,
    })
    .populate("donar")
    .populate("hospital")
    .sort({createdAt:-1});
    return res.status(200).send({
        success:true,
        message:"get all records successfully",
        inventory,
    });
  }catch(error){
    console.log(error);
    return res.status(500).send({
        success:false,
        message:'Error in Get All Inventory',
        error
    });
  };
}


// get Hospital blood records
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donar", "name email")               // only name + email
      .populate("hospital", "name email")           // only name + email
      .populate("organisation", "organisationName") // only organisationName
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "Hospital inventory records fetched successfully",
      inventory,
    });
  } catch (error) {
    console.error("Error in getInventoryHospitalController:", error);
    return res.status(500).send({
      success: false,
      message: "Error in Get Hospital Inventory",
      error,
    });
  }
};



// Get blood Record of 10
const getRecentInventoryController=async(req,res)=>{
  try{
    const inventory=await inventoryModel.find({
      organisation:req.userId
    }).limit(10).sort({createdAt: -1})
    return res.status(200).send({
      success:true,
      message:'resent Inventory Data',
      inventory
    });
  }catch(error){
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Error In Recent Inventory API',
      error
    })
  }
}


// Get Donar Records
const getDonarsController = async (req, res) => {
  try {
    // take organisation / userId from auth middleware
    const organisation = req.userId;
    if (!organisation) {
      return res.status(400).send({
        success: false,
        message: "UserId not found. Please login again.",
      });
    }

    // find donors for this organisation
    const donorId = await inventoryModel.distinct("donar", { organisation });
  

    // fetch donor details (if donor is a user model)
    const donars = await userModel.find({ _id: { $in: donorId } });

    return res.status(200).send({
      success: true,
      message: "Donor records fetched successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donor Record",
      error,
    });
  }
};


// Get hospital Records

const getHospitalController= async(req,res)=>{
  try{
    const organisation=req.userId;
  // Get hospital Id
  const hospitalId=await inventoryModel.distinct('hospital',{organisation})
  // find hospital
  const hospitals=await userModel.find({
    _id:{$in:hospitalId}
  });
  return res.status(200).send({
    success:true,
    message:'Hospital Data Fetched Successfully',
    hospitals
  });

  }catch(error){
    console.log(error);
    return res.status(500).send({
      success:false,
      message:'Error in get Hospital API',
      error
    });
  }
};


// Get Organisation profile
const getOrganisationController=async(req,res)=>{
  try{
    const donar=req.userId;
    const orgId=await inventoryModel.distinct("organisation",{donar})
    // find org
    const organisations=await userModel.find({
      _id:{$in:orgId}
    })
    return res.status(200).send({
      success:true,
      message:'Org data Fetch Successfully',
      organisations
    });
  }catch(error){
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Error in Organisation API',
      error
    })
  }
};

// Get Organisation for hospital
const getOrganisationForHospitalController=async(req,res)=>{
  try{
    const hospital=req.userId;
    const orgId=await inventoryModel.distinct("organisation",{hospital})
    // find org
    const organisations=await userModel.find({
      _id:{$in:orgId}
    })
    return res.status(200).send({
      success:true,
      message:'Hospital Org data Fetch Successfully',
      organisations
    });
  }catch(error){
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Error in Hospital Organisation API',
      error
    })
  }
};

module.exports={ 
  createInventoryController, 
  getInventoryController, 
  getDonarsController,
  getHospitalController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController
};
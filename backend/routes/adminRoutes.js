const express=require("express");
const authMiddelware=require("../middlewares/authMiddelware");
const {getDonarsListController, getHospitalListController, getOrgListController, deleteDonarController}=require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

//router object
const router=express.Router();

//Routes

// Get  || Donar List 
router.get('/donar-list',authMiddelware,adminMiddleware,getDonarsListController);

// Get  || Hospital List 
router.get('/hospital-list',authMiddelware,adminMiddleware,getHospitalListController);

// Get  || Org List 
router.get('/org-list',authMiddelware,adminMiddleware,getOrgListController);


//===================
// Delete Donar || Get
router.delete("/delete-donar/:id",authMiddelware,adminMiddleware,deleteDonarController)

module.exports=router;
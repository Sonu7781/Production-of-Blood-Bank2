const express=require('express');
const authMiddleware = require('../middlewares/authMiddelware');
const { createInventoryController, 
  getInventoryController, 
  getDonarsController, 
  getHospitalController, 
  getOrganisationController,
  getOrganisationForHospitalController, 
  getInventoryHospitalController, 
  getRecentInventoryController
} = require('../controllers/inventoryController');


const router=express.Router()

// routes
// Add inventory || post
router.post("/create-inventory",createInventoryController);

// Get all blood records
router.get('/get-inventory',authMiddleware,getInventoryController);

// Get all recent blood records
router.get('/get-recent-inventory',authMiddleware,getRecentInventoryController);

// Get hospital blood records
router.post('/get-inventory-hospital',authMiddleware,getInventoryHospitalController);

// Get all donar records
router.get('/get-donars',authMiddleware,getDonarsController);

// Get Hospital records
router.get('/get-hospitals',authMiddleware,getHospitalController);

// Get Organisation records
router.get('/get-organisation',authMiddleware,getOrganisationController);

// Get Organisation records
router.get('/get-organisation-for-hospital',authMiddleware,getOrganisationForHospitalController);

module.exports=router;
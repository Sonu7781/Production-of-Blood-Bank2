const express=require('express');
const { registerController, loginController,currentUserController } = require('../controllers/authController');
const authMiddelware = require('../middlewares/authMiddelware');

const router=express.Router()

// routes

// register //post
router.post('/register',registerController);

//login //post
router.post("/login",loginController);

// Get current 
router.get("/current-user",authMiddelware,currentUserController);

module.exports=router;
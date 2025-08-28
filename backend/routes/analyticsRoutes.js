const express=require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddelware');
const { bloodGroupDetailsContoller } = require("../controllers/analyticsController");


// routes


// Get Blood Data
router.get('/bloodGroups-data',authMiddleware, bloodGroupDetailsContoller);

module.exports=router;
const express = require("express");
const router = express.Router();

const {imageUpload , imageReducerUpload , videoUpload , localFileUpload} = require("../controllers/filleUpCon") 

//api route

router.post("/localFileUpload",localFileUpload);

router.post("/imageUpload" , imageUpload);


router.post("/videoUpload" , videoUpload);

router.post("/imageReducedUpload" , imageReducerUpload);


module.exports = router;
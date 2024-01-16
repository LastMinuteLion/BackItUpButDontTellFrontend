const express = require("express");
const router = express.Router();

const {login , signup} = require("../controllers/autho");
const {auth , isStudent , isAdmin} = require("../middlewares/auth")

router.post("/login", login);
router.post("/signup",signup);

//protected route
router.get("/student",auth , isStudent, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the protected route for students',
    });
});


router.get("/admin" , auth , isAdmin, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the protected route for Admin',
    });
})


//for testing
router.get("/test" , auth ,  (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the protected route for tester',
    });
})

module.exports = router;
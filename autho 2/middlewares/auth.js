// auth , isStudent , isAdmin arre the middlewares.

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res , next) => {
    try{
      //extract jwt token
      //other ways to fetch token
      const token = req.body.token || req.cookies.token;
      //one more way is from the header
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Token missing",
        } );
    }

    // verify the token 
      try{
        const payload = jwt.verify(token , process.env.JWT_SECRET);
        console.log(payload);
        //why??

        req.user = payload;
      }catch(err){
        return res.status(401).json({
            success:false,
            message:"Token is Invalid",
        });
      }
      next();
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:"Something went wrong",
        });
    }
}

exports.isStudent = (req,res,next)=> {
    try{
          if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for students",
            });
          }
          next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User role is not matching",
        });
    }
}

exports.isAdmin = (req,res,next)=> {
    try{
          if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin",
            });
          }
          next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User role is not matching",
        });
    }
}
const File = require("../models/filer");

require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret:process.env.API_SECRET,
})

//localFileUpload -> handler function

exports.localFileUpload = async(req,res)=> {
    try{
        //fetch file
        const file = req.files.file;//file naam key hai
        console.log("File agyi" , file);
        //which path u want to share on server

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}` ; //current directory

        console.log("path ->" , path);

        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success:true,
            message:"Local file uploaded Succesfully",
        })
    }catch(err){

    }
}


//image uploader handler

function isFileTypeSupported(type , supportedTypes){
    return supportedTypes.includes(type);
}


async function uploadFileToCloundinary(file , folder , quality){
    const options = {folder};
    console.log("temo file path" , file.tempFilePath);

    if(quality){
        options.quality = quality;
    }
    options.resource_type  = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async(req , res) => {
    try{
        // req se fetch karo data

        const {name , tags , email } = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //Validation

        const supportedTypes = ["jpg" , "png" , "jpeg"];

        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("file type", fileType);

        if(!isFileTypeSupported(fileType , supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            })
        }

        // file format supported hai

        console.log("Uploading to cloud folder");

        const response = await uploadFileToCloundinary(file , "HikkyF");

        console.log(response);

        //save entry to DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })


        res.json({
            success:true,
            imageUrl: response.secure_url,
            message:"Image uploaded succesfully",
        })


    }catch(err){
      console.error(err);
      res.status(400).json({
        success:false,
        message:"Something went Wrong",
      })
    }
}




//video Upload Handler

exports.videoUpload = async(req,res) => {
    try{
      //data fetch
      const{name ,tags ,email} = req.body;
      console.log(name ,tags ,email);

      const file = req.files.videoFile;

      console.log(file);

      //validation]
      
      const supportedTypes = ["mp4" , "mov"];
      const fileType = file.name.split('.')[1].toLowerCase();

      const maxSizeBytes = 5 * 1024 * 1024;

      console.log("filetype",fileType);


      if(!isFileTypeSupported(fileType , supportedTypes)){
        return res.status(400).json({
            success:false,
            message:"File format not supported",
        })
      }

      if (file.size > maxSizeBytes) {
        return res.status(400).json({
            success: false,
            message: "File size exceeds the allowed limit",
        });
    }
     console.log("Uploading to cloud folder");

        const response = await uploadFileToCloundinary(file , "HikkyF");

        console.log(response);

        //save entry to DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })


        res.json({
            success:true,
            imageUrl: response.secure_url,
            message:"Image uploaded succesfully",
        })




    }catch(err){
      res.status(400).json({
        success:false,
        message:"Something went terribly wrong",
      })
    }
}





///image imageReducerUpload

exports.imageReducerUpload = async(req ,res) => {
    try{
        const{name ,tags ,email} = req.body;
      console.log(name ,tags ,email);

      const file = req.files.imageFile;

      console.log(file);

      //validation]
      
      const supportedTypes = ["mp4" , "mov" , "png"];
      const fileType = file.name.split('.')[1].toLowerCase();

      

      console.log("filetype",fileType);


      if(!isFileTypeSupported(fileType , supportedTypes)){
        return res.status(400).json({
            success:false,
            message:"File format not supported",
        })
      }

    
     console.log("Uploading to cloud folder");

        const response = await uploadFileToCloundinary(file , "HikkyF", 10);

        console.log(response);

        //save entry to DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })


        res.json({
            success:true,
            imageUrl: response.secure_url,
            message:"Image uploaded succesfully",
        })

    }catch(err){
        res.status(400).json({
            success:false,
            message:"Something went terribly wrong",
          })
    }
}
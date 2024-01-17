const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

//post middleware
fileSchema.post("save" , async function(doc){//doc jo db mein entry save hui hai usse
    try{
      console.log(doc);

      //transporter

      let transporter = nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
              user:process.env.MAIL_USER,
              pass: process.env.MAIL_PASS, 
        },
      });

      //send mail
      let info = await transporter.sendMail({
        from:"James Faulker",
        to: doc.email,
        subject: "New file uploaded on cloudinary",
        html:`<h2> Hello Biro</h2>`
      })

      console.log(info);



    }catch(err){
       console.error(err);
    }
})

const File = mongoose.model("File",fileSchema);
module.exports = File;
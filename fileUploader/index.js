const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

//middleware for uploading files /// multer can also be used

app.use(express.json());

const fileUpload = require("express-fileupload");

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}
));


require("./config/database").connect();


//connect with cloud
require("./config/cloudinary").cloudinaryConnect();


//api route mount karna hai
const Upload = require("./routes/fileUpload");
app.use('/api/v1/upload' , Upload);


//activate server
app.listen(PORT, () =>{
    console.log(`App is running at ${PORT}`);
})
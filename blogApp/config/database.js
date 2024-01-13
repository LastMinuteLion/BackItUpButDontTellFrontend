const mongoose = require("mongoose")

require("dotenv").config();

const dbConnect = () => {
 mongoose.connect(process.env.DATABASE_URL)
 .then(()=> console.log("DB connection success"))
 .catch((err)=>{
    console.log("Issue in DB connection");
        console.error(error.message);
        process.exit(1);
 });
}

module.exports = dbConnect;
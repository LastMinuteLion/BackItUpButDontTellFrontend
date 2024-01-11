const mongoose = require("mongoose");

require("dotenv").config();//install to get info from env file.

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then( ()=> console.log("Db connection succesfully"))
    .catch( (error) => {
        console.log("Issue in DB connection");
        console.error(error.message);
        process.exit(1);
    });
}

module.exports = dbConnect;
const express = require("express");
const app = express();

//load config from env file

require("dotenv").config(); //into process object
const PORT = process.env.PORT || 4000;

//middleware to parse json req body

app.use(express.json());


//import routes for todoAPI
const todoRoutes = require("./routes/todos");


//mount the todo Api routes  //add hojate 
app.use("/api/v1" , todoRoutes);


//start server
app.listen(PORT , ()=> {
    console.log(`Server started successfully at ${PORT}`);
})

//connect to the Database
const dbConnect = require("./config/database");
dbConnect();


//default route
app.get("/" , (req , res) => {
    res.send(`<h1> This is HOMEPAGE </h1>`);
})
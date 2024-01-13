const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3500;

//middleware
app.use(express.json());

//import routes for blog api
const blog = require("./routes/blog")

//mountthe blog api   add karo
app.use("/api/v1", blog);


const connectWithDb = require("./config/database");
connectWithDb();

//start the server

app.listen(PORT , () => {
    console.log(`APp is started at port number ${PORT}`);
})

app.get("/" , (req , res) => {
    res.send(`<h1> This is HOMEPAGE blogging </h1>`);
})
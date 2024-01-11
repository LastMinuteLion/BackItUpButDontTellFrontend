//import the model
const Todo = require("../models/todo");

//define route handler


exports.getTodo = async(req, res) =>{
 try{
     //fetch  todo items from database.
     const todos = await Todo.find({});//functionality of mongoDb

     //response
     res.status(200)
     .json({
        success:true,
        data:todos,
        message:"Entire todo Data is fetched",
     })
 }
 catch(err){
 console.error(err);
 res.status(500)
 .json({
    success:false,
    error:err.message,
    message:"Server Error", 
 })
 }
}




exports.getTodoById = async(req ,res) => {
    try{
        //extract todo items by Id
        const id = req.params.id;
        const todo = await Todo.findById( {_id: id})

        //data for given id is not found
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"No data found",
            })
        }
        res.status(200)
        .json({
        success:true,
        data:todo,
        message:`Todo ${id} data succesfully fetched`, 
 })
    }catch(err){
        console.error(err);
        res.status(500)
        .json({
           success:false,
           data:"Internal issuee",
           message:err.message, 
        })
        }
}
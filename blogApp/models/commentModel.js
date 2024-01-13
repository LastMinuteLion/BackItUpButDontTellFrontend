const mongoose = require("mongoose");

//route handler 
const commentSchema = new mongoose.Schema({
    post:{
        //konsi post pe comment karr rhe ho
        type:mongoose.Schema.Types.ObjectId,// storing an ID of a post
        ref : "Post" , //reference to the post model
    },
    user: {
        type:String,
        required:true,
    },
    body: {// comment hai kya?
        type:String,
        required:true,
    }
});

module.exports = mongoose.model("Comment" , commentSchema);
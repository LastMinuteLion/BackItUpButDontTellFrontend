
//import model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

exports.createComment = async(req,res) => {
    try{
       //fetch data from rquest body
       const { post ,user , body} = req.body;
       //create a comment object
       const comment = new Comment({
        post,user,body
       });

       //save the comment in database
       const savedComment = await comment.save();//different way

       //yeh jo comment hai woh post ke array mein bhi toh save krna padega

       // find the post by ID , add the new comment
       //push operator is used to update

       //new true is to return the updated post with comments/likes
       const updatedPost = await Post.findByIdAndUpdate(post ,
         {$push:{comments:savedComment._id}} ,
         {new:true})  
          .populate("comments")
         .exec();
         
         //populate the comments array with comment 
         //documents

         res.json({
            post:updatedPost,
         });
    }
    catch(err){
        return res.status(500).json({
            err:"Error while creating comment" ,
        })
    }
}
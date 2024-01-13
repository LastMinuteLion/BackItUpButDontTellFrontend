
//import model
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likePost = async(req,res) => {
    try{
       const {post , user} = req.body;
       //create a like object
       const like = new Like({
        post , user,
       });

       //save the like in db
       const likeSaved = await like.save();//different way

       //yeh jo like hai woh post ke array mein bhi toh save krna padega

       // find the post by ID , add the new like
       //push operator is used to update

       //new true is to return the updated post with comments/likes

       const updatedPost = await Post.findByIdAndUpdate(post ,
         {$push:{likes:likeSaved._id}},
         {new:true})
         .populate("likes")
         .exec();

         res.json({
            post:updatedPost,
         })

    }
    catch(err){
        return res.status(500).json({
            err:"Error while creating like" ,
        })
    }
};





//Unlike a post

exports.unlikePost = async(req,res) =>{
    try{
        const {post , like} = req.body;
        //find  and delete the like collection 
        const deletedLike = await Like.findOneAndDelete({post:post,_id:like});

        const updatedPost = await Post.findByIdAndUpdate(post, 
            {$pull: {likes: deletedLike._id}} ,
             {new:true});


             res.json({
                post:updatedPost,
             })
    }
    catch(err){
        return res.status(500).json({
            err:"Error while unliking like" ,
        })
    }
};
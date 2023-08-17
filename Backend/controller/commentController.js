const asyncHandler = require("express-async-handler");
const Postcoment = require("../model/commentModel")



const createComment = asyncHandler( async (req, res)=>{

    const { comment, blog_id } = req.body
    console.log(req.body)
   

    if(!comment || !blog_id ){
        res.status(400)
        throw new Error(" filed  mandatory")
    }
    
    const comment1 = await Postcoment.create({
        comment,
        blog_id,
        user_id: req.user.id,
    })
    res.status(202).json(comment1)
})


const getComments = asyncHandler( async  (req, res)=>{
    const comment = await Postcoment.find()
   
    res.status(200).json(comment)
    
})


const getComment = asyncHandler( async  (req, res)=>{
    const comment1 = await Postcoment.find({ user_id: req.user.id});
    res.status(200).json(comment1)
    
})



const updateComment = asyncHandler( async  (req, res)=>{
    const comment1 = await Postcoment.findById(req.params.id);
    console.log(comment1)

    if(!comment1){
        res.status(404);
        throw new Error('blog not found');
    }

    if (comment1.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to delete this post");
      }


    const updateComment1 = await Postcoment.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true
        }
    )
    res.status(200).json(updateComment1);
    
})


const deleteComment = asyncHandler( async  (req, res)=>{
    const comment1 = await Postcoment.findById(req.params.id);

    if(!comment1){
        res.status(404);
        throw new Error('blog not found');
    }

    if (comment1.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to delete this post");
      }
    await Postcoment.findByIdAndRemove(
        req.params.id
    )
    res.status(200).json(comment1);
    
})






module.exports = {createComment, getComment, getComments, deleteComment, updateComment}

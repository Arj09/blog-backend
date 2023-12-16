const asyncHandler = require("express-async-handler");
const Blog = require("../model/postModel")



const createPost = asyncHandler( async (req, res)=>{

    const { title, description} = req.body
    console.log(req.body)

    if(!title || !description ){
        res.status(400)
        throw new Error("all filed all mandatory")
    }

    const blog = await Blog.create({
        title,
        description,
        user_id: req.user.id,

    })
    res.status(202).json(blog)
})


const getPosts = asyncHandler( async  (req, res)=>{
    const blog = await Blog.find()
    //const blog1 = blog.reverse()
    
    res.status(200).json(blog)
    
})


const getPost = asyncHandler( async (req, res)=>{

    const blog = await Blog.findById(req.params.id);

    if(!blog){
        res.status(404);
        throw new Error('blog not found');
    }

    
    res.status(200).json(blog);
})
const updatePost = asyncHandler(async (req, res)=>{

    const blog = await Blog.findById(req.params.id);

    if(!blog){
        res.status(404);
        throw new Error('blog not found');
    }

    if (blog.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update this  post");
      }
      
      
      const updateBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true
        }
    )

    
    res.status(200).json(updateBlog);
    
})
const deletePost = asyncHandler ( async  (req, res)=>{

    const blog = await Blog.findById(req.params.id);

    if(!blog){
        res.status(404);
        throw new Error('blog not found');
    }

    if (blog.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to delete this post");
      }
    await Blog.findByIdAndRemove(
        req.params.id
    )
    res.status(200).json(blog);
} )



module.exports ={getPost, getPosts, deletePost, updatePost, createPost}

const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
  
    blog_id: {
        type: String,
        required: [true, "please add blog id"]
    },
    
    comment: {
        type: String,
        required: [true, "please add comment"]
    }
},{
    timestamps : true
})

module.exports = mongoose.model("postcomment", commentSchema)
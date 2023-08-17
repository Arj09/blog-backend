const express  = require("express")
const {  getPost, getPosts, createPost, deletePost, updatePost } = require("../controller/postController")
const validateToken = require("../middleware/validationtokenHandler")
const router = express.Router()


router.use(validateToken)
router.route("/").get(getPosts).post(createPost)
router.route("/:id").delete(deletePost).put(updatePost).get(getPost)

module.exports = router
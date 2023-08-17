const express  = require("express")

const validateToken = require("../middleware/validationtokenHandler")
const { createComment, getComment, getComments, updateComment, deleteComment } = require("../controller/commentController")
const router = express.Router()


router.use(validateToken)
router.route("/").get(getComments).post(createComment)
router.route("/:id").get(getComment).put(updateComment).delete(deleteComment)


module.exports = router
const express = require("express");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  userBlog,
} = require("../controllers/blogController");

// router object
const router = express.Router();

//routes
//GET
router.get("/all-blog", getAllBlogs);

// GET
router.get("/get-blog/:id", getBlogById);

// POST
router.post("/create-blog", createBlog);

// PUT
router.put("/update-blog/:id", updateBlog);

// Delete
router.delete("/delete-blog/:id", deleteBlog);

// GET
router.get("/user-blog/:id", userBlog);

module.exports = router;

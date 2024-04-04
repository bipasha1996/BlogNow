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
router.post("/createBlog", createBlog);

// PUT
router.put("/updateBlog/:id", updateBlog);

// Delete
router.delete("/deleteBlog/:id", deleteBlog);

// GET
router.get("/userBlog/:id", userBlog);

module.exports = router;

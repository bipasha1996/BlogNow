const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

//GET ALL BLOGS

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No blogs found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "All blog lists",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting Blogs",
      error,
    });
  }
};

// GET BLOG

exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "No blog found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while getting blog",
      error,
    });
  }
};

// Create Blog

exports.createBlog = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    //validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const existingUser = await userModel.findById(user);

    //validation

    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "Unable to find user",
      });
    }

    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Blog Created successfully!",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while creating blog",
      error,
    });
  }
};

// Update Blog

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while updating blog",
      error,
    });
  }
};

// Delete Blog

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await blogModel
      .findOneAndDelete(req.params.id)
      .populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while deleting blog",
      error,
    });
  }
};

// Get User Blog

exports.userBlog = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    //validation
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "Blogs not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User Blogs",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error in user blog",
      error,
    });
  }
};

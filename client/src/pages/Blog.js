import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Blog = () => {
  const [Blogs, setBlogs] = useState([]);
  //get Blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/Blog/all-Blog");
      if (data?.success) {
        setBlogs(data?.Blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div>
      {Blogs &&
        Blogs.map((blog) => (
          <BlogCard
            id={Blog?._id}
            isUser={localStorage.getItem("userId") === Blog?.user?._id}
            title={Blog?.title}
            description={Blog?.description}
            image={Blog?.image}
            username={Blog?.user?.username}
            time={Blog.createdAt}
          />
        ))}
    </div>
  );
};

export default Blog;

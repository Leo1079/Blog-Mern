import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 cursor-pointer">
      <Link to={`/blogs/${blog.idBlog}`}>
        <div className="bg-white rounded-md shadow-md p-4 transition transform hover:scale-105">
          <h3 className="text-xl font-semibold mb-2 text-center">
            {blog.title}
          </h3>
          <p className="text-gray-600 mb-4">{blog.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;

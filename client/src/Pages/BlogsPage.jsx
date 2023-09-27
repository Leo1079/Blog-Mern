import React, { useEffect } from "react";
import { useBlog } from "../context/BlogContext";
import BlogCard from "../Components/BlogCard";

const BlogsPage = () => {
  const { blogs } = useBlog();

  const renderMain = () => {
    if (blogs.length === 0) {
      return <h3 className="text-xl text-center mt-8">No Blogs Yet</h3>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div
            key={blog.idBlog}
            className="border border-gray-300 rounded-md shadow-md p-4"
          >
            {/* Agrega una clase de borde y sombra a la tarjeta */}
            <BlogCard blog={blog} key={blog.idBlog} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-2 underline">Blogs</h1>
        <p className="text-lg text-gray-600">
          Bienvenido a nuestra plataforma de blogs
        </p>
      </div>

      <div className="bg-white p-4 rounded-md">{renderMain()}</div>
    </div>
  );
};

export default BlogsPage;

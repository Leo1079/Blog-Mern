import React from "react";
import { useParams } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import BlogCard from "../components/BlogCard";

const BlogsByCategory = () => {
  const { blogs } = useBlog();
  const { category } = useParams();

  // Filtrar los blogs por categoría
  const filteredBlogs = blogs.filter((blog) => blog.category === category);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-center mt-10 underline">
        {category}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBlogs.length === 0 ? (
          <p className="text-gray-600 font-bold text-2xl     mt-14">
            No hay blogs en esta categoría.
          </p>
        ) : (
          filteredBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        )}
      </div>
    </div>
  );
};

export default BlogsByCategory;

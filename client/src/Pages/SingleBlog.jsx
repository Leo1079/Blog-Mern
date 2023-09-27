import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBlog } from "../context/BlogContext";

const SingleBlogPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { getBlog, deleteBlog } = useBlog();
  const [blog, setBlog] = useState();
  const { user } = useAuth();

  const verficateAuthor = async () => {
    const [blog] = await getBlog(params.id);
    if (blog.idUser !== user.id) {
      navigate("/blogs");
    } else {
      await deleteBlog(params.id);
      navigate("/blogs");
    }
  };

  useEffect(() => {
    async function loadBlog() {
      const [blog] = await getBlog(params.id);
      setBlog(blog);
    }
    loadBlog();
  }, [params.id]);

  if (!blog) {
    return (
      <div className="container mx-auto mt-8 text-center text-gray-600 text-2xl">
        Cargando...
      </div>
    );
  }

  const isAuthor = blog.idUser === user.id;

  return (
    <div className="container mx-auto p-4 mt-5 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-600">
        {blog.title}
      </h1>
      <p className="text-lg text-black mb-6 mt-2 text-center">
        {blog.description}
      </p>

      <div className="my-4 mt-6 text-lg text-gray-800 whitespace-pre-line">
        {blog.body &&
          blog.body.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
      </div>

      <p className="text-gray-500 mt-10 text-center">Autor: {blog.username}</p>
      <p className="text-gray-500 text-center">Categoría: {blog.category}</p>

      <div className="text-center mt-10 space-x-4">
        {isAuthor && (
          <>
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700"
              onClick={() => {
                navigate(`/blogs/edit/${params.id}`);
              }}
            >
              Editar Blog
            </button>
            <button
              className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-700"
              onClick={() => {
                verficateAuthor();
              }}
            >
              Eliminar Blog
            </button>
          </>
        )}
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          onClick={() => {
            navigate("/blogs");
          }}
        >
          Volver a la lista de blogs
        </button>
      </div>
    </div>
  );
};

export default SingleBlogPage;

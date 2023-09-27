import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useSubmit } from "react-router-dom";
import {
  blogProfileRequest,
  blogsRequest,
  blogRequest,
  createBlogRequest,
  updateBlogRequest,
  deleteBlogRequest,
} from "../api/blogs";

const blogContext = createContext();
export const useBlog = () => {
  const context = useContext(blogContext);
  if (!context) {
    throw new Error("useBlog must be used within an Blogprovider");
  }
  return context;
};

export const BlogContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const categories = ["Viajes", "Recetas", "Tecnología", "Moda", "Deportes", 'Otros'];
  const [profileBlogs, setProfileBlogs] = useState([]);

  const getBlog = async (idBlog) => {
    try {
      const res = await blogRequest(idBlog);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const createBlog = async (blog) => {
    try {
      const res = await createBlogRequest(blog);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateBlog = async (id, newBlog) => {
    const res = await updateBlogRequest(id, newBlog);
    console.log(res);
    return res.data;
  };

  const deleteBlog = async (id) => {
    const res = await deleteBlogRequest(id);
    console.log(res);
    if (res.status === 204) setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  useEffect(() => {
    async function loadBlogs() {
      const res = await blogsRequest();
      setBlogs(res.data);
      const profile = await blogProfileRequest();
      setProfileBlogs(profile.data);
    }
    loadBlogs();
  }, []);

  return (
    <blogContext.Provider
      value={{
        getBlog,
        createBlog,
        updateBlog,
        deleteBlog,
        profileBlogs,
        blogs,
        categories,
      }}
    >
      {children}
    </blogContext.Provider>
  );
};

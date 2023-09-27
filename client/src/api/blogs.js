import axios from "./axios";

export const blogsRequest = async () => await axios.get("/blogs");

export const blogProfileRequest = async () => await axios.get("/profile");

export const blogRequest = async (id) => await axios.get(`/blogs/${id}`);

export const createBlogRequest = async (blog) =>
  await axios.post("/blogs", blog);

export const updateBlogRequest = async (id, newBlog) =>
  await axios.put(`/blogS/${id}`, newBlog);

export const deleteBlogRequest = async (id) =>
  await axios.delete(`/blogs/${id}`);

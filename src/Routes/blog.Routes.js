import { Router } from "express";
import {
  getBlogs,
  getBlogsUser,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
} from "../Controllers/blog.controllers.js";
import { authRequired } from "../middlewares/authRequired.js";

const router = Router();

router
  .get("/blogs", getBlogs)
  .get("/profile", authRequired, getBlogsUser)
  .get("/blogs/:id", authRequired, getBlog)
  .post("/blogs", authRequired, createBlog)
  .put("/blogs/:id", authRequired, updateBlog)
  .delete("/blogs/:id", authRequired, deleteBlog);

export default router;

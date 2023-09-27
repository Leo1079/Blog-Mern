import e from "express";
import { pool } from "../db.js";

export const getBlogs = async (req, res) => {
  try {
    const [allBlogs] = await pool.query(
      "SELECT b.idBlog,b.title,b.description,b.category, b.idUser,u.username FROM blogs AS b  INNER JOIN users AS u ON b.idUser = u.id"
    );
    res.json(allBlogs);
  } catch (error) {
    res.json(error.message);
  }
};

export const getBlogsUser = async (req, res) => {
  try {
    const [blogsUser] = await pool.query(
      "SELECT * FROM blogs WHERE idUser = ?",
      [req.user.id]
    )
    res.json(blogsUser);
  } catch (error) {
    res.json(error.message);
  }
};

export const getBlog = async (req, res) => {
  try {
    const params = req.params.id;
    console.log(params);
    const [blog] = await pool.query(
      "SELECT  b.title, b.description, b.body,b.category, b.idUser,u.username FROM blogs AS b INNER JOIN users AS u ON b.idUser = u.id WHERE idBlog = ?",
      [req.params.id]
    );
    if (blog.length <= 0) return res.json("Blog not found");
    res.json(blog);
  } catch (error) {
    res.json(error.message);
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, description, body, category } = req.body;
    const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [
      req.user.id,
    ]);

    const [taskCreating] = await pool.query(
      "INSERT INTO blogs (title,description,body,category,idUser) VALUES (?,?,?,?,?)",
      [title, description, body, category, req.user.id]
    );

    res.json({
      id: taskCreating.insertId,
      title,
      description,
      body,
      category,
      createdUser: user[0].user,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const updateBlog = async (req, res) => {
  try {
    const content = req.body;
    const idBlog = req.params.id;
    const creatorId = req.user.id;

    const [blogFound] = await pool.query(
      "SELECT idUser FROM blogs WHERE idBlog = ? ",
      [idBlog]
    );

    if (blogFound.length === 0) return res.status(404).json("BLOG NOT FOUND");

    const idCreator = blogFound[0].idUser;

    if (idCreator !== creatorId)
      return res
        .status(403)
        .json("You do not have permission to delete this blog");

    const [deleteResult] = await pool.query(
      "UPDATE blogs SET ? WHERE idBlog = ?",
      [content, idBlog]
    );

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json("NOT BLOG FOUND");
    }

    res.status(204).json("updating sucefully");
  } catch (error) {
    res.json(error.message);
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const idBlog = req.params.id;
    const [deleteResult] = await pool.query(
      "DELETE FROM blogs WHERE idBlog = ?",
      [idBlog]
    );

    if (deleteResult.affectedRows === 0)
      return res.status(404).json("NOT BLOG FOUND");

    res.status(204).json("Deleted Sucefully");
  } catch (error) {
    res.json(error.message);
  }
};

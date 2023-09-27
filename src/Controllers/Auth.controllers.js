import { pool } from "../db.js";
import bcrypt from "bcrypt";
import { createAccesToken } from "../libs/createAccesToken.js";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";

export const register = async (req, res) => {
  try {
    const { username, email, biography, password } = req.body;

    const [emailFound] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (emailFound.lenght > 0) {
      return res.json({ message: "Email is already use" });
    }

    const [usernameFound] = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (usernameFound.length > 0) {
      return res.json({ message: "User is already use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      username,
      email,
      biography,
      password: hashedPassword,
    };

    const [addUser] = await pool.query(" INSERT INTO users SET ?", [user]);
    const token = await createAccesToken({ id: addUser.insertId });

    res.cookie("token", token);
    res.json({
      id: addUser.insertId,
      user,
      email,
      biography,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [userFound] = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (userFound.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = userFound[0];
    const hashedPassword = user.password;
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Crendentials" });
    const token = await createAccesToken({ id: user.id });

    res.cookie("token", token);
    res.json({
      id: user.id,
      user: user.username,
      email: user.email,
      biography: user.biography,
    });
  } catch (error) {
    res.json(error);
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    });
    res.json({ message: "logout sucefully" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const verifyToken = (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) res.status(401).json({ message: "Unauthorized" });
    const [userFound] = await pool.query("SELECT * FROM users WHERE id = ?", [
      decoded.id,
    ]);

    if (userFound.length <= 0)
      return res.status(401).json({ message: "Unauthorized" });
    const user = userFound[0];

    res.json({
      id: user.id,
      user: user.username,
      email: user.email,
    });
  });
};

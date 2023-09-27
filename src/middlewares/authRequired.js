import { SECRET_KEY } from "../config.js";
import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  try {
    const { token }= req.cookies;
    if (!token) return res.status(401).json("Not Authorized Token");

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(401).json("Token is invalid");
      req.user = decoded;

      next();
    });
  } catch (error) {
    res.json(error.message);
  }
};

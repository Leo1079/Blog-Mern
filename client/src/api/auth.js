import axios from "./axios.js";

export const loginRequest = async (user) => await axios.post("/login", user);

export const signUpRequest = async (user) =>
  await axios.post("/register", user);

export const verifyToken = async () => await axios.get("/verify");

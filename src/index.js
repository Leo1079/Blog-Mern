import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { PORT } from "./config.js";
import {dirname, join} from 'path'
import { fileURLToPath } from "url";
import authRoutes from "./Routes/Auth.Routes.js";
import blogsRoutes from './Routes/blog.Routes.js'


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname)

// MIDLEWARES
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//  ROUTES

app.use('/api',authRoutes);
app.use('/api',blogsRoutes)

app.use(express.static(join(__dirname, '../client/dist')))

// INICIO DE SERVER
app.listen(PORT);
console.log(`server on port ${PORT}`);

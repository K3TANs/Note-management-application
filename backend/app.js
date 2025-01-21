import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import noterouter from "./routes/noteRoutes.js";
import folderrouter from "./routes/folderRoutes.js";
import { errorMiddleware } from "./error/error.js";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config({path:"./config/config.env"});

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["POST" , "GET" , "PUT" , "DELETE"],
    credentials:true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/k1/folders" , folderrouter);
app.use("/api/k1/Notes" , noterouter);
app.use("/api/auth" , authRouter );



mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("connected to database successfully");
    })
    .catch((error) => {
        console.log(`some error occured while connecting to Database ${error}`);
    })

export default app;
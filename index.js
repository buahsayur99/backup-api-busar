import express from "express";
import dotenv from "dotenv";
import postsRouter from "./routes/posts.router.js";


const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// import authRouter from "./routes/auth.router.js";

app.use("/api/v1/posts", postsRouter)
// app.use("/api/v1/auth", authRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running....")
})
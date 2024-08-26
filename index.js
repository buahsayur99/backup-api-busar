import express from "express";
import dotenv from "dotenv";
import database from "./src/database/index.js";
// Import Router
import postsRouter from "./src/routes/posts.router.js";
import UsersRouter from "./src/routes/UsersRouter.js";


const app = express();
dotenv.config();

try {
    await database.sync()
    console.log("Database Connected...");
} catch (error) {
    console.error(error);
}

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// import authRouter from "./routes/auth.router.js";

app.use("/api/v1/posts", postsRouter);
app.use(UsersRouter);
// app.use("/api/v1/auth", authRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running....")
})
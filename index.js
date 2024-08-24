// const express = require("express")
// const app = express();
// require('dotenv').config();

import express from "express";
import dotenv from "dotenv";


const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// const postsRouter = require('./routes/posts.router')
// const authRouter = require('./routes/auth.router')
import postsRouter from "./routes/posts.router.js";
import authRouter from "./routes/auth.router.js";

app.use("/api/v1/posts", postsRouter)
app.use("/api/v1/auth", authRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running....")
})
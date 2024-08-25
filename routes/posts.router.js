// const express = require("express")
// const router = express.Router()

// const postsController = require("../controller/posts.controller")

import express from 'express';
// import postsController from '../controller/posts.controller.js';
import { getAllPosts, createPost } from "../controller/posts.controller.js";

const router = express.Router();

// router.get("/", postsController.getAll);
// router.get("/:id", postsController.getById);
// router.post("/", postsController.create);
// router.put("/:id", postsController.update);
// router.delete("/:id", postsController.delete);

router.get("/", getAllPosts);
router.post("/", createPost);

export default router;
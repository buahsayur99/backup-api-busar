// const express = require("express")
// const router = express.Router()

// const authController = require("../controller/auth.controller")

import express from "express";
const router = express.Router();

import authController from "../controller/auth.controller.js";

router.post("/register", authController.register)
router.post("/login", authController.login)

export default router
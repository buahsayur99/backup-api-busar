import express from "express";
import {
    createUsers,
    getUsers
} from "../controller/Users.js";


const router = express.Router();

router.get("/users", getUsers);
router.post("/users", createUsers);
// router.get("/users/:email", getUsersByEmail);
// router.patch("/users/:id", updateUsers);
// router.delete("/users/:id", deleteUsers);
// router.patch("/users/email/:uuid", changeEmailUsers);
// router.patch("/users/address/:uuid", updateIdAddress);

export default router;
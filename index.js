import express from "express";
import dotenv from "dotenv";
import database from "./src/database/index.js";
// Import Router
import { AuthRouter, UsersRouter, CategoryRouter } from "./src/routes/index.js";


const app = express();
dotenv.config();

try {
    await database.sync()
    console.log("Database Connected...");
} catch (error) {
    console.error(error);
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Router
app.use(UsersRouter);
app.use(AuthRouter);
app.use(CategoryRouter);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Server is running....")
})
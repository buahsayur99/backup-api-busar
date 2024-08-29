import express from "express";
import dotenv from "dotenv";
import http from "http";
import { io } from "./src/sockets/ConfigureSocket.js";
import database from "./src/database/index.js";
// Import Router
import { AuthRouter, UsersRouter, CategoryRouter, ProductRouter, AddressRouter, LabelAddressRouter, WishlistRouter } from "./src/routes/index.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
io.attach(server); // Attach Socket.IO to the HTTP server


try {
    await database.sync()
    console.log("Database Connected...");
} catch (error) {
    console.error(error);
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "https://busar.vercel.app");
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
})

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("src/public"))
// Router
app.use(UsersRouter);
app.use(AuthRouter);
app.use(CategoryRouter);
app.use(ProductRouter);
app.use(AddressRouter);
app.use(LabelAddressRouter);
app.use(WishlistRouter);

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log("Server is running....")
})
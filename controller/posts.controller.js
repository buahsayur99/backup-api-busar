// const pool = require("../database/index");

import { DataTypes } from "sequelize";
import db from "../database/index.js";

// const postsController = {
//     getAll: async (req, res) => {
//         try {
//             const [rows, fields] = await pool.query("select * from posts")
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error)
//             res.json({
//                 status: "error"
//             })
//         }
//     },
//     getById: async (req, res) => {
//         try {
//             const { id } = req.params
//             const [rows, fields] = await pool.query("select * from posts where id = ?", [id])
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error)
//             res.json({
//                 status: "error"
//             })
//         }
//     },
//     create: async (req, res) => {
//         try {
//             const { title, content } = req.body
//             const sql = "insert into posts (title, content) values (?, ?)"
//             const [rows, fields] = await pool.query(sql, [title, content])
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error)
//             res.json({
//                 status: "error"
//             })
//         }
//     },
//     update: async (req, res) => {
//         try {
//             const { title, content } = req.body
//             const { id } = req.params
//             const sql = "update posts set title = ?, content = ? where id = ?"
//             const [rows, fields] = await pool.query(sql, [title, content, id])
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error)
//             res.json({
//                 status: "error"
//             })
//         }
//     },
//     delete: async (req, res) => {
//         try {
//             const { id } = req.params
//             const [rows, fields] = await pool.query("delete from posts where id = ?", [id])
//             res.json({
//                 data: rows
//             })
//         } catch (error) {
//             console.log(error)
//             res.json({
//                 status: "error"
//             })
//         }
//     }

// }

const Post = db.define('posts', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'posts', // Sesuaikan dengan nama tabel di database
    timestamps: false // Nonaktifkan timestamps
});

export const getAllPosts = async (req, res) => {
    try {
        const data = await Post.findAll();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.json({ status: "error" });
    }
};

export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        await Post.create({
            title: title,
            content: content
        });
        res.status(200).json({ message: "create success" })
    } catch (error) {
        console.log(error);
        res.json({ status: "error" });
    }
};
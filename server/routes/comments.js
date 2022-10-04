import express from "express";
import {addComment, deleteComment, getComment } from "../controllers/comments.js";
import { verifyToken } from "../verifyToken.js";
const route = express.Router()

route.post('/', verifyToken, addComment)
route.delete('/:id', verifyToken, deleteComment)
route.get('/:videoId', verifyToken, getComment)

module.exports = route
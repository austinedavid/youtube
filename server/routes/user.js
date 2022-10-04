import express from "express";
import { deleteUser, dislike, getUser, like, Subscribe, unsubscribe, update } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";
const route = express.Router()

// update user
route.put('/:id', verifyToken, update)
// delete user
route.delete('/:id', verifyToken, deleteUser)
// get user
route.get('/find/:id', getUser)
// subscribe user
route.put('/sub/:id', verifyToken, Subscribe)
//  unsubscribe user
route.put('/unsub/:id', verifyToken, unsubscribe)
//  like a video
route.put('/like/:videoId', verifyToken, like)
// dislike a video
route.put('/dislike/:videoId', verifyToken, dislike)


module.exports = route
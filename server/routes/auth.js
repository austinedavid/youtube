import express from "express";
import { signin, signup, googleAuth } from "../controllers/auth.js";
const route = express.Router()

// create a user
route.post('/signup', signup)
// signin a user
route.post('/signin', signin)
// google auth
route.post('/google', googleAuth)

module.exports = route
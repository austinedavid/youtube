// here we are creating a middleware to make sure user is signed in before making use of our resources

import jwt from "jsonwebtoken";
import {createError} from './error.js'

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token
    if(!token) return next(createError(401,  "you are not authenticated"))

    jwt.verify(token, process.env.SECRET_KEY, (err, user)=>{
        if(err) return next(createError(401, "token is not valid"))
        req.user = user

        next()
    })
}
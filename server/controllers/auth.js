import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import { createError } from '../error.js'
import jwt from 'jsonwebtoken'


// here is for signup a user to our account
export const signup = async(req, res,next)=>{
   
try {
   
   
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({...req.body, password: hash})
    await newUser.save()
    res.send('user created successfully')
} catch (err) {
   next(err)
}
}

// here is to login a user to our account
export const signin = async(req, res,next)=>{
    try {

        // here we verifies if there is a user
        // then we check if the password is matched
        const user = await User.findOne({name: req.body.name})
        if(!user) return next(createError(404, "user not found"))
            
        const isCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isCorrect) return next(createError(404, "password not correct"))
        const {password, ...others} = user._doc;

        // if the user is passed, we want to return or send the user credentials to the cookies or local storage
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY)
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(others)
    } catch (err) {
        next(err)
    }
}

// this is for google controller, 
export const googleAuth = async(req, res, next)=>{
    try {
        const user = await User.findOne({email: req.body.email})
        if(user){
            const token = jwt.sign({id: user._id}, process.env.SECRET_KEY)
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(user._doc)
        }else{
            const newUser = new User({...req.body, fromGoogle: true})
            const savedUser = await newUser.save()
            const token = jwt.sign({id: savedUser._id}, process.env.SECRET_KEY)
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(savedUser._doc)
            
        }
    } catch (error) {
        next(error)
    }
}


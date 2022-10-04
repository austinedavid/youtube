import { createError } from "../error.js"
import User from '../models/user.js'
import Video from "../models/video.js"

// here is for updating a user in our database
export const update = async(req, res,next)=>{
if(req.params.id === req.user.id){
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
           {$set: req.body }, {new: true}
            )

        res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
}else{
   return next(createError(404, "you can only update your account"))
}
}

// here is for deleting a user from our database
export const deleteUser = async(req, res, next)=>{
    if(req.params.id === req.user.id){

        try {
            await User.findByIdAndRemove(req.params.id)
            res.status(200).send("user deleted successfully")
        } catch (error) {
            next(error)
        }
      
    }else{
        next( createError(404, "you can only delete your account"))
    }
}

// this is when we want to get a particular user
export const getUser = async(req, res, next)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

// this is where we subscribe a particular user
export const Subscribe = async(req, res, next)=>{
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: {subscribedUsers: req.params.id}

        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: 1}
        })
        res.status(200).json("subscription successful")
    } catch (error) {
        next(error)
    }
}
// this is to unsubscribe users
export const unsubscribe = async(req, res)=>{
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: {subscribedUsers: req.params.id}

        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: -1}
        })
        res.status(200).json("unsubscription successful")
    } catch (error) {
        next(error)
    }
}

export const like = async(req, res, next)=>{
    const id = req.user.id;
    const videoId = req.params.videoId;

    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet:{likes: id},
            $pull: {dislikes: id}
        })
        res.status(200).json("this video has been liked")
    } catch (error) {
        next(error)
    }
}
export const dislike = async(req, res, next)=>{
    const id = req.user.id;
    const videoId = req.params.videoId;

    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet:{dislikes: id},
            $pull: {likes: id}
        })
        res.status(200).json("this video has been disliked")
    } catch (error) {
        next(error)
    }
}
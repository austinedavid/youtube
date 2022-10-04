import { createError } from "../error.js";
import Comments from "../models/comments.js";
import Video from "../models/video.js"


// this is to create a comment
export const addComment = async(req, res, next)=>{
    const newComment = new Comments({...req.body, userId: req.user.id})
    try {
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    } catch (error) {
        next(error)
    }
}


// this is to delete a comment
// comment can be deleted by the person that commented to the video
// and also to the owner of the video
export const deleteComment = async(req, res, next)=>{
    try {
        const comment = await Comments.findById(req.params.id)
        const video = await Video.findById(req.params.id)

        if(req.user.id === comment.id || req.user.id === video.id){
            await Comments.findByIdAndRemove(req.params.id)
            res.status(202).json("you have successfully deleted the comment")
        }else{
            next(createError(404, "you are not permitted to delete the comment"))
        }
    } catch (error) {
        next(error)
    }
}

// we make a get request for a particular comment
export const getComment = async(req, res, next)=>{
    try {
        const comments = await Comments.find({videoId: req.params.videoId})
        res.status(202).json(comments)
    } catch (error) {
        next(error)
    }
}
import Video from '../models/video.js'
import { createError } from '../error.js'
import User from '../models/user.js'


// controller part to create video
export const addVideo = async(req, res, next)=>{
    const newVideo = new Video({userId: req.user.id, ...req.body})
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo)
    } catch (error) {
        next(error)
    }
}

// controller part to update videos
export const updateVideo = async(req, res, next)=>{

    try {
        const video = await Video.findById(req.params.id);
        if(!video) return next(createError(404, "user is not found"));
        if(req.user.id === video.userId){
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})

            res.status(200).json(updatedVideo)
        }else{
            return next(createError(403, "you can only update your video"));
        }
   
    } catch (error) {
        next(error)
    }
}

// controller part to delete a video
export const deleteVideo = async(req, res, next)=>{
    try {
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404, "this video is not available to be deleted"));
        if(req.user.id === video.userId){
            await Video.findByIdAndRemove(req.params.id)
            res.status(200).json("video deleted successfully")
        }
    } catch (error) {
        next(error)
    }
}

// here we are just going to return a video to the user based on the id
export const getVideo = async(req, res, next)=>{
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (error) {
        next(error)
    }
}

// this is to increase the number of views when this request is made
export const addview = async(req, res, next)=>{
    try {
         await Video.findByIdAndUpdate(req.params.id, {$inc: views +1}, {new: true})
        res.status(200).json("amount of views have been updated")
    } catch (error) {
        next(error)
    }
}

// this request will return a random video from the database
export const random = async(req, res, next)=>{
    try {
        const videos = await Video.aggregate([{$sample: {size:40}}])
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

// here we get the trending videos based on the views
export const trend = async(req, res, next)=>{
    try {
        const videos = await Video.find().sort({views: -1})
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

// here we subscribe to a particular channel
export const sub = async(req, res, next)=>{
    try {
      const user =  await User.findById(req.user.id)
      const subscribedChannel = user.subscribedUsers;

      const list = await Promise.all(
        subscribedChannel.map(channelId=>{
            return Video.find({userId: channelId})
        })
      )
//  here we send back the subscibed video to our user
// the flat method used is remove the extra blacket it returns
//  based on first that wass created, make use of sort()for this.
      res.status(200).json(list.flat().sort((a,b)=>b.createdAt - a.createdAt))
    } catch (error) {
        next(error)
    }
}

export const getByTags = async(req, res, next)=>{
    const tags = req.query.tags.split(",")

    console.log(tags)
    try {
        const videos = await Video.find({tags: {$in: tags}}).limit(20)
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }}

    // this part is trigered for user that is looking for a particular video by search method
    export const search = async(req, res, next)=>{
        const query = req.query.q
        try {
            const videos = await Video.find({
                title: {$regex: query, $options: 'i'}
            }).limit(20)
            res.status(200).json(videos)
        } catch (error) {
            next(error)
        }}
    
const express = require("express");
import { addVideo, addview, deleteVideo, getByTags, getVideo, random, search, sub, trend, updateVideo } from "../controllers/video.js";
const route = express.Router()

import {verifyToken} from '../verifyToken.js'

// creating a video, using post method
route.post('/', verifyToken, addVideo)

// updating a video using a put method
route.put('/:id', verifyToken, updateVideo)

// deleting a video using a delete method
route.delete('/:id', verifyToken, deleteVideo)

// geting videos, using a get request
route.get('/find/:id',  getVideo)

route.put('/view/:id',  addview)

route.get('/trend',  trend)

route.get('/random',  random)

route.get('/sub', verifyToken,  sub)

route.get('/tags',  getByTags)

route.get('/search',   search)


module.exports = route
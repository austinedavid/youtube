const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()
const userRoutes = require('./routes/user') 
const videoRoutes = require('./routes/video')
const commentsRoutes = require('./routes/comments')
const authRoutes  = require('./routes/auth')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express()


const connect = ()=>{
    mongoose.connect(process.env.MONGO)
    .then(()=>console.log('connected to MONGODB'))
    .catch((error)=>console.log(error))
}
app.use(express.json())
app.use(cookieParser())
app.use(cors())

const port = process.env.PORT || 8800
app.use('/app/auth', authRoutes)
app.use('/app/user', userRoutes)
app.use('/app/videos', videoRoutes)
app.use('/app/comments', commentsRoutes)

app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "something went wrong with your request!!"

    return res.status(status).json({
        success: 'false',
        status,
        message
    })
})

app.listen(port, ()=>{
    connect()
    console.log(`app connected to port ${port}...`)
})

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import logo from '../Images/logo.png'
import Comments from '../components/Comments';
import Card from '../components/Card';
import {useSelector, useDispatch} from 'react-redux'
import { useLocation } from 'react-router-dom';
import axios, { Axios } from 'axios';
import {fetchfailure, fetchsuccess, fetchpending, like, dislike} from '../redux/videoSlice'
import {subscription} from '../redux/userSlice'
import { format } from 'timeago.js';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Recommendation from '../components/Recommendation';


// this is part of our styling 
const Container = styled.div`
display: flex;
color: ${({theme})=> theme.soft};
gap: 10px;
`
   

const Content = styled.div({
    flex: 5,
})

const Videowrapper = styled.div({
    
})
const Title = styled.h1({
    fontSize: '18px'
})
const Details = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
})
const Info = styled.span({
    
})
const Buttons = styled.div({
    display: 'flex',
    alignItems: 'center',
    gap: '5px'

})
const Button = styled.button({
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    cursor: 'pointer'
})

const Hr =  styled.hr`
margin-top: 10px;
border: 0.5px solid ${({theme})=> theme.softText};
`
const Channel = styled.div({
    display: 'flex',
    
    justifyContent: 'space-between',
    marginTop: '10px',
    gap: '20px'

})
const ChannelInfo = styled.div({
    display: 'flex',
    gap: '10px',
    fontSize: '14px'
})
const ChannelSub = styled.button({
    height: 'fit-content',
    padding: '5px 2px',
    color: 'white',
    backgroundColor: 'red',
    border: '0px',
    borderRadius: '10px',
    cursor: 'pointer',

})
const ChannelNames = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
})
const ChannelName = styled.span({

})

const ChannelImage = styled.img({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#999',
})

const VideoFrame = styled.video({
    maxHeight: '750px',
    width: "100%",
    objectFit: 'cover',

})


    


// this is part of our functional component
const Video = () => {
    const {currentuser} = useSelector((state)=>state.user)
    const {currentvideo} = useSelector((state)=> state.video)
    const dispatch = useDispatch()
    const path = useLocation().pathname.split('/')[2]
    
    // here we fetch our video and channels
    
    const [channel, setchannel] = useState({})
    
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const videoRes = await axios.get(`/videos/find/${path}`)
                const channelRes = await axios.get(`/user/find/${videoRes.data.userId}`)
                
                dispatch(fetchsuccess(videoRes.data))
                setchannel(channelRes.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[path, dispatch])

    // here we create a function to like and also to dislike a video
    const handleLike = async()=>{
        await axios.put(`/user/like/${currentvideo._id}`)
        dispatch(like(currentuser._id))
    }
    const handleDislike = async()=>{
        await axios.put(`/user/dislike/${currentvideo._id}`)
        dispatch(dislike(currentuser._id))
    }

    // this is to handle the subscription of users
    const handleSub = async()=>{
        currentuser.subscribedUser.includes(channel._id)?
        await axios.put(`/user/unsub/${channel._id}`):
        await axios.put(`/user/sub/${channel._id}`)
        dispatch(subscription(channel._id))
    }
  return (
    <Container>
        <Content>
            <Videowrapper>
                <VideoFrame src={currentvideo.videoUrl} controls/>
            </Videowrapper>
            <Title>{currentvideo.title}</Title>
            <Details>
                <Info>{currentvideo.views} views. {format(currentvideo.createdAt)}</Info>
                <Buttons>
                    <Button onClick={handleLike}>
                        
                        {currentvideo.likes?.includes(currentuser._id)? <SentimentSatisfiedIcon/>:<ThumbUpIcon/>}
                        {currentvideo.likes?.length}
                    </Button>
                    <Button onClick={handleDislike}>
                        {currentvideo.dislikes?.includes(currentuser._id)? <SentimentVeryDissatisfiedIcon/>:<ThumbDownAltIcon/>}
                        {currentvideo.dislikes?.length}
                    </Button>
                    <Button>
                        <ReplyIcon/>
                        share
                    </Button>
                    <Button>
                        <SaveAltIcon/>
                        save
                    </Button>
                </Buttons>
            </Details>
            <Hr/>
            <Channel>
                <ChannelInfo>
                    <div>
                    <ChannelImage src={channel.img}/>
                    </div>
                    
                    <ChannelNames>
                        <ChannelName>{channel.name}</ChannelName>
                        <ChannelName>{currentvideo.desc}</ChannelName>
                    </ChannelNames>
                </ChannelInfo>
                <ChannelSub onClick={handleSub}>{currentuser.subscribedUser?.includes(channel._id)?"unsubscribe":"subscribe"}</ChannelSub>
            </Channel>
            <Hr/>
            <Comments videoId={currentvideo._id}/>
        </Content>
        <Recommendation tags={currentvideo.tags}/>
    </Container>
  )
}

export default Video
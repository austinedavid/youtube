import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import videoImg from '../Images/video.webp';
import logo from '../Images/logo.png'
import { Link } from 'react-router-dom';
import {format} from 'timeago.js'
import axios from 'axios';

// this is for styling the component
const Container =  styled.div`
    width: 250px;
    margin-bottom: ${(props)=> props.type === 'sm'? '10px': '20px'};
    cursor: pointer;
    display: ${(props)=> props.type === 'sm' && 'flex'};
    gap: 10px;
`
    


const Image = styled.img`
width: 100%;
height: ${(props)=> props.type === 'sm'? '120px': '202px'} ;
background-color: #999;
`
    


const Details = styled.div({
    marginTop: '5px',
    display: 'flex',
    gap: '1rem'
})

const ChannelImage =  styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999;
    display: ${(props)=> props.type === 'sm' && 'none'};
`
    

const ChannelInfo = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: '7px'
    
})
const ChannelName = styled.h1({
    fontSize: '16px',
    fontWeight: 500

})
const ChannelTitle =  styled.h2({
    fontSize: '14px'
})
const Info =  styled.div({
    fontSize: '14px'
})

// this is the functional component of the card
const Card = ({type, video}) => {
    const [channel, setchannel] = useState({})

    useEffect(()=>{
        const fetchchannel = async()=>{
            
                const res = await axios.get(`/user/find/${video.userId}`)
                setchannel(res.data)
            
        }
        fetchchannel()
    }, [video.userId])
  return (
    <Link to={`/video/${video._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
    <Container type={type}>
        <Image src={video.imgUrl} type={type}/>
        <Details type={type}>
            <ChannelImage src={channel.img} type={type}/>
            <ChannelInfo>
                <ChannelName>{video.title}</ChannelName>
                <ChannelTitle>{channel.name}</ChannelTitle>
                <Info>{video.views}views, {format(video.createdAt)}</Info>
            </ChannelInfo>
        </Details>
    </Container>
    </Link>
  )
}

export default Card
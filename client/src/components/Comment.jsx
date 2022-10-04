import { current } from '@reduxjs/toolkit'
import axios from 'axios'
import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import logo from '../Images/logo.png'
import {format} from 'timeago.js'

// this is for our styling of components
const Container =  styled.div({
display: 'flex',
gap: '10px',
marginTop: '30px',
})
const Avatar =  styled.img({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#999',
})
const Comwrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
})
const Spanner = styled.div({
    display: 'flex',
    gap: '5px',
})
const Span = styled.span({
    fontSize: '10px',
    
})
const Details = styled.p({
    fontSize: '14px',
})
// this is for jsx of our functional components

const Comment = ({comment}) => {
    const[channel, setchannel] = useState({})
    console.log(`user id is: ${comment.userId}`)
    useEffect(()=>{
        const fetchComment = async()=>{
            try {
                const res = await axios.get(`/user/find/${comment.userId}`)
                setchannel(res.data)
            } catch (error) {
                console.log(`the error is: ${error}`)
            }
        } 
        fetchComment()
    },[comment.userId])

    console.log(`this is channel name: ${channel}`)
  return (
    <Container>
        <div><Avatar src={channel.img}/></div>
        
        <Comwrapper>
            <Spanner>
                <Span>{channel.name}</Span>
                <Span>{format(channel.createdAt)}</Span>
            </Spanner>
            <Details>{comment.desc}</Details>
        </Comwrapper>
    </Container>
  )
}

export default Comment
import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import logo from '../Images/logo.png'
import Comment from './Comment'
import axios from 'axios'
import {useSelector} from 'react-redux'

// this is the part for the styling of our component
    const Container = styled.div({
        marginTop: '10px',
        
    })
    const Newcomments = styled.div({
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    })

    const Avatar = styled.img({
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#999',
       

    })

    const Input =  styled.input`
    border: none;
     background-color: transparent;
     outline: none;
    color: ${({theme})=>theme.text};
    padding: 4px 5px;
    width: 100%;
    border-bottom: 1px solid black;
    `

    
// bellow is the functional component of the application

const Comments = ({videoId}) => {
    const [comment, setcomment] = useState([])
    const {currentuser} = useSelector(state=> state.user)

    useEffect(()=>{
        const fetchComment = async()=>{
            try {
                const res = await axios.get(`/comments/${videoId}`)
                setcomment(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchComment()
    },[videoId])
  return (
    <Container>
        <Newcomments>
            <Avatar src={currentuser.img}/>
            <Input placeholder='add a comment...'/>
        </Newcomments>
        {comment.map((comment)=>(
            <Comment key={comment._id} comment={comment}/>
        ))}
        
        
        
    </Container>
  )
}

export default Comments
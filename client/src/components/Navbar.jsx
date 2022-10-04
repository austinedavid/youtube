import React, { useState } from 'react'
import styled from 'styled-components'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { padding } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import {Avatar} from '@mui/material'
import UploadVideo from './UploadVideo';

// this is for styling the components below
const Container = styled.div`
background-color:  ${({theme})=> theme.bg};
color: ${({theme})=>theme.text};
position: sticky;
top: 0;
height: 56px;
`


const Wrapper =  styled.div({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  padding: '0px 20px',
  justifyContent: 'flex-end',
  position: 'relative'
})
const Search = styled.div({
  width: '40%',
  position: 'absolute',
  right: 0,
  left: 0,
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '5px',
  border: '1px solid #ccc',
  borderRadius: '3px'
})
const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({theme})=>theme.text};
`
  


const Button = styled.button({
  padding: '3px 3px',
  borderRadius: '7px',
  border: '1px solid blue',
  color: 'blue',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '5px'
})

const User = styled.div`
display: flex;
align-items: center;
gap: 10px;
font-weight: 500;
color: ${({theme})=> theme.text};
`

// here is our functional component
const Navbar = () => {
  const {currentuser} = useSelector(state=> state.user)
  const [open, setopen] = useState(false)
  const [q, setq] = useState('')
  const navigate =  useNavigate()
  console.log(currentuser)
  return (
    <>
    <Container>
        <Wrapper>
          <Search>
            <Input placeholder='search' onChange={(e)=>setq(e.target.value)}/>
            <SearchIcon onClick={()=>navigate(`/search?q=${q}`)}/>
          </Search>
          {
            currentuser? (
              <User >
                <VideoCallIcon onClick={()=>setopen(true)}/>
                <Avatar src={currentuser.img}/>
                {currentuser.name}
              </User>
            ):
            <Link to='signin' style={{textDecoration: 'none'}}>
            <Button>
              <AccountCircleIcon /> SIGN IN
            </Button>
            </Link>

          }
          
        </Wrapper>
    </Container>
         {open && <UploadVideo setopen={setopen}/>} 
    </>
  )
}




export default Navbar
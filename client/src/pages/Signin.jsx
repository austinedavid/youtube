import { borderRadius } from '@mui/system'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import {loginfailure, loginpending, loginsuccess} from '../redux/userSlice'
import {auth, provider} from '../firebase'
import {signInWithPopup} from 'firebase/auth'
import { async } from '@firebase/util'
import GoogleButton from 'react-google-button'
import {useNavigate} from 'react-router-dom'

// this is for stling the components
const Container =  styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90vh',
})
const Wrapper =  styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px 50px;
    background-color: ${({theme})=> theme.bg};
    gap: 10px
`
const Title = styled.h1({
    fontSize: '24px'
})
const Subtitle = styled.h2({
    fontSize: '20px',
    fontWeight: 500,
}) 

const Input = styled.input({
    width: '100%',
    padding: '5px',
    outline: 'none',
    borderRadius: '5px',
    
})
const Button = styled.button({
    padding: '10px 20px',
    borderRadius: '10px',
    border: '2px solid blue',
    cursor: 'pointer'

})
// this is actually the functional component

const Signin = () => {
    // creating a state to handle both our signup and login to our app
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()

    const dispatch = useDispatch()
    // handling login function
    const handleLogin = async(event)=>{
        event.preventDefault()
        dispatch(loginpending())
        try {
            const res =  await axios.post('/auth/signin', {name, password})
            dispatch(loginsuccess(res.data))

            // then naviage to home page
            
        } catch (error) {
            dispatch(loginfailure())
        }

        setname("")
        setpassword("")

        navigate('/')
       
      
    }
    // this is to handle google login
    const signinWithGoogle = async()=>{
       
        signInWithPopup(auth, provider)
        .then((result)=>{
            axios.post("/auth/google", {
                name: result.user.displayName,
                email: result.user.email,
                img: result.user.photoURL
            }).then((res)=>{
                dispatch(loginsuccess(res.data))
            })

        })
        .catch((err)=>{
            console.log(err)
            dispatch(loginfailure())
        })

        navigate('/')
    }
  return (
    <Container>
        <Wrapper>
           <Title>sign in</Title>
           <Subtitle>to continue with davtube</Subtitle>
           <Input placeholder='username' onChange={(event)=>setname(event.target.value)}
           value={name}
           />
           <Input type='password' placeholder='enter password' onChange={(event)=>setpassword(event.target.value)}
           value={password}
           />
           <Button onClick={handleLogin}>signin</Button>
           <Title>or</Title>
           <GoogleButton onClick={signinWithGoogle}/>
           <Title>or</Title>
           <Input placeholder='username' onChange={(event)=>setname(event.target.value)}/>
           <Input placeholder='email' onChange={(event)=> setemail(event.target.value)}/>
           <Input type='password' placeholder='enter password' onChange={(event)=>setpassword(event.target.value)}/>
           <Button>sign up</Button>
        </Wrapper>
    </Container>
  )
}

export default Signin
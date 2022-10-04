

import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase'

import axios from 'axios';
import {useNavigate} from 'react-router-dom'



// here we write our styling 
const Container = styled.div({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    background: 'rgba(0,0,0,0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})
const Wrapper = styled.div({
    width: '600px',
    height: '500px',
    backgroundColor: 'white',
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    gap: '10px',
    position: 'relative'
})
const Close = styled.div({
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer'
})

const Title = styled.h3({})

const Input = styled.input({
    border: '1px solid black',
    padding: '10px',
    borderRadius: '10px'
})

const Textarea = styled.textarea({
    border: '1px solid black',
    padding: '10px',
    borderRadius: '10px'
})

const Button = styled.button({
    backgroundColor: 'green',
    padding: '10px',
    border: '0px',
    borderRadius: '10px',
    color: 'white'
})

const Label = styled.label({
    fontSize: '14px'
})
// here below is our styled components
const UploadVideo = ({setopen}) => {
    const[img, setimg] = useState(undefined)
    const[video, setvideo] = useState(undefined)
    const[imgprogress, setimgprogress] = useState("")
    const[videoprogress, setvideoprogress] = useState("")
    const[input, setinput] = useState({})
    const[tags, settags] = useState([])

    const navigate = useNavigate()
    

    const handleChange = (e)=>{
        setinput((prev)=>{
            return{...prev, [e.target.name]:e.target.value}
        })
    }

    // this function below handles both uploading of img and videos
    const uploadfiles = (file, urlType)=>{
        const storage = getStorage(app);
        const filename = new Date().getTime() + file.name
        const storageRef = ref(storage, filename)

        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', 
        (snapshot) => {
           
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            urlType === 'imgUrl'? setimgprogress(Math.round(progress)): setvideoprogress(Math.round(progress))
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
                default:
                break;
            }
        }, 
        (error) => {},
        () => {
            
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setinput((prev)=>{
                    return{...prev, [urlType]:downloadURL}
                })
            });
          }
        )
    }
    // we will create two use effect here to automatically handle both image and video uploads
    useEffect(()=>{
        img && uploadfiles(img, "imgUrl")
    },[img])
    useEffect(()=>{
       video && uploadfiles(video, "videoUrl")
    },[video])

   
    const handleTags = (e)=>{
        settags(e.target.value.split(','))
    }

    // here we make use of our submit buttton to send data to our mongodb
    const handleUpload = async(e)=>{
        e.preventDefault()

        const res = await axios.post('/videos', {...input, tags})
        setopen(false)
        res.status===200 && navigate(`/video/${res.data._id}`)
    }
  return (
    <Container>
        <Wrapper>
            <Close onClick={()=>setopen(false)}>X</Close>
            <Title>upload new videos</Title>
            {videoprogress > 0? ("uploading:" + videoprogress + '%'):(<Input type='file' accept='video/*' onChange={(e)=>setvideo(e.target.files[0])}/>)}
            <Label>video:</Label>
            <Input type='text' placeholder='title' name='title' onChange={handleChange}/>
            <Textarea placeholder='description' rows='6' name='desc' onChange={handleChange}/>
            <Input type='text' placeholder='separate the tags with comma' onChange={handleTags}/>
            {imgprogress > 0? ("uploading:" + imgprogress + '%'):(<Input type='file' accept='image/*' onChange={(e)=>setimg(e.target.files[0])}/>)}
            <label>image:</label>
            <Button onClick={handleUpload}>SUBMIT</Button>
        </Wrapper>
    </Container>
  )
}

export default UploadVideo
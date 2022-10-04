import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import axios from 'axios'

// this part is for styling the conponents
const Container =  styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
})

const Home = ({type}) => {
  // here we make our get request for random videos
  const [videos, setvideos] = useState([]);

  useEffect(()=>{
    const fetchVideos = async()=>{
      const res = await axios.get(`/videos/${type}`)
      console.log(res.data)
      setvideos(res.data)
    }
    fetchVideos()
  }, [type])
  return (
    <Container>
        
       {
        videos.map((video)=>(
          <Card key={video._id} video={video}/>
        ))
       }
    </Container>
  )
}

export default Home

import axios from 'axios'
import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import Card from './Card'

const Container = styled.div({
    flex: 2
})

const Recommendation = ({tags}) => {
    const [videos, setvideos] = useState([])

    useEffect(()=>{
        const fetchvideos = async()=>{
            const res = await axios.get(`/videos/tags?tags=${tags}`)
            setvideos(res.data)
        }
        fetchvideos()
    },[tags])
  return (
    <Container>
        {
            videos.map((video)=>
                (<Card type='small' key={videos._id} video={video}/>)
            )
        }
    </Container>
  )
}

export default Recommendation
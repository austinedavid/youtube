import axios from 'axios'
import React, {useState, useEffect}from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Card from '../components/Card'

const Container = styled.div({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
})
const Search = () => {
    const [videos, setvideos] = useState([])
    const query = useLocation().search

    useEffect(()=>{
        const fetchvideos = async()=>{
            const res = await axios.get(`/videos/search/${query}`)
            setvideos(res.data)
        }
        fetchvideos()
    },[query])
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

export default Search
import React from 'react'
import styled  from 'styled-components'
import youtubePix from '../Images/youtube.svg'
import HomeIcon from '@mui/icons-material/Home';
import ExploreOffIcon from '@mui/icons-material/ExploreOff';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import LogoutIcon from '@mui/icons-material/Logout';
import {logout} from '../redux/userSlice'




import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';


// this is our styled part
// const Container = styled.div({
//     height: '100vh',
//     position: 'sticky',
//     top: 0,
//     flex: 1,
//     background: `${({theme})=> theme.bg}`,
//     color: `${({theme})=> theme.bg}`,
//     height: '100vh',
  
    

  

// })
const Container = styled.div`
height: 100vh;
position: sticky;
top: 0;
flex: 1;
background-color:  ${({theme})=> theme.bg};
color: ${({theme})=>theme.text};
height: 100vh;
`
   
  
    

  



const Wrapper =  styled.div({
    padding: '18px 26px',
    fontSize: '14px'
})
const Logo = styled.div({
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontWeight: 'bold',
    fontSize: '14px',
    marginBottom: '25px'
})
const Img = styled.img({
    height: '25px'
})
const Item = styled.div`
display: flex;
align-items: center;
gap: 10px;
cursor: pointer;
padding: 7.5px 0px;

&:hover{
    background-color: rgba(0,0,0,0.4)
};
`
   


const Hr = styled.hr`
margin: 7px 0px;
border: 1px solid ${({theme})=> theme.soft}
`
    

const Login = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    padding: '7px 0px',
    cursor: 'pointer',
})
const Button =  styled.button({
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



// this is for our functional components
const Menu = ({black, setblack}) => {
    const {currentuser} = useSelector(state=> state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
  return (
   <Container>
        <Wrapper>
            <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}>
            <Logo>
                <Img src={youtubePix}/>
                davtube
            </Logo>
            </Link>
            
            <Item>
                <HomeIcon/>
                Home
            </Item>
            <Link to='trends' style={{textDecoration: 'none', color: 'inherit'}}>
            <Item>
                <ExploreOffIcon/>
                Explore
            </Item>
            </Link>
            <Link to='subscriptions' style={{textDecoration: 'none', color: 'inherit'}}>
            <Item>
                <SubscriptionsIcon/>
                Subscription
            </Item>
            </Link>
            <Hr/>
            <Item>
                <VideoLibraryIcon/>
                Library
            </Item>
            <Item>
                <HistoryIcon/>
                History
            </Item>
            <Hr/>{
                    !currentuser && (
                        <>
                <Login>
                    signin to like videos, subscribe and comment
                    <Link to='signin' style={{textDecoration: 'none', color: 'inherit'}}>
                    <Button><AccountCircleIcon/> SIGN IN</Button>
                    </Link>
                </Login>
                <Hr/>
                </>
                    )

                }
                
            <Item>
                <SportsEsportsIcon/>
                Sports
            </Item>
            <Item>
                <SportsBasketballIcon />
                Gaming
            </Item>
            <Item>
                <SlideshowIcon />
                Movies
            </Item>
          
           
           
            {
                black? <Item onClick={()=>setblack(!black)}>
                <WbSunnyIcon/>
                Light mode
            </Item> :<Item onClick={()=>setblack(!black)}>
                <DarkModeIcon />
                dark mode
            </Item>
            }

            {
                currentuser && (
                    <Item onClick={()=>
                    {dispatch(logout());
                    navigate('/signin')
                    }}>
                        <LogoutIcon/>
                        logout
                    </Item>
                )
            }
        </Wrapper>
   </Container>
  )
}

export default Menu
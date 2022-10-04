import './App.css'
import styled, { ThemeProvider } from 'styled-components'
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import {darkTheme, lightTheme} from './utils/Themes'
import { useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Video from './pages/Video'
import Signin from './pages/Signin';
import {useSelector} from 'react-redux'
import Search from './pages/Search';



const Container = styled.div({
  display: 'flex',
})
const Main = styled.div`
flex: 7;
background-color: ${({theme})=> theme.bgLighter};
color: ${({theme})=> theme.text};
`




const Wrapper = styled.div({
  padding: '22px 96px'
})

function App() {
  
  
 const [black, setblack] = useState(true)


  return (
    <ThemeProvider theme={black? darkTheme : lightTheme}>
      <Router>
    <Container>
      <Menu black={black} setblack={setblack}/>
      
        <Main>
          <Navbar/>
          <Wrapper>
            <Routes>
              <Route path='/'>
                <Route index element={<Home type="random"/>}/>
                <Route path='trends' element={<Home type="trend"/>}/>
                <Route path='subscriptions' element={<Home type="sub"/>}/>
                <Route path='signin' element={<Signin/>}/>
                <Route path='search' element={<Search/>}/>
                <Route path='video'>
                  <Route path=':id' element={<Video/>}/>
                </Route>
              </Route>
            </Routes>
          </Wrapper>
        </Main>
      
    </Container>
    </Router>
    </ThemeProvider>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
import React,{useEffect,useState} from 'react'
import LoginPage from './components/LoginPage';
import ChatBox from './components/ChatBox';
import InputBox from './components/InputBox';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRegister from './components/UserRegister';
import ChatPage from './components/ChatPage';
import SetAvatar from './components/SetAvatar';



function App() {


  const [msg,setmsg]=useState('')
  const [recievemsg,setRmsg]=useState("")
  const [room,setroom]=useState('')

  const [login,setloginStatus]=useState(false)

 const handleLoginStatus =(status)=>{

  setloginStatus(status)

 }

  useEffect(()=>{

    const data= localStorage.getItem("userdata")

    if(data!==null)
    {
      setloginStatus(true)
    }

  },[])


  return (
    <div className="App" >
      <BrowserRouter>

      <Routes>
        <Route  path={"/login"} element={<LoginPage/>}/>
        <Route  path={"/register"} element={<UserRegister/>}/>
        <Route  path={"/"} element={<ChatPage/>}/>
        <Route path='/setavatar' element={<SetAvatar />} />
      </Routes>
      </BrowserRouter>
{/* 
{login ? (<>
  <ChatBox />
</>):(<LoginPage loginStatus={handleLoginStatus} />)}
       */}
     
    </div>
  );
}

export default App;

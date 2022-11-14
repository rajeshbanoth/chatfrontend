import React, { useEffect, useRef, useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { Avatar, Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from "uuid";
import ChatInput from './ChatInput';
import axios from 'axios';
import { recieveMessageRoute, sendMessageRoute } from '../utils/apiRoutes';
import styled from "styled-components";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function ChatContainer({ currentChat, socket,goback }) {
    const [messages, setmessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [typingStatus, setTypingStatus] = useState(false)
    const [messageSent, setmessageSent] = useState(false)
    const [images, setimages] = useState([])
    const scrollRef = useRef();

    useEffect(() => {
        async function fetchmessage() {
            const data = await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            );
            const response = await axios.post(recieveMessageRoute, {
                from: data._id,
                to: currentChat._id,
            });
            setmessages(response.data);
        }

        fetchmessage()

    }, [currentChat]);


    const handleSendImage = async (files) => {


        const data = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        let msgs = [...messages];
        // for (var i = 0; i < files.length; i++) {
        let msg = {
            text: '',
            image: files[0].base64_file,
            file: ''
        }
        socket.current.emit("upload_images", {
            to: currentChat._id,
            from: data._id,
            message: msg
        })
        msgs.push({ fromSelf: true, message: msg });
        // }



        setmessages(msgs);
    }



    const handleSendMsg = async (msg) => {
        const data = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );

        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: data._id,
            msg: msg
        });


        await axios.post(sendMessageRoute, {
            from: data._id,
            to: currentChat._id,
            message: msg,

        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setmessages(msgs);
    };


    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });


            socket.current.on("typing_status", (tying_status) => {
                console.log(tying_status, "status")
                setTypingStatus(tying_status)
            })


            socket.current.on("recieve_images", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });


            })

            socket.current.on("message_sent", (msg) => {
                if (msg === "sent") {
                    setmessageSent(true)
                }


            })
        }
    }, []);



    useEffect(() => {
        arrivalMessage && setmessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);



    const goToUserPage=()=>{
        goback(true)

    }


    return (
        <>





            <nav class="navbar navbar-default" style={{ backgroundColor: '#e3f2fd' }}>
                <div class="container-fluid">
                    <div class="navbar-header" >
                        <IconButton sx={{ display: { md: "none", lg: 'none' } }}  onClick={goToUserPage}>

                            <ArrowBackIcon />
                        </IconButton>
                    </div>
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">
                            <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} width="30" height="30" class="d-inline-block align-top" alt="" />
                            {currentChat.username}
                        </a>
                    </div>

                    <ul class="nav navbar-nav">
                        {/* <li class="active"><a href="#">Home</a></li>
      <li><a href="#">Page 1</a></li>
      <li><a href="#">Page 2</a></li>
      <li><a href="#">Page 3</a></li> */}
                    </ul>
                </div>
            </nav>
            <div style={{ overflowY: 'scroll', height: '83vh', paddingTop: '65px' }}>

                {messages.map((item) => (

                    <div ref={scrollRef} key={uuidv4()}>

                        {item.fromSelf ? (<>


                            <div ref={scrollRef} key={uuidv4()} style={{ padding: '20px', display: 'flex', flexDirection: 'row-reverse' }}>
                                <div style={{
                                    float: 'right',
                                    maxWidth: '75%',
                                    backgroundColor: '#651fff',
                                    borderRadius: '10px',
                                    padding: '10px'
                                }}>
                                    {item.message.image !== "" && <img width={300} height={400} src={item.message.image} />}
                                    <Typography style={{ color: '#ffffff' }}>
                                        {item.message.text}
                                    </Typography>

                                    <span style={{ fontSize: '10px', float: 'right' }}>{"12 jan"}</span>
                                </div>
                            </div>

                        </>) : (<>
                            <div ref={scrollRef} key={uuidv4()} style={{ padding: '20px', display: 'flex' }}>
                                <div style={{
                                    maxWidth: '75%',
                                    backgroundColor: '#bdbdbd',
                                    borderRadius: '10px',
                                    padding: '10px'
                                }}>
                                    {item.message.image !== "" && <img width={300} height={400} src={item.message.image} />}

                                    <Typography  >
                                        {item.message.text}
                                    </Typography>
                                    <span style={{ fontSize: '10px', float: 'right' }}>{"12-jan"}</span>
                                </div>
                            </div>

                        </>)}



                    </div>))}


            </div>
            <div style={{ float: 'left' }}>
                {typingStatus && " typing..."}
            </div>

            <div style={{ height: '10vh' }}>
                <ChatInput handleSendmsgProp={handleSendMsg} currentChat={currentChat} socket={socket} handleSendImage={handleSendImage} />

            </div>







            {/*  */}
        </>
    );
}


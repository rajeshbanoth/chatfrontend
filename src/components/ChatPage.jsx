import { ContactPage } from '@mui/icons-material'
import { Avatar, Grid } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetUsersList, host } from '../utils/apiRoutes'
import ChatContainer from './ChatContainer'
import Contacts from './Contacts'

import { io } from "socket.io-client";
import CurrentUserAppBar from './CurrentUserAppBar'

export default function ChatPage(props) {
    const navigate = useNavigate()
    const [chatContainerClose, setchatContainerClose] = useState(false)
    const [contactStatus, setContactStatus] = useState(true)

    const [contacts, setcontacts] = useState([])
    const [currentUser, setcurrentUser] = useState(undefined)
    const [currentChat, setcurrentChat] = useState(undefined)

    const socket = useRef();

    const ChangeChat = (contact) => {
        setcurrentChat(contact)
    }


    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser]);

    useEffect(() => {

        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate('/login')
        }
        else {
            setcurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)))
        }


    }, [])

    useEffect(() => {

        async function processdata() {

            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    await axios.get(`${GetUsersList}/${currentUser._id}`).then(result => {
                        if (result.status === 200) {
                            setcontacts(result.data)
                        }
                    })
                }
                else {
                    navigate('/setavatar')
                }
            }


        }

        processdata()

    }, [currentUser])

    const goback = (status) => {
        setchatContainerClose(status)
        setContactStatus(true)

    }

    const contactpageopen = (status) => {
        setContactStatus(status)
        setchatContainerClose(false)
    }


    return (
        <>


            <Grid container spacing={2} sx={{ display: { xs: 'none', sm: 'none',lg:'flex',md:'flex' } }}>

                <Grid item xs={12} md={4} lg={4}>

                    <CurrentUserAppBar />

                    <Contacts contacts={contacts} changeChat={ChangeChat} contactpageopen={contactpageopen} />

                </Grid>

                <Grid item xs={12} md={8} lg={8} sx={{ height: '100vh' }}>
                    {currentChat !== undefined ? (<>
                        <ChatContainer currentChat={currentChat} socket={socket} goback={goback} />
                    </>) : (<>

                        select a chat

                    </>)}

                </Grid>




            </Grid>
            <Grid container spacing={2} sx={{ display: { xs: 'block', sm: 'block', md: "none", lg: 'none' } }} >

                {contactStatus && <Grid item xs={12} md={4} lg={4}>

                    <CurrentUserAppBar />

                    <Contacts contacts={contacts} changeChat={ChangeChat} contactpageopen={contactpageopen} />

                </Grid>}


                {!chatContainerClose && (
                    <Grid item xs={12} md={8} lg={8} sx={{ height: '100vh' }}>
                        {currentChat !== undefined ? (<>
                            <ChatContainer currentChat={currentChat} socket={socket} goback={goback} />
                        </>) : (<>

                            select a chat

                        </>)}

                    </Grid>

                )}

            </Grid>

        </>
    )
}

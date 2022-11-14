import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import ReactImageFileToBase64 from "react-file-image-to-base64";
import { REACT_APP_LOCALHOST_KEY } from '../utils/apiRoutes';

export default function ChatInput({ currentChat, socket, handleSendmsgProp, handleSendImage }) {

    const [msg, setmsg] = useState(null)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [files, setFiles] = useState([])

    const handleEmojiPickerhideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };


    const handleinputmsg = async (e) => {
        setmsg(e.target.value)

        const data = await JSON.parse(
            localStorage.getItem(REACT_APP_LOCALHOST_KEY)
        );
        socket.current.emit("typing_status", {
            to: currentChat._id,
            from: data._id,
            typingStatus: true
        });

    }

    const handleEmojiClick = (event, emojiObject) => {
        console.log(event.emoji)
        let message = msg;
        if (message === undefined) {
            setmsg(event.emoji)
        }
        else {

            message += event.emoji;
            setmsg(message);
        }

    };

    const handleSendmsg = () => {
        setShowEmojiPicker(false)

        let msgdata = {
            text: msg,
            image: '',
            file: ''
        }
        setmsg('')

        handleSendmsgProp(msgdata)

    }

    const handleOnBlurEvent = async () => {

        const data = await JSON.parse(
            localStorage.getItem(REACT_APP_LOCALHOST_KEY)
        );
        socket.current.emit("typing_status", {
            to: currentChat._id,
            from: data._id,
            typingStatus: false
        });

    }

    const handleKeypress = (e) => {

        if (e.keyCode === 13) {
            setShowEmojiPicker(false)
            handleSendmsg()
        }

    }

    const handleOnCompleted = files => {
        handleSendImage(files)
    };

    const CustomisedButton = ({ triggerInput }) => {

        return (
            <IconButton onClick={triggerInput}>
                <PhotoSizeSelectActualIcon />
            </IconButton>

        );
    };

    return (
        <>
            <div>


                <TextField
                    placeholder='Message....'
                    fullWidth
                    value={msg}
                    onKeyDown={handleKeypress}
                    onBlur={handleOnBlurEvent}

                    InputProps={{
                        endAdornment: <InputAdornment>
                            <ReactImageFileToBase64 onCompleted={handleOnCompleted} CustomisedButton={CustomisedButton} />
                            <  IconButton  sx={{display:{xs:'none',sm:'none',md:'flex',lg:'flex'}}} type='submit' onClick={handleEmojiPickerhideShow} >
                                <EmojiEmotionsIcon />
                            </IconButton>

                            
                            <IconButton type='submit' onClick={handleSendmsg} >
                                <SendIcon fontSize='large' />
                            </IconButton>

                        </InputAdornment>
                    }}

                    onChange={handleinputmsg}
                />

{showEmojiPicker && (<div style={{position:'absolute',top:'123px',right:'10px'}}>  <Picker  onEmojiClick={handleEmojiClick} /></div>)}



            </div>

        </>
    )
}


import React,{useState} from 'react';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';

import TextField from '@mui/material/TextField';
import { Button, FormControl, IconButton } from '@mui/material';
// import { SendMessage } from '../services';

// import io from 'socket.io-client'
// const socket = io.connect("http://localhost:9000")



export default function InputAdornments(props) {
const [msg, setmsg] = useState("")



const handleKeypress =(e)=>{

   if(e.keyCode===13)
   {
    handleSendMessage()
   }

}


const handlechangemsg =(e)=>{  
        setmsg(e.target.value)

        
         const userdata=JSON.parse(localStorage.getItem("userdata"))

        let data={
            roomId:userdata.roomId,
            userstatus:{
               
                name:userdata.name,
                typingstatus:true
            
            }
                
        }


        props.handleTyingStatus(data)
}

const handleOnBlurEvent =(e)=>{

    const userdata=JSON.parse(localStorage.getItem("userdata"))
    let data={
        roomId:userdata.roomId,
        userstatus:{
           
            name:userdata.name,
            typingstatus:false
        
        }
            
    }


    props.handleTyingStatus(data)
     

}

const handleSendMessage =()=>{ 


const userdata=JSON.parse(localStorage.getItem("userdata"))


    let data={
        roomId:userdata.roomId,
        msgdata:{
            msg:msg,
            name:userdata.name,
            time:Date.now()
        }
            
    }
    setmsg('')
    props.messagedata(data)


   
}



  return (

      <div>
 

        <TextField  
placeholder='Message....'  
fullWidth
value={msg}
onKeyDown={handleKeypress}
onBlur={handleOnBlurEvent}

InputProps={{
    endAdornment:<InputAdornment>
    <IconButton type='submit'   onClick={handleSendMessage}>
    <SendIcon fontSize='large' />       
    </IconButton>
    
    </InputAdornment>
}}

onChange={handlechangemsg}
/>

    


      </div>


  );
}

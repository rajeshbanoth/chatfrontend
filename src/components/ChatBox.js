import { Grid, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'

import InputBox from './InputBox'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:9000")


export default function ChatBox(props) {

    const [messagelist, setMessagelist] = useState([])


const handleTyingStatus =(data)=>{

}



    const handleinputmsg = (data) => {

        if (localStorage.getItem("msg") === null) {
            let array = []
            array.push(data)
            localStorage.setItem("msg", JSON.stringify(array))
            setMessagelist(JSON.parse(localStorage.getItem("msg")))
        }
        else {
            let array = []
            array = JSON.parse(localStorage.getItem("msg"))
            array.push(data)
            localStorage.setItem("msg", JSON.stringify(array))
            setMessagelist(JSON.parse(localStorage.getItem("msg")))

        }

        // console.log(data)
          socket.emit("sendmessage",{data})


        //    setMessagelist([...messagelist,data])



    }




    useEffect(() => {
        socket.on("recieve_message", (msgdata) => {
            const data=msgdata.data
            console.log(data,"new")
  
            if (localStorage.getItem("msg") === null) {
                console.log("if")
                let array = []
                array.push(data)
                localStorage.setItem("msg", JSON.stringify(array))
                setMessagelist(JSON.parse(localStorage.getItem("msg")))
            }
            else {
                console.log("else")
                let array = []
                array = JSON.parse(localStorage.getItem("msg"))
                array.push(data)
                localStorage.setItem("msg", JSON.stringify(array))
                setMessagelist(JSON.parse(localStorage.getItem("msg")))
    
            }

            socket.of('receive_message');
            

            // io.socket.removeAllListeners()

        })
    },[socket])



    return (
        <>


            <Grid position={"fixed"} sx={{ backgroundColor: 'gray', width: '100%', height: '50px', marginBottom: '10px' }}>
                adghs
            </Grid>


            <div style={{ overflowY: 'scroll', height: '90vh', paddingTop: '30px' }}>

                {messagelist.map((item, key) => (<>


                    {item.msgdata.name !== JSON.parse(localStorage.getItem("userdata")).name ? (

                        <div style={{ padding: '20px' ,display: 'flex',}}>
                            <div style={{
                                maxWidth: '75%',
                                backgroundColor: '#7e848f',
                                borderRadius: '10px',
                                padding: '10px'
                            }}>
                                <Typography >
                                    {item.msgdata.msg}
                                </Typography>
                                <span style={{ fontSize: '10px', float: 'right' }}>{item.msgdata.time}</span>
                            </div>
                        </div>
                    ) : (

                        <div style={{ padding: '20px', display: 'flex', flexDirection: 'row-reverse' }}>
                            <div style={{
                                float: 'right',
                                maxWidth: '75%',
                                backgroundColor: '#97c28c',
                                borderRadius: '10px',
                                padding: '10px'
                            }}>
                                <Typography >
                                    {item.msgdata.msg}
                                </Typography>
                                <span style={{ fontSize: '10px', float: 'right' }}>{item.msgdata.time}</span>
                            </div>
                        </div>
                    )}






                </>))}













            </div>
            <InputBox messagedata={handleinputmsg}  handleTyingStatus={handleTyingStatus} />
        </>
    )
}




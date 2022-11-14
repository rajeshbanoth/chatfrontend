import { Avatar, Button, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import axios from 'axios';
import { logoutRoute, REACT_APP_LOCALHOST_KEY } from '../utils/apiRoutes';

export default function CurrentUserAppBar(props) {
    const navigate = useNavigate()
    const [loggedinUser,setLoggedinUser]=useState(null)

    useEffect(() => {
        if(localStorage.getItem(REACT_APP_LOCALHOST_KEY))
        {
        console.log(loggedinUser)
           setLoggedinUser(JSON.parse(localStorage.getItem(REACT_APP_LOCALHOST_KEY)))
        }
        else{
            navigate('/')
            
        }
    }, [])

   
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

    return (
        <>


<nav class="navbar navbar-light" style={{backgroundColor:'#e3f2fd'}}>
  <a class="navbar-brand" href="#">
    <img style={{paddingRight:'10px'}} src={loggedinUser!==null ? `data:image/svg+xml;base64,${loggedinUser.avatarImage}`: ""} width="30" height="30" class="d-inline-block align-top" alt="" />
   {loggedinUser!==null &&  loggedinUser.username} 

  </a>
  <IconButton onClick={handleClick}>
  <PowerSettingsNewIcon />

  </IconButton>
</nav>



 
        </>
    )
}

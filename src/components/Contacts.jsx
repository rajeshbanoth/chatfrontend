import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ListItemButton } from '@mui/material';
import { REACT_APP_LOCALHOST_KEY } from '../utils/apiRoutes';

export default function  Contacts({contacts,changeChat,contactpageopen}) {

    const [currentUserName, setCurrentUserName] = React.useState(undefined);
    const [currentUserImage, setCurrentUserImage] = React.useState(undefined);
    const [currentSelected, setCurrentSelected] = React.useState(undefined);



    React.useEffect(() => {

async  function fetchdata()
{
    const data = await JSON.parse(
        localStorage.getItem(REACT_APP_LOCALHOST_KEY)
      );
      console.log(data)
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
}
fetchdata()




      }, []);


 const onSelectChat =(contact,index)=>{ 
    contactpageopen(false)
    setCurrentSelected(index);
    changeChat(contact);

 }

  return (

<>{currentUserImage && currentUserName && (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {contacts.map((contact,index)=>(<>

            <ListItemButton alignItems="flex-start"  onClick={()=>onSelectChat(contact,index)}>
        <ListItemAvatar>
          <Avatar  alt="profile" src={`data:image/svg+xml;base64,${contact.avatarImage}`} />
        </ListItemAvatar>
        <ListItemText
          primary={contact.username}
          secondary={"hai this message  which is sent"}
        />
      </ListItemButton>
      <Divider variant="inset" component="li" />
        </>))}
     


    </List>

)}

</>
    

  );
}


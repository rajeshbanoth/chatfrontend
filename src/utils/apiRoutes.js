 //export const host ="http://localhost:9000"
 export const host="https://gloomchatbackend.herokuapp.com"
 export const REACT_APP_LOCALHOST_KEY="chatapp"

export const RegisterRoute = `${host}/api/auth/register`
export const LoginRoute =`${host}/api/auth/login`
export const SetAvatarRoute =`${host}/api/auth/setavatar`
export const GetUsersList = `${host}/api/auth/allusers`


export const logoutRoute = `${host}/api/auth/logout`;

export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;

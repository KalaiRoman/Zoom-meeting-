import { ConfirmMeetingJoin, CreateMeeting, CreateUsers, Home, JoinMeeting, Login, PageNotFound } from "../pages/Pages";

export const AllRoutingPath=[
    {
        id:1,
        name:"Home",
        inactiveLogo:"",
        activeLogo:"",
        component:<Login/>,
        path:"/",
        exact:true
    },
    
    {
        id:5,
        name:"Confirm Meeting Join",
        inactiveLogo:"",
        activeLogo:"",
        component:<ConfirmMeetingJoin/>,
        path:"/confirm-meeting",
        exact:false
    },


    {
        id:2,
        name:"Join Meeting",
        inactiveLogo:"",
        activeLogo:"",
        component:<JoinMeeting/>,
        path:"/join",
        exact:false
    },
    {
        id:3,
        name:"Home",
        inactiveLogo:"",
        activeLogo:"",
        component:<Home/>,
        path:"/home",
        exact:false
    },
    {
        id:4,
        name:"Create Meeting",
        inactiveLogo:"",
        activeLogo:"",
        component:<CreateMeeting/>,
        path:"/create-meeting",
        exact:false
    },
    
    {
        id:6,
        name:"Create User",
        inactiveLogo:"",
        activeLogo:"",
        component:<CreateUsers/>,
        path:"/create-users",
        exact:false
    },
    {
        id:7,
        name:"Page Not Found",
        inactiveLogo:"",
        activeLogo:"",
        component:<PageNotFound/>,
        path:"*",
        exact:false
    }
]

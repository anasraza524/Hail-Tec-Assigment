import { Mail,DragHandle,
    Notifications, Pets, 
    ModeNight,Home,Article,
    AccountBox,Settings,Group,ShoppingCart,
    Person,Storefront,Logout,LocalMall
   } from "@mui/icons-material";
   import { GlobalContext } from '../Context/Context';
   import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
   import LogoutIcon from '@mui/icons-material/Logout';
   import {
   AppBar,
   Avatar,
   Badge,
   Box,
   InputBase,
   Menu,
   MenuItem,
   styled,
   Toolbar,
   Typography,Switch,
 Drawer,IconButton,Bag,
 Button,
 List,Tab,Tabs,
 ListItem,
 ListItemButton,
 Divider,ListItemIcon,ListItemText
 } from "@mui/material"

//
import './Nav.css'  
 import { Link } from "react-router-dom";

 import { useState,useContext } from "react";
 import * as React from 'react';
 import axios from 'axios';
 import { useEffect } from "react"


 const StyledToolbar = styled(Toolbar)({
   display: "flex",
   backgroundColor:"skyblue",
   justifyContent: "space-between",
   // [Toolbar.breakpoints.up("sm")]: {
   //     justifyContent: "center",
   //   },
 });

 const LinkPage = styled(Link)({
   textDecoration:'none',
   color:' white',
   
   
  });
 const TabPage = styled(Tab)({
  fontWeight:'bolder',
  fontSize:'16px',
  color:'#FFFFFF',
  
 });
 const Search = styled("div")(({ theme }) => ({
   backgroundColor: "white",
   padding: "0 12px",
   borderRadius: theme.shape.borderRadius,
   width: "15%",
 }));
 
 const Icons = styled(Box)(({ theme }) => ({
   display: "none",
   alignItems: "center",
   gap: "20px",
   [theme.breakpoints.up("sm")]: {
     display: "flex",
   },
 }));

 const UserBox = styled(Box)(({ theme }) => ({
   display: "flex",
   alignItems: "center",
   gap: "10px",
   [theme.breakpoints.up("sm")]: {
     display: "none",
   },
 }));
 




 const Nav = ({LogoutHandle}) => {
   const [open, setOpen] = useState(false);
   const [isOpen, setIsOpen] = React.useState(false)
   let { state, dispatch } = useContext(GlobalContext);
   const toggleDrawer = () => {
       // setIsOpen((prevState) => !prevState)
       setIsOpen(true)
   }
//    const [isOpen, setIsOpen] = React.useState(false)

const [loadProduct, setLoadProduct] = useState(false)


   return (
     <AppBar position="sticky" >

       <StyledToolbar sx={{backgroundColor:"#7ceaa4", color:"white"}}>
       <Box   sx={{display:{lg:'none',sm:'none'},
      backgroundColor:"#7ceaa4", color:"white"}} onClick={toggleDrawer}><DragHandle/></Box >
           <Drawer
           
               open={isOpen}
               onClose={()=>{
                   setIsOpen(false)
               }}
               direction='right'
               
           >
               <Box sx={{height:"100%", width:250,textAlign:'center',backgroundColor:"#7ceaa4", color:"white" }}
               >
               <List >
               {(state.user.isAdmin===false)?
                 <div>
                  <LinkPage
                  onClick={()=>{setIsOpen(false)}}
                 to="/">
         <ListItem sx={{ color:"white" }}
         disablePadding>
           <ListItemButton component="a" >
             <ListItemIcon>
               <Home /> 
             </ListItemIcon>
             <ListItemText primary="Home" />
           </ListItemButton>
         </ListItem></LinkPage>
         <LinkPage
                  onClick={()=>{setIsOpen(false)}}
                 to="/AddToProduct">
         <ListItem sx={{ color:"white" }}
         disablePadding>
           <ListItemButton component="a" >
             <ListItemIcon>
             <Article /> 
             </ListItemIcon>
             <ListItemText primary="Cart" />
           </ListItemButton>
         </ListItem></LinkPage>
         <LinkPage
                  onClick={()=>{setIsOpen(false)}}
                 to="/UserOrderDetail">
         <ListItem sx={{ color:"white" }}
         disablePadding>
           <ListItemButton component="a" >
             <ListItemIcon>
             <Article /> 
             </ListItemIcon>
             <ListItemText primary="Order Detail" />
           </ListItemButton>
         </ListItem></LinkPage>
                 </div>:null}
                
         {(state.user.isAdmin===true)?
         <div>
          <LinkPage
                  onClick={()=>{setIsOpen(false)}}
                 to="/">
         <ListItem sx={{ color:"white" }}
         disablePadding>
           <ListItemButton component="a" >
             <ListItemIcon>
               <Home /> 
             </ListItemIcon>
             <ListItemText primary="Home" />
           </ListItemButton>
         </ListItem></LinkPage>
         <LinkPage
          onClick={()=>{setIsOpen(false)}}
          to="/AddNewItem">
         <ListItem disablePadding>
           <ListItemButton component="a" >
             <ListItemIcon>
              <Article /> 
             </ListItemIcon>
             <ListItemText primary="Add item" />
           </ListItemButton>
         </ListItem></LinkPage>

     
         </div>
         :null
 }
          
         <Divider/>
         <ListItem onClick={()=>{
            LogoutHandle()
            setIsOpen(false)}} disablePadding>
           <ListItemButton component="a"  >
             <ListItemIcon>
                <Logout/>
             </ListItemIcon>
             <ListItemText primary="Logout" />
           </ListItemButton>
         </ListItem>
        
       </List></Box>
           </Drawer>

       <Box sx={{justifyContent:{xs:'center',sm: "left",lg:'left'},
   alignItems:{xs:"center"}
   }}>
       <LocalMall sx={{ display: { xs: "none", sm: "block",lg:'block' } }} /> 
         <Typography  variant="h6"
          sx={{ 
          display: { xs: "" } }}>
           Work on Line
         </Typography>
       </Box>

         <Box sx={{ fontWeight:'20px', display:{xs:'none',lg:'flex',sm:"flex"},alignItems:"flex-end" ,justifyContent:"flex-end"}}>
{(state.user.isAdmin===false)?
<div>
<LinkPage
className="hover-underline-animation"
 
   to="/" ><TabPage label="Home" /></LinkPage>
<LinkPage
className="hover-underline-animation"
 
   to="/AddToProduct" ><TabPage label="Cart" /></LinkPage>
   <LinkPage
className="hover-underline-animation"
 
   to="/UserOrderDetail" ><TabPage label="Order Detail" /></LinkPage>
</div>

:null}
{(state.user.isAdmin===true)?
<div>
<LinkPage
  className="hover-underline-animation"
   to="/" ><TabPage label="Home" /></LinkPage>
<LinkPage
  className="hover-underline-animation"
   to="/AddNewItem" ><TabPage label="Add Item" /></LinkPage>
  

 
</div>

  

   :
   null
 }






   </Box>

         <Icons>
           
         <LogoutIcon
          onClick={LogoutHandle}
          />
           {/* <Avatar
             sx={{ width: 30, height: 30 }}
            
             onClick={(e) => setOpen(true)}
           /> */}
         </Icons>
         <UserBox >
           <Avatar
             sx={{ width: 30, height: 30 }}
             src={state.user.profileImage
}
           />
           <Typography variant="span">
            {state.user.fullName
}</Typography>
         </UserBox> 
       </StyledToolbar>
         
     </AppBar>
   );
 };
 
 export default Nav;


 
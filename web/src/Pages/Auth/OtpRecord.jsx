
import OTPInput from "react18-input-otp";
import React from "react";

import  { useState,useContext,useEffect } from "react";
import Moment from 'react-moment'

import axios from "axios";
import moment from "moment";
import { GlobalContext } from '../../Context/Context';
import {Avatar,Button, Zoom} from '@mui/material';
import { useParams, useNavigate ,Link,  generatePath,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import {DialogContent,Dialog,DialogContentText,DialogTitle,DialogActions,CardMedia
,Typography,Box} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import "./OtpRecord.css";
import OtpImage from '../../assets/got-OTP.gif'
import Cookies from 'js-cookie'

const OtpRecord = () => {
  let { state, dispatch } = useContext(GlobalContext);
    const [OTP, setOTP] = useState("");
    const [open, setOpen] = React.useState(false);
    const [otp, setOtp] = useState("");
    const [minutes, setMinutes] = useState(3);
    const [seconds, setSeconds] = useState(0);
    // const history = useHistory();

    // const handleProceed = (e) => {
    // (generatePath("/products/:id", { OTP }));
    // };
    useEffect(() => {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
    
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setSeconds(59);
            setMinutes(minutes - 1);
          }
        }
      }, 1000);
    
      return () => {
        clearInterval(interval);
      };
    }, [seconds]);
    const DialogOpen = () => {
      setOpen(true);
      
      setTimeout(() => {
        console.log('you can see me after 1 seconds')
        DialogClose()
    }, 1500);
      
   
      
    }
    let { token2 } = useParams();
    let j = Cookies.get()
  // console.log(j)
    const DialogClose = () => {
      setOpen(false);
        navigate(`/ResetPassword/${OTP}`);
    };
  function  handleChange(OTP)  {
    setOTP(OTP);
  
  console.log(OTP)

  }
  // console.log(state.otpTimerRunOut)
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const notify = (error,errorNetwork,errorCheck) => toast.error((errorCheck !== 401)?
  error:errorNetwork
      
      , {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });;
  const navigate = useNavigate();
  const otpCode =async (e) => { 

try{ const res = await axios.post(`${state.baseUrl}/request_otp`, { 
  
  otp: OTP
 }, {
  withCredentials: true
});

// if (res) {
//   alert("Otp Submit");
// }
DialogOpen()
// if(res.status === 200) {
        
//   navigate("/ResetPassword");

// }}
}
catch(err){
  notify(err.response.data.message , err.message,
    err.response.status
    )
  setError(err.response.data.message)

// }}
console.log("OtpPassowrd Error",err)
}
   

 }

    
  return (
    <>
            <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
msTransition="zoom"
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

<Dialog

open={open}
onClose={DialogClose}
aria-labelledby="responsive-dialog-title"
>
 <DialogTitle dividers="true" >
 <Avatar sx={{ m: 1,p:4, bgcolor: 'skyblue' }}>
         SMIT
        </Avatar>
<Typography sx={{fontSize:{xs:"26px"},display:'flex',flexDirection:"column",alignItems:"center"}} variant='h4'>
  Work on Line
  {/* <CloseIcon onClick={DialogClose} sx={{m:1,float:"right"}} /> */}
</Typography>

</DialogTitle>
<DialogContent sx={{display:'flex',flexDirection:"column",alignItems:"center"}}  dividers="true">

<CardMedia
component="img"
loading="eager"
width="150"
sx={{height:{xs:100,sm:150,lg:200},mt:1}}
  image={OtpImage}
alt="No product Image"
/>

<Box sx={{m:{lg:2,sm:2,xs:1}}}>
<Typography sx={{fontSize:{xs:"30px",lg:'30px',sm:'30px'}}} variant='h3' gutterBottom>

OTP is verified 

</Typography>
<Typography sx={{fontSize:{xs:"16px"}}} variant='p' gutterBottom>

Now you can Change password
</Typography>
</Box>

</DialogContent>
<DialogActions>

</DialogActions>
</Dialog>
<div style={{display:"flex",flexDirection:"column"}} class="d-flex justify-content-center align-items-center container" >
<span style={{display:"flex",alignItems:"center"}}>
            <Avatar sx={{ m: 1,p:4, bgcolor: 'skyblue' }}>
          <LocalMallIcon style={{fontSize:"40px"}} />
        </Avatar>
        <Typography  variant="h6"
          sx={{ 
          display: { xs: "" },color:"white",fontSize:"60px",fontFamily:"sans-serif" }}>
           Work on Line
         </Typography></span>
  <div  >
     
  <div class="card py-5 px-3">
      <h5 class="m-0">Email verification</h5><span class="mobile-text">Enter the code we just sent on your Email 
      <br />

      <b class="text-danger">*****@.com</b></span>
      {/* <Timer style={{paddingLeft:"40%"}} min={1} />*/}
      <div className="countdown-text"> 
      {seconds > 0 || minutes > 0 ? (
        <h6>
          Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </h6>
      ) : (
        <h6>Didn't recieve code?</h6>
      )}

      {/* <button
        disabled={seconds > 0 || minutes > 0}
        style={{
          color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
        }}
        onClick={resendOTP}
      >
        Resend OTP
      </button> */}
    </div>
      <div class="d-flex flex-row mt-2">
      <OTPInput
          onChange={handleChange}
          value={OTP}
          inputStyle="inputStyle"
          numInputs={5}
        
          autoComplete="one-time-code"
           separator={<span></span>}
        />
       
      </div>
      <Button  sx={{mt:3}} variant="contained" onClick={otpCode}> Submit</Button>
      <div class="text-center mt-3">
        {/* <span class="d-block mobile-text">Don't receive the code?</span> */}
     <Link to="/ForgetPassword"> <span class="font-weight-bold text-danger cursor">Resend</span></Link>
      </div>
  </div>
</div></div></>
  )
}

export default OtpRecord ;
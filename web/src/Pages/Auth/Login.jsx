import * as React from 'react';
import { useState,useContext } from 'react';
import { GlobalContext } from '../../Context/Context';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import {Snackbar,Alert,Stack} from '@mui/material';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import ErrorIcon from '@mui/icons-material/Error';
import { ToastContainer, toast } from 'react-toastify';
import { padding } from '@mui/system';
function Copyright(props) {
  return (

    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <a href='https://github.com/anasraza524' target="_blank" >
        Muhammad Anas Raza
      </a>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  let { state, dispatch } = useContext(GlobalContext);
  const notify = (error,errorNetwork,errorCheck) => toast.error((error)?
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




  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('email'),
  //   });
  // };
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // const [openSnak, setOpenSnak] = useState(false);
  // const handleClickMsg = () => {
  //   setOpenSnak(true);
  // };

  // const handleCloseMsg = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpenSnak(false);
  // };
   const [result, setResult] = useState("");

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");


  const loginHandler = async (e) => {

      e.preventDefault();
      // if(error || success){
      //   handleClickMsg()
      // } 
      setSuccess('')
setError('')
 const data = new FormData(e.currentTarget);
      try {
          let response = await axios.post(`${state.baseUrl}/login`, {
              email: data.get('email'),
              password: data.get('password')
          }, {
              withCredentials: true
          })
          dispatch({
            type:"USER_LOGIN",
            payload: response.data.loginData


          })

          setSuccess(response.data.message)
          console.log("login successful",response);
          setResult("login successful")
       

      } catch (error) {
        console.log("LoginError: ",error);
        notify(error.response.data.message , error.message,
          error.response.status
          )
         setError(error.response.data.message)
      //  setError(error.message)
        
        
      }

      // e.reset();
  }

  return (
   
    <>
    <div>
        {/* <button onClick={notify}>Notify !</button> */}
        <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

      </div>
      {/* <Stack spacing={2} sx={{ width: '100%' }}>

<Snackbar open={openSnak} autoHideDuration={2000} onClose={handleCloseMsg}>
 {(error)?
 <Alert onClose={handleCloseMsg} severity="error" sx={{ width: '100%' }}>
    {error}
  </Alert>:
  <Alert severity="success">{success}</Alert>
  }

</Snackbar>
{/* <Alert severity="error">This is an error message!</Alert>
<Alert severity="warning">This is a warning message!</Alert>
<Alert severity="info">This is an information message!</Alert>
<Alert severity="success">This is a success message!</Alert>
</Stack> */}
<div
//  style={{backgroundColor:"whitesmoke",borderRadius:"50px",
// padding:'5px'
// }}
>
    <ThemeProvider  theme={theme}>
    
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
           <span style={{display:"flex",alignItems:"center"}}>

        <Typography  variant="h6"
          sx={{ 
          display: { xs: "" },color:"white",fontSize:"30px",fontFamily:"sans-serif" }}>
           Work on Line
         </Typography></span>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={loginHandler} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
            
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
{(!error)?"":<p style={{paddingLeft:"35px" ,color:"red", display:"flex"}}>
  <ErrorIcon/>
 <p style={{marginLeft:"10px"}}>{error}</p></p>}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/ForgetPassword" >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/SignUp">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      
      </Container>
    </ThemeProvider></div>
    <Copyright sx={{ mt: 8, mb: 4 }} /></>
   
  );
}
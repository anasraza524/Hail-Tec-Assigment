import * as React from 'react';
import { GlobalContext } from '../../Context/Context';
import { useReducer,useEffect,useState ,useContext} from 'react';

import {Snackbar,Alert,Stack} from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Avatar from '@mui/material/Avatar';
import {Button,DialogContent,Dialog,DialogContentText,DialogTitle,DialogActions,CardMedia} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { INITIAL_STATE,SIGN_STATE } from './CustomeState';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import Sucsess from '../../assets/Succes.gif'
import Error from '../../assets/error..gif'
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <a href='https://github.com/anasraza524' target="_blank" >
        Muhammad Anas Raza
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
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
  const [open, setOpen] = React.useState(false);
  const DialogOpen = () => {
    setOpen(true);
  };

  const DialogClose = () => {
    setOpen(false);
  };
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // const handleClickMsg = () => {
  //   setOpenSnak(true);
  // };

  // const handleCloseMsg = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpenSnak(false);
  // };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     firstName: data.get('firstName'),
  //    lastName: data.get('lastName'),
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };
  let { state, dispatch } = useContext(GlobalContext);
  const [result, setResult] = useState("");
  const [state1, dispatch1] = useReducer(SIGN_STATE, INITIAL_STATE);
  
  const handleChange = (e) => {
    dispatch1({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

const signUpHandle = async (e) => { 
  e.preventDefault();
  // if(error || success){
  //   handleClickMsg()
  // } 
console.log(state)
setSuccess('')
setError('')
try {
  let response = await axios.post(`${state.baseUrl}/signup`, {
      fullName: state1.fullName,
      age: state1.age,
      email: state1.email,
      password: state1.password
  },{withCredentials:true})
  setSuccess(response.data.message)
DialogOpen()
console.log(response);
  console.log("Signup successful");
  setResult(response.data.message)
e.target.reset()
} catch (error) {
  console.log("Sign Error: ", error);
  notify(error.response.data.message , error.message,
    error.response.status
    )
 
   setError(error.message)
  // DialogOpen()
 setError(error.response.data.message)
}

}

  return (
    <ThemeProvider theme={theme}>
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

    
     <Dialog

        open={open}
        onClose={DialogClose}
        aria-labelledby="responsive-dialog-title"
      >
         <DialogTitle dividers="true" >

        <Typography sx={{fontSize:{xs:"26px"},display:'flex',flexDirection:"column",alignItems:"center"}} variant='h4'>
          Work on Line
       
        </Typography>
     
      </DialogTitle>
      <DialogContent sx={{display:'flex',flexDirection:"column",alignItems:"center"}}  dividers="true">

{(!error)?
<CardMedia
    component="img"
    loading="eager"
    width="150"
      sx={{height:{xs:100,sm:200,lg:250},mt:1}}
    image={Sucsess}
    alt="No product Image"
  />
:
<CardMedia
    component="img"
    loading="eager"
    width="150"
      sx={{height:{xs:100,sm:150,lg:200}}}
    image={Error}
    alt="No product Image"
  />
}
<Box sx={{m:{lg:2,sm:2,xs:1}}}>
<Typography sx={{fontSize:{xs:"30px",lg:'30px',sm:'30px'}}} variant='h3' gutterBottom>
{(!error)?
"Signup successful"

:
"Signup Error"
}
</Typography>
<Typography sx={{fontSize:{xs:"16px"}}} variant='p' gutterBottom>
{(!error)?
"Thank for creating Emart Account"

:
"Oops Error in Signup"
}

</Typography>
</Box>

</DialogContent>
<DialogActions>
{(!error)?
 <Link 
 sx={{fontSize:"20px" , textDecoration:"none"}}
 to="/Login">
 <Button sx={{fontSize:"20px"}} autoFocus onClick={DialogClose}>
   Ok
 </Button>
 </Link>
:

<Button sx={{fontSize:"20px"}} autoFocus onClick={DialogClose}>
  Ok
</Button>

}

         
        </DialogActions>
      </Dialog>

      
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
           {/* <DialogBox
        DialogContentText={"Signup Succsefull"}
        DialogDec={"Thank for creating Emart Account "}
        
        /> */}
          <span style={{display:"flex",alignItems:"center"}}>
  
        <Typography  variant="h6"
          sx={{ 
          display: { xs: "" },color:"white",fontSize:"60px",fontFamily:"sans-serif" }}>
           Work on Line
         </Typography></span>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate
           onSubmit={signUpHandle} 
           sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="full-name"
                  name="fullName"
                  required
                  type="text"
                  onChange={handleChange}
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
             
              <Grid item xs={12}>
                <TextField
                  required
                   onChange={handleChange}
                  fullWidth
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  type="text"
                  fullWidth
                 
                   onChange={handleChange}
                  id="age"
                  label="Age"
                  name="age"
                  autoComplete="age"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  
                  fullWidth
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  type="password"
                  id="password"
                 
                  autoComplete="new-password"
                />
              </Grid>
              {/* {(!error)?"":<p style={{paddingLeft:"16px" ,color:"red"}}>{error}</p>} */}
        
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/"  >
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
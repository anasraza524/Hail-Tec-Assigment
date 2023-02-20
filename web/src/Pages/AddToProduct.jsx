import React from 'react'
import axios from 'axios';
import { useState, useEffect,useContext } from "react"
import {Snackbar,Alert} from '@mui/material';
import {
  Stack,Divider,Paper,Box,Button,Grid,CardMedia,Typography,TextField
} from '@mui/material'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


import { GlobalContext } from '../Context/Context';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));





const AddToProduct = ({}) => {
  let { state, dispatch } = useContext(GlobalContext);
  const [addtoCartData, setaddtoCartData] = useState([])
  const [loadProduct, setLoadProduct] = useState(false)
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openSnak, setOpenSnak] = useState(false);
 
  const  getAllCart =async () => {
    try {
      const response =
      await axios.get(`${state.baseUrl}/addtocarts`,{
       
        withCredentials: true,
        
   
    });
    console.log(response,"cart")
      
    setaddtoCartData(response.data.data)
   
    
      // setLoadProduct(!loadProduct)
      console.log(state.cartData,"Data")
    } catch (error) {
      console.log("Error In getting Cart",error)
    }
  
    // console.log("addtocart", response.data.data)
  //  setBageNo(response.data.data.length)
  
  }
// console.log(state.cartData,"state.cartData")
let total = 0

 useEffect(() => {

   

     getAllCart()
   
 }, []);
 addtoCartData.forEach(element => {
total += +element.price
});
console.log(total,"'df")
// console.log(addtoCartData.length)
const PlaceOrder = async (e) => {
  e.preventDefault();
  try {
    
    dispatch({
      type: "LOAD_SKELETON",
      payload: true
    })
  
    setSuccess('')
    setError('')
    const data = new FormData(e.currentTarget)
    let response = await axios.post(`${state.baseUrl}/placeOrder`, {
      FullName:data.get('FullName'),
      email:data.get('email'),
     
      status:"Pending",
      TotalAmount:total,
      totalItems:addtoCartData.length,
      number:data.get('number'),
      shippingAddress:data.get('shippingAddress')
     
    }, {
        withCredentials: true
    })
    // dispatch({
    //   type:"USER_LOGIN",
    //   payload: response.data.loginData


    // })

    // setSuccess(response.data.message)
    console.log("login successful",response);
   
    e.target.reset()

} catch (error) {
  console.log("LoginError: ",error);
  
   setError(error.response.data.message)
//  setError(error.message)
  
  
}
   }

  const deleteCartProduct = async (id) => {
    // if(error || success){
    //   handleClickMsg()
    // } 
    setSuccess('')
setError('')
    try {
      const response = await axios.delete(`${state.baseUrl}/addtocart/${id}`,{
         
        withCredentials: true,
        
     
    })
      console.log("response: ", response.data);
      setSuccess(response.data.message)
      // setLoadCart(!loadCart)

    } catch (error) {
      setError(error.message)
      console.log("error in getting all products", error);
    }
  }
  return (
    <div>
   
      
    
    



         <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
      <DialogTitle dividers="true" >
        <Typography sx={{fontSize:{xs:"28px"}}} variant='h4'>
          E-Mart
          <CloseIcon onClick={handleClose} sx={{m:1,float:"right"}} />
        </Typography>
     
      </DialogTitle>
        <DialogContent dividers>

          <Typography sx={{fontSize:{xs:"16px"}}} variant='h6' gutterBottom>
            There is no product in cart please add to cart first..... 
          </Typography>
          <Typography sx={{fontSize:{xs:"16px"}}} variant='h6'>
            Thank you...
          </Typography>
          <CardMedia
              component="img"
              width="150"
              loading="lazy"
                sx={{height:{xs:100,sm:200,lg:250},mt:1}}
              // image={shop}
              alt="No product Image"
            />
          {/* <ShoppingCartIcon sx={{fontSize:"120px", float:"center",color:"green",ml:15}}/> */}
        </DialogContent>
        <DialogActions>
          <Link 
          sx={{fontSize:"20px" , textDecoration:"none"}}
          to="/">
          <Button sx={{fontSize:"20px"}} autoFocus onClick={handleClose}>
            Ok
          </Button>
          </Link>
        </DialogActions>
      </BootstrapDialog>   
      
       
      <Grid sx={{m:{xs:1,sm:2,lg:3},mb:{xs:6,sm:5,lg:7}}} container item spacing={6}>
    {(!addtoCartData) ? null :
  addtoCartData?.map((eachProduct, index) => ( 
     <Paper
     
     key={index}
       elevation={4}
       sx={{ m:{xs:2,lg:2,sm:1},mb:"5px",  width: '100%', maxWidth:{ lg:300,xs:320,sm:300}, bgcolor: '#171723'
       ,borderRadius:"10px",color:"whitesmoke" }}>

      <Box sx={{ width: '100%', maxWidth:{ lg:300,xs:320,sm:300},
       bgcolor: '#171723',p:1,borderRadius:"10px",color:"whitesmoke"}}>
        
         
       <CancelIcon

onClick={() => {
  deleteCartProduct(eachProduct?._id)
}}
     
       sx={{m:1,float:"right"}}/>
          <CardMedia
           component="img"
           loading="lazy"
           width="200"
           height="200"
           // image='https://www.shutterstock.com/image-vector/sunscreen-product-banner-ads-on-260nw-1509241181.jpg'
            image={eachProduct?.productImage}
           alt="green iguana"
         />
         
         <Box sx={{ my: 1, mx: 2 }}>
           <Grid container alignItems="center">
             <Grid item xs>
               <Typography gutterBottom variant="h5" component="div">
                 {eachProduct?.name}
                 {/* sdsd */}
               </Typography>
             </Grid>
             <Grid item>
               <Typography gutterBottom variant="h6" component="div">
               Pkr :{eachProduct?.price}
                 {/* sdfsdf */}
               </Typography>
             </Grid>
           </Grid>
           <Typography sx={{ opacity: 0.5}} color="whitesmoke" variant="body2">
             {/* dsdsdsd */}
             {eachProduct?.description}
           </Typography>
           <Typography sx={{ opacity: 0.5}} color="whitesmoke" variant="body2">
             {/* dsdsdsd */}
             {eachProduct?.productType
}
           </Typography>
           
         </Box>
         <Divider variant="middle" />

         <Box sx={{
           display: "flex", justifyContent: "space-evenly",
           m: 1, p: 1
         }}>
           {/* <Button
           //  onClick={AddTheProduct}
           onClick={() => {
             getAProduct(eachProduct.id)
           }}
            color='success' variant='contained'>Add to cart</Button> */}
           {/* <Button fullWidth color='success' variant='contained'>Order Now</Button> */}
         </Box>
       </Box>

     </Paper>
           
           ))
         } 
    
     </Grid>
     <Divider variant="middle" />
     <Typography sx={{m:2,fontSize:{xs:30,sm:50,lg:50}}} >

Total Amount:{total}
</Typography>

     <Divider/><br />
     <form onSubmit={PlaceOrder} style={{textAlign:"center",padding:"1em"}}>
     <TextField

          sx={{ pl: 3, pr: 5, width: { lg: "400px", sm: "400px", xs: "370px" } }}
          size="medium"
          type="text" placeholder="Enter your Full Name" required
        id='FullName'
        name='FullName'
        ></TextField><br /><br />
        <TextField

sx={{ pl: 3, pr: 5, width: { lg: "400px", sm: "400px", xs: "370px" } }}
size="medium"
type="text" placeholder="Enter your Item Email" required
id='email'
        name='email'
></TextField><br /><br />
<TextField

          sx={{ pl: 3, pr: 5, width: { lg: "400px", sm: "400px", xs: "370px" } }}
          size="medium"
          type="text" placeholder="Enter your Item Number" required
          id='number'
          name='number'
        >
          </TextField>
          
          <br /><br />
        <TextField
          sx={{ pl: 3, pr: 5, width: { lg: "400px", sm: "400px", xs: "370px" } }}
         
          placeholder="Enter your Shipping Address"
          multiline
          rows={4}
          id='shippingAddress'
        name='shippingAddress'
        />

        <Button style={{marginTop:"15px"}} type="submit"  variant='contained' >Place Order</Button>
        </form>
     </div>
  )
}

export default AddToProduct;
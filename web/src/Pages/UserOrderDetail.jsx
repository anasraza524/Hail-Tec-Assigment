import React from 'react'
import axios from 'axios';
import { useState, useEffect,useContext } from "react"
import {Snackbar,Alert} from '@mui/material';
import {
  Stack,Divider,Paper,Box,Button,Grid,CardMedia,Typography,TextField
} from '@mui/material'
import { GlobalContext } from '../Context/Context';
const UserOrderDetail = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [eof, setEof] = useState(false)
  const [CurrentProduct, setCurrentProduct] = useState(null)
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
 const [homeProductData, setHomeProductData] = useState([])
const [loadProduct, setLoadProduct] = useState(false)
const [open, setOpen] = useState(false);
const [page, setPage] = useState(0)
const [CurrentPage, setCurrentPage] = useState(1)

  const getAllProducts = async () => {
    if (eof) return;
    dispatch({
      type:"LOAD_SKELETON",
      payload:true
    })
    try {
    
      const response = await axios.get(`${state.baseUrl}/placeOrders`,{
           
        withCredentials: true,
        
     
    });
  
   
    console.log("hjanas",response)
    // setPage(response.data)
    setHomeProductData(response.data.data)
   

      dispatch({
        type:"LOAD_SKELETON",
        payload:false
      })
    } catch (error) {
      dispatch({
        type:"LOAD_SKELETON",
        payload:false
      })
    //   if(error){
    //     ClickOpenError()
    //   }else{
    //   handleCloseError()
    //  }
     console.log(error,"error")

    }
  }
  useEffect(() => {
    getAllProducts()
  
  }, [loadProduct])

  return (
    <div>
        
        {(!homeProductData) ? null :


homeProductData?.map((eachProduct, index) => ( 



        <Box key={index}
         sx={{display:"flex",flexDirection:"column", width: '100%', maxWidth:{ lg:350,xs:300,sm:350},
    bgcolor: 'white',p:1,borderRadius:"10px",color:"black",m:"1em"}}>


      <Typography  gutterBottom variant="h5" component="div">
          
      {eachProduct.FullName}
            </Typography>
            <Typography style={{fontSize:"15px"}} gutterBottom variant="p" component="div">
          
            {eachProduct.status}
            </Typography>
            <Box sx={{display:'flex',justifyContent:"space-between"}}>
            <Typography sx={{ opacity: 0.5}} color="gray" variant="body2" gutterBottom  component="div">
         
            Total Items x {eachProduct.totalItems}
            </Typography>
            <Typography sx={{ opacity: 0.5}} color="gray" variant="body2" gutterBottom  component="div">
           { eachProduct.number}
              
            </Typography>
            </Box>
      

        
          
        <Box sx={{display:'flex',justifyContent:"space-between"}}>
            <Typography gutterBottom variant="h6" component="div">
          Total
              
            </Typography>
            <Typography  gutterBottom variant="h6" component="div">
         
              pkr:{eachProduct.TotalAmount}
            </Typography>

           
            </Box>
           <Divider/>

   
      </Box>
     
      
      
      ))}
    </div>
  )
}

export default UserOrderDetail
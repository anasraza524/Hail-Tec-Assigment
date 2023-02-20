import React,{useState,useEffect,useContext} from 'react'
import SlideShow from '../Components/SlideShow'
import axios from 'axios';
import {
  Typography, Card, CardContent,CircularProgress,
  TextField, Button, Paper, Chip, Box, Grid,
  CardActions, CardActionArea, Divider, CardMedia,Stack
} from '@mui/material'
import ProductCard from '../Components/ProductCard';


import { GlobalContext } from '../Context/Context';
const HomeUser = () => {
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
    
      const response = await axios.get(`${state.baseUrl}/productFeed?page=${CurrentPage}`,{
           
        withCredentials: true,
        
     
    });
  
   
    console.log("hjhjfffffff",response)
    setPage(response.data)
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

  const getAProduct = async (id) => {
    // if(error || success){
    //   handleClickMsg()
    // }
    setSuccess('')
setError('')
    try {
      const response = await axios.get(`${state.baseUrl}/product/${id}`,{
         
        withCredentials: true,
        
     
    })
//       console.log("responseCart: ", response);
// console.log("response2: ", response.data.data)
      setCurrentProduct(response.data.data)
      // console.log("CurrentProduct",CurrentProduct)
      let cart = {
        id:response.data.data._id,
        name:response.data.data.name,
        price:response.data.data.price,
        priceUnit:response.data.data.priceUnit,
        productType:response.data.data.productType,
        description:response.data.data.description,
        productImage:response.data.data.productImage,
       
      }
   

      
      addcart(cart)

      } 
      
      catch (error) {
      console.log("error cart in getting all products", error);
    }
  }


  const addcart = async (objectCart) => {
 
    setSuccess('')
setError('')
    try {
      const response = await
      axios.post(`${state.baseUrl}/addtocart`, objectCart,{
         
        withCredentials: true,

    });
  
  //  console.log("asds",response)
   setSuccess(response.data.message
    )
//    setLoadCart(!loadCart)
   

    } catch (error) {
      setError(error.response.data.message)
       console.log("error cart in getting all products", error);
    
    }
  }
  return (
    <div>
          <SlideShow/>
      <Divider/>
      <Typography sx={{m:2,fontSize:{xs:30,sm:50,lg:50}}} >

 All Products
</Typography>
<Divider/>
<Grid 
      sx={{display:{lg:"flex",sx:"flex",xs:"block"},flexWrap:"wrap",m:{xs:1,sm:3,lg:3},
      mb:{xs:6,sm:5,lg:3},ml:{xs:3,sm:0,lg:0}}}
    
   >
 {(!homeProductData) ? null :


homeProductData?.map((eachProduct, index) => ( 
      
<Box
key={index}
sx={{ width: '100%', maxWidth:{ lg:300,xs:300,sm:300},
    bgcolor: 'white',p:1,borderRadius:"10px",color:"green",m:"1em"}}>
     
      
      
      <CardMedia
        component="img"
        width="150"
        loading="lazy "
        height="180"
      image={eachProduct?.productImage
      }
     
        alt="green iguana"
      />
      <Box sx={{ my: 1, mx: 2 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h5" component="div">
          {eachProduct.name}
              
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h5" component="div">
              {eachProduct.priceUnit } : 
              {eachProduct.price}
            </Typography>
            
          </Grid>
        </Grid>
        <Typography sx={{ opacity: 0.5}} color="gray" variant="body2">
         {eachProduct.productType}
        </Typography>
        <Typography sx={{ opacity: 0.5}} color="gray" variant="body2">
         {eachProduct.description}
        </Typography>
        
      </Box>
      <Divider variant="middle" />

      <Box sx={{
        display: "flex", justifyContent: "space-evenly",
        m: 1, p: 1
      }}>
        {/* <Button
        onClick={()=>{
          handleClickOpen();
          setEditing({
            editingid:eachProduct._id,
            editingName:eachProduct.name,
            editingPrice:eachProduct.price
            ,editingDescription:eachProduct.description,
            editingProdImage:eachProduct.productImage,
        })
          }}
        
        color='success' variant='contained'>Edit</Button> */}
        <Button fullWidth
                //  onClick={AddTheProduct}
                onClick={() => {
                  getAProduct(eachProduct?._id)
                 
                }}
                 color='success' variant='contained'>Add to cart</Button>
        {/* <Button 

        color='error' variant='contained'>Delete</Button> */}
      </Box>
    </Box>
))}
</Grid>

    </div>
  )
}

export default HomeUser
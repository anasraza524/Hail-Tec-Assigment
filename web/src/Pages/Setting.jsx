

import {
  Typography, Card, CardContent,CircularProgress,
  TextField, Button, Paper, Chip, Box, Grid,
  CardActions, CardActionArea, Divider, CardMedia,Stack,MenuItem,Avatar

} from '@mui/material'
import { GlobalContext } from '../Context/Context';
import axios from 'axios';
import { useState, useEffect,useContext } from "react"
import OrderCard from '../Components/OrderCard'
const Setting = () => {
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
    
      const response = await axios.get(`${state.baseUrl}/placeOrderFeed?page=${CurrentPage}`,{
           
        withCredentials: true,
        
     
    });
  
   
    console.log("hjanas",response)
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
  return (
    <div>
      <Box>

<Typography sx={{m:2,fontSize:{xs:30,sm:50,lg:50}}}>
Order Detail
</Typography>


<Divider/>

{(!homeProductData) ? null :


homeProductData?.map((eachProduct, index) => ( 
<OrderCard
name={eachProduct.FullName}

status={eachProduct.status}
TotalAmount={eachProduct.TotalAmount
}
totalItems={eachProduct.totalItems
}
number={eachProduct.number}
id={eachProduct._id}

/>
))}

      </Box>


    </div>
  )
}

export default Setting
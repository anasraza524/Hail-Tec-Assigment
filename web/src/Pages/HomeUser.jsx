import React,{useState,useEffect,useContext} from 'react'

import axios from 'axios';
import {
  Typography, Card, CardContent,CircularProgress,
  TextField, Button, Paper, Chip, Box, Grid,
  CardActions, CardActionArea, Divider, CardMedia,Stack
} from '@mui/material'
import OrderCard from '../Components/OrderCard';


import { GlobalContext } from '../Context/Context';
const HomeUser = () => {
    let { state, dispatch } = useContext(GlobalContext);
    const [homeProductData, setHomeProductData] = useState([])

    const getAllTasks = async () => {

      try {
      
        const response = await axios.get(`${state.baseUrl}/tasks`,{
             
          withCredentials: true,
          
       
      });
    
     
      console.log("hjanas",response)
    
      setHomeProductData(response.data.data)
      // setLoadUser(!loadUser)
      } catch (error) {
  
       console.log(error,"error")
  
      }
    }
  
    useEffect(() => {

      getAllTasks()
    
    }, [])


  return (
  
         <div style={{marginTop:"10px",padding:"1em"}}>
<Typography variant="h4" sx={{ mb: 5 }}>
          Hi {state.user.fullName}, Welcome back
        </Typography>

<Divider sx={{color:"white"}}/>
<Typography variant="h4" sx={{ mb: 5 }}>
          All Tasks
        </Typography>

         {(!homeProductData)?null:
       
        homeProductData.map((eachTask,index) =>(
      <OrderCard
      key={index}
      id={eachTask?._id}
      title={eachTask?.title}
      description={eachTask?.description}
      status={eachTask?.status}
      dueDate={eachTask?.dueDate}
      isExpired={eachTask?.isExpired
      }

      />))}
<OrderCard/>

    </div>
  )
}

export default HomeUser
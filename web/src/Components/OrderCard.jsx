import React, { useState, useContext } from 'react'
import {
    Typography, Card, CardContent,CircularProgress,
    TextField, Button, Paper, Chip, Box, Grid,
    CardActions, CardActionArea, Divider, CardMedia,Stack
  } from '@mui/material'
  import {FormControl,MenuItem} from '@mui/material';
import Select from '@mui/material/Select';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import { GlobalContext } from '../Context/Context';
const OrderCard = ({ title,
  description,
  status,
  dueDate,id
}) => {
    const [age, setAge] = React.useState('');
console.log(age,id)

    let { state, dispatch } = useContext(GlobalContext);
    const [loadProduct, setLoadProduct] = useState(false)
 
 
    const  editProduct = async(e)=> { 
    
        
       
    
          try {
            const response = await axios.put(`${state.baseUrl}/placeOrder/${id}`,{
              status:age,
             
            },{withCredentials:true})
           

      
       
           
        
            setLoadProduct(!loadProduct)
      
          } catch (error) {
       
            console.log("error in Updating all products", error);
          }
        }
        const handleChange = (event) => {
            setAge(event.target.value);
           
          };
  return (
    <div style={{flex:"1 1 100px"}}>
<Box sx={{display:"flex",flexDirection:"column", width: '100%', maxWidth:{ lg:350,xs:300,sm:350},
    bgcolor: 'white',p:1,borderRadius:"10px",color:"black",m:"1em"}}>

    
      <Typography  gutterBottom variant="h5" component="div">
          {title}
              
            </Typography>
            <Box  sx={{display:'flex',justifyContent:"space-between",maxWidth:"10em"}}>
            <Typography sx={{ opacity: 0.5,maxWidth:"10em"}} color="gray" variant="body2" gutterBottom  component="div">
            {description}
              
            </Typography>

            </Box>
            <Box sx={{display:'flex',justifyContent:"space-between"}}>
            <Typography gutterBottom variant="h7" component="div">
            Status
              
            </Typography>
            <Typography  gutterBottom variant="h7" component="div">
          {status}
              
            </Typography>

           
            </Box>
         
      

        
          
        <Box sx={{display:'flex',justifyContent:"space-between"}}>
            <Typography gutterBottom variant="h7" component="div">
            Due Date
              
            </Typography>
            <Typography  gutterBottom variant="h7" component="div">
          {dueDate}
              
            </Typography>

           
            </Box>
           <Divider/>
            <Box sx={{ mt:2, minWidth: 120 }}>
      <FormControl   sx={{ pl: 3, pr: 5,width:{lg:"300px",sm:"300px",xs:"300px"} }}>
        <InputLabel
        sx={{ pl: 3, pr: 5,width:{lg:"200px",sm:"200px",xs:"200px"} }}
        id="demo-simple-select-label">{status}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
         
          onChange={handleChange}
        >
          <MenuItem value={"Complete"}>Complete</MenuItem>
          <MenuItem value={"pending"}>pending</MenuItem>
          <MenuItem value={"Expired"}>Expired</MenuItem>
        </Select>
      </FormControl>
      
    </Box>
    <Button sx={{mt:2}} onClick={editProduct} variant='contained'>Update</Button>
      </Box>
     

  
 

  
    </div>
  )
}

export default OrderCard
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link} from 'react-scroll'
const OrderCard = ({ title,
  description,
  status,
  dueDate,id,isExpired,setEditing,editing
}) => {
    const [age, setAge] = React.useState('');
// console.log(age,id)

    let { state, dispatch } = useContext(GlobalContext);
    const [loadProduct, setLoadProduct] = useState(false)
 
    const deleteTasks = async () => {

      try {
        const response = await axios.delete(`${state.baseUrl}/task/${id}`,{
           
          withCredentials: true,
          
       
      })
        console.log("response: ", response.data);
       
  
  
      } catch (error) {
      
        console.log("error in getting all tasks", error);
      }
    }
    
    const  editProduct = async(e)=> { 

          try {
            const response = await axios.put(`${state.baseUrl}/updateStatus/${id}`,{
              status:age,
             
            },{withCredentials:true})
           

      
       console.log(response)
           
        
            
      
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

{(state.user.isAdmin===false)?"":
<Box sx={{display:"flex",justifyContent:"right"}}>
<Link activeClass="active" to="test1" spy={true} smooth={true} offset={50} duration={500} >

      
<EditIcon onClick={()=>{

setEditing({
  editingId:id,
  editingTitle:title,
  editingDescription:description
  ,editingDueDate:dueDate,
 })


}} />  </Link>
<DeleteIcon onClick={deleteTasks}/>
</Box>
}

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
            <Typography color={(!isExpired)?"black":"red"} gutterBottom variant="h7" component="div">

            {(!isExpired)?"Due Date":"Expired"}
            </Typography>
            <Typography color={(!isExpired)?"black":"red"} gutterBottom variant="h7" component="div">
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
          disabled={(isExpired)?true:false}
          onChange={handleChange}
        >
          <MenuItem value={"Complete"}>Complete</MenuItem>
          <MenuItem value={"pending"}>pending</MenuItem>
          <MenuItem value={"Expired"}>Expired</MenuItem>
        </Select>
      </FormControl>
      
    </Box>
    <Button sx={{mt:2}} disabled={(isExpired)?true:false} onClick={editProduct} variant='contained'>Update</Button>
      </Box>
     

  
 

  
    </div>
  )
}

export default OrderCard
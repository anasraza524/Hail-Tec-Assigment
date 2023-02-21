import React, { useState, useContext,useEffect } from 'react'
import {
  Typography, Card, CardContent, CircularProgress,
  TextField, Button, Paper, Chip, Box, Grid,
  CardActions, CardActionArea, Divider, CardMedia, Stack,
} from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { GlobalContext } from '../Context/Context';
import { FormControl, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import axios from 'axios';
// import { AddPhotoAlternateIcon,ErrorIcon} from '@mui/icons-material'
import OrderCard from '../Components/OrderCard';
const AddNewItem = () => {
  const [age, setAge] = React.useState('');
  const [prodName, setProdName] = useState('')
  const [prodPrice, setProdPrice] = useState('');
  const [prodDec, setProdDec] = useState('')
  const [prodPriceUnit, setProdPriceUnit] = useState('')
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  let { state, dispatch } = useContext(GlobalContext);
  const handleChange = (event) => {
    setAge(event.target.value);
  };


  
  const submitHandler = async (e) => {
    e.preventDefault();
  try {
    const data = new FormData(e.currentTarget);
    console.log(data.get('title'),data.get('description'),data.get('dueDate'))
    let response = await axios.post(`${state.baseUrl}/tasks`, {
      title:data.get('title') ,
      description:data.get('description') ,
       dueDate:data.get('dueDate'),
    },{withCredentials:true})
    console.log(response)
    setLoadUser(!loadUser)
  e.target.reset()
  } catch (error) {
    console.log("Tasks Error: ", error);

  }
  };

  const [homeProductData, setHomeProductData] = useState([])
  const [loadUser, setLoadUser] = useState(false)
  
  const [page, setPage] = useState(0)
  const [CurrentPage, setCurrentPage] = useState(1)
  
  const [editing, setEditing] = useState({
    editingId:null,
    editingTitle:"",
    editingDescription:"",
    editingDueDate:"",

      })
  console.log(editing)
    const getAllUsers = async () => {
  
      try {
      
        const response = await axios.get(`${state.baseUrl}/taskFeed?page=${CurrentPage}`,{
             
          withCredentials: true,
          
       
      });
    
     
      console.log("hjanas",response)
      setPage(response.data)
      setHomeProductData(response.data.data)
      
      } catch (error) {
  
       console.log(error,"error")
  
      }
    }
  
    useEffect(() => {
      getAllUsers()
    
    }, [loadUser])

    const  editTasks = async(e)=> { 

      try {
        const response = await axios.put(`
        ${state.baseUrl}/task/${editing.editingId}`,{
          title:editing.editingTitle,
          description:editing.editingDescription,
          dueDate:editing.editingDueDate,

        },{withCredentials:true})
       

  
   
       console.log(response)
      setEditing( {
        editingId:null,
        editingTitle:"",
        editingDescription:"",
        editingDueDate:"",
    
          })
        
  
      } catch (error) {
   
        console.log("error in Updating all products", error);
      }
    }
  return (
    <div
    style={{marginBottom:"4em"}}
    id='test1'
   >
    {(!editing.editingDueDate && !editing.editingDescription
      && !editing.editingTitle && !editing.editingId
      )?
      <Paper elevation={5} sx={{display:"flex",
      minWidth: 120,
     flexDirection:"column",justifyContent:"center",
     alignItems:"center"}}>
           <form style={{ padding:"2em",margin: '5px',border:" 1px gray solid ",
           borderRadius:"2em"
           ,marginBottom: "3em",marginTop:"2em" }} onSubmit={submitHandler} >
     
     
     <Typography  variant="h4" sx={{ mb: 5 }}>
               Add Task
             </Typography>
     
             
             <br /><br />
             
             <TextField
     
     sx={{ pl: 3, pr: 5, width: { lg: "550px", sm: "550px", xs: "370px" } }}
     size="medium"
     type="text" placeholder="Enter your Item Title" required
     id='title' name='title'
     >
     </TextField><br /><br />
     
           
     
      
             <TextField
               sx={{ pl: 3, pr: 5, width: { lg: "550px", sm: "550px", xs: "370px" } }}
               id='description' name='description'
               placeholder="Enter your Item Description"
               multiline
               rows={4}
              
             />
             <Box sx={{ display: "flex", alignItems: "center" }}>
               <Typography
                 sx={{ ml: 1, p: 3 }}
               >
                 Due Date
               </Typography>
     
               <TextField
     id='dueDate' name='dueDate'
              
                 variant="filled"
                 size="small"
                 type="date"
                 
               />
             </Box>
             <Box sx={{ display: "flex", alignItems: "center" }}>
               
             </Box>
     
     
     
     
             <Button fullWidth  type="submit" variant="contained">Add Task </Button>
     
             {(!error) ? "" : <p style={{ paddingLeft: "35px", color: "red", display: "flex" }}>
               {/* <ErrorIcon/> */}
               <p style={{ marginLeft: "10px" }}>{error}</p></p>}
             {/* {(fileUpload && !storageURL === "")?
             <Button sx={{ml:10}} type="submit" variant="outlined">Add Product </Button>
           : 
           <Button disabled sx={{ml:10}} type="submit" variant="outlined">Add Product </Button>
           } */}
     
           </form>
           </Paper>

:
      <Paper
       elevation={5} sx={{display:"flex",
 minWidth: 120,
flexDirection:"column",justifyContent:"center",
alignItems:"center"}}>
      <form  style={{ padding:"2em",margin: '5px',border:" 1px gray solid ",
      borderRadius:"2em"
      ,marginBottom: "3em",marginTop:"2em" }} onSubmit={editTasks} >


<Typography variant="h4" sx={{ mb: 5 }}>
          update Task
        </Typography>

        
        <br /><br />
        
        <TextField

sx={{ pl: 3, pr: 5, width: { lg: "550px", sm: "550px", xs: "370px" } }}

placeholder="Enter your Item Title"

value={editing.editingTitle}
          onChange={(e) => {
            setEditing({
              ...editing,
              editingTitle: e.target.value
            })}}
/>
<br /><br />

      

 
        <TextField
          sx={{ pl: 3, pr: 5, width: { lg: "550px", sm: "550px", xs: "370px" } }}
       
          placeholder="Enter your Item Description"
          multiline
          rows={4}
          defaultValue={editing.editingDescription}
          onChange={(e) => {
            setEditing({
              ...editing,
              editingDescription: e.target.value
            })}}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{ ml: 1, p: 3 }}
          >
            Due Date
          </Typography>

          <TextField

            
            variant="filled"
            size="small"
            type="date"
            value={editing.editingDueDate}
            onChange={(e) => {
              setEditing({
                ...editing,
                editingDueDate: e.target.value
              })}}
            
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          
        </Box>




        <Button fullWidth  type="submit" variant="contained">Update Task </Button>

        {(!error) ? "" : <p style={{ paddingLeft: "35px", color: "red", display: "flex" }}>
          {/* <ErrorIcon/> */}
          <p style={{ marginLeft: "10px" }}>{error}</p></p>}
        {/* {(fileUpload && !storageURL === "")?
        <Button sx={{ml:10}} type="submit" variant="outlined">Add Product </Button>
      : 
      <Button disabled sx={{ml:10}} type="submit" variant="outlined">Add Product </Button>
      } */}

      </form>
      </Paper>}
      <Typography variant="h4" sx={{ m: 5 }}>
          All Tasks
        </Typography>
     
        <Grid
        
        container spacing={3} sx={{p:3,display:"flex",flexWrap:"wrap"}}>
   {(!homeProductData)?null:
       
       homeProductData.map((eachTask,index) =>(
      <OrderCard
      setEditing={setEditing}
      editing={editing}
      key={index}
      id={eachTask?._id}
      title={eachTask?.title}
      description={eachTask?.description}
      status={eachTask?.status}
      dueDate={eachTask?.dueDate}
   
      />
    
      
      ))}
 
</Grid>
    </div>
  )
}

export default AddNewItem
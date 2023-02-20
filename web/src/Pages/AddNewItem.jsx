import React, { useState, useContext } from 'react'
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
  let formData = new FormData();
  console.log(age, file, prodPriceUnit, prodDec, prodPrice, prodName)
  formData.append("productImage", file);
  formData.append("name", prodName);
  formData.append("price", prodPrice);
  formData.append("description", prodDec);
  formData.append("productType", age)
  formData.append("priceUnit", prodPriceUnit)

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch({
      type: "LOAD_SKELETON",
      payload: true
    })

    setSuccess('')
    setError('')

    axios({
      method: 'post',
      url: `${state.baseUrl}/product`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    })
      .then(res => {
        // setLoadProduct(!loadProduct)
        console.log(`upload Success` + res.data);
        setSuccess(res.message
        )
        dispatch({
          type: "LOAD_SKELETON",
          payload: false
        })
        e.target.reset()
        setFile(null)

        setPreview(null)
      })
      .catch(err => {
        dispatch({
          type: "LOAD_SKELETON",
          payload: false
        })

        console.log("error: ", err);
        setError(err.response.data.message)

      })
  };

  return (
    <div
   >
<Paper elevation={5} sx={{display:"flex",
 minWidth: 120,
flexDirection:"column",justifyContent:"center",
alignItems:"center"}}>
      <form style={{ padding:"2em",margin: '5px',border:" 1px gray solid ",
      borderRadius:"2em"
      ,marginBottom: "3em",marginTop:"2em" }} onSubmit={submitHandler} >



       
{/* <label htmlFor="select-image"><Box

sx={{
  display: "flex", justifyContent: "center",
  m: 3, pl: 3, pr: 5, width: { lg: "500px", sm: "500px", xs: "310px" }, backgroundColor: "gray"
  , borderRadius: "15px"
}}
>

{(preview) ?
  <img style={{ margin: "5px 0px 5px 22px " }} src={preview} height="255px" width="280px" alt="" srcset="" />

:
<CameraAltIcon sx={{ fontSize: "10em", m: 8 }} />
}
</Box></label> */}
<Typography variant="h4" sx={{ mb: 5 }}>
          Add Task
        </Typography>
        <TextField
        
          sx={{ pl: 5, pr: 5 }}
          size="small"
          type="file"
          id="select-image"

          name='select-image'
          onChange={(e) => {
            setFile(e.currentTarget.files[0])

            let url = URL.createObjectURL(e.currentTarget.files[0])

            console.log("url: ", url);

            setPreview(url)
          }}
          style={{ display: 'none' }}
        />

        
        <br /><br />
        
        <TextField

sx={{ pl: 3, pr: 5, width: { lg: "550px", sm: "550px", xs: "370px" } }}
size="medium"
type="text" placeholder="Enter your Item name" required
onChange={(e) => { setProdName(e.target.value) }}
>
</TextField><br /><br />

      

 
        <TextField
          sx={{ pl: 3, pr: 5, width: { lg: "550px", sm: "550px", xs: "370px" } }}
          id="outlined-multiline-static"
          placeholder="Enter your Item Description"
          multiline
          rows={4}
          onChange={(e) => { setProdDec(e.target.value) }}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{ ml: 1, p: 3 }}
          >
            Due Date
          </Typography>

          <TextField

            id="filled-size-small"
            defaultValue="pkr"
            variant="filled"
            size="small"
            type="date"
            onChange={(e) => { setProdPriceUnit(e.target.value) }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          
        </Box>




        <Button fullWidth  type="submit" variant="contained">Add Product </Button>

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

      <Typography variant="h4" sx={{ m: 5 }}>
          All Tasks
        </Typography>

        <Grid container spacing={3} sx={{p:3,display:"flex",flexWrap:"wrap"}}>

      <OrderCard
      title={"asdsd"}
      description={"asssssssssss dfdfdvvvvvvvvvvvvvvvvvvvvvvjjjjjjjjj jjjjjjjj jjj jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjvvvvvvvvvvvvvvvvf"}
      status={"pending"}
      dueDate={"12-1-23"}
      />
 
</Grid>
    </div>
  )
}

export default AddNewItem
import React,{useState,useContext,useEffect} from 'react'

import {
  Typography, Card, CardContent,CircularProgress,
  TextField, Button, Paper, Chip, Box, Grid,
  CardActions, CardActionArea, Divider, CardMedia,Stack,MenuItem,Avatar
} from '@mui/material'
import CategoriesCard from '../Components/CategoriesCard';
import FolderIcon from '@mui/icons-material/Folder';
import InputLabel from '@mui/material/InputLabel';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { GlobalContext } from '../Context/Context';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
const OrderPage = () => {
  let { state, dispatch } = useContext(GlobalContext);
  let formData = new FormData();
  let formData2 = new FormData();
  const [firstName, setFirstName] = useState('');
  const [categoryName, setCategoryName] = useState('')

  const [eof, setEof] = useState(false)

  const [homeCategoryData, setHomeCategoryData] = useState([])
 const [loadProduct, setLoadProduct] = useState(false)
 const [open, setOpen] = useState(false);
 const [page, setPage] = useState(0)
 const [CurrentPage, setCurrentPage] = useState(1)
  const [preview, setPreview] = useState(null)
  const [preview2, setPreview2] = useState(null)
  const [file, setFile] = useState(null)
  const [file2, setFile2] = useState(null)
      const [error, setError] = useState('');
      const [success, setSuccess] = useState('');
      formData.append("profileImage", file2);
      formData.append("firstName", firstName);
      formData2.append("CategoryImage", file);
      formData2.append("name", categoryName);
      const  editProduct = async(e)=> { 

        
       
        setSuccess('')
        setError('')
        axios({
          method: 'put',
          url: `${state.baseUrl}/updateProfile`,
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials:true
        })
          .then(res => {
              // setLoadProduct(!loadProduct)
              console.log(`upload Success` + res.data);
              setSuccess(res.message
                )
              dispatch({
                type:"LOAD_SKELETON",
                payload:false
              })
             
              setFile(null)
             
              setPreview(null)
          })
          .catch(err => {
            dispatch({
              type:"LOAD_SKELETON",
              payload:false
            })
            
              console.log("error: ", err);
              setError(err.response.data.message)
        
          })
          };
        
          const submitHandler = async (e) => {
            
            e.preventDefault();
            
            dispatch({
              type: "LOAD_SKELETON",
              payload: true
            })
            editProduct()
            setSuccess('')
            setError('')
        
            axios({
              method: 'post',
              url: `${state.baseUrl}/category`,
              data: formData2,
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
          const getAllCategory = async () => {
            if (eof) return;
            dispatch({
              type:"LOAD_SKELETON",
              payload:true
            })
            try {
            
              const response = await axios.get(`${state.baseUrl}/categoryFeed?page=${CurrentPage}`,{
                   
                withCredentials: true,
                
             
            });
          
           
            console.log("hjhj",response)
            setPage(response.data)
            setHomeCategoryData(response.data.data)
           
        
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
            getAllCategory()
          
          }, [loadProduct])
  return (
    <div
    >
      
      <Box sx={{display:'flex',flexDirection:"column",p:5,
      alignItems:{lg:"normal",sm:"normal",xs:"center"}}}>
        <form onSubmit={submitHandler
        }>
<Box sx={{display:'flex',flexDirection:"column",maxWidth:"40em",

}}>
  
 {  (preview2)?
<Avatar  sx={{ width:{lg:200,sm:200,xs:150},ml:{lg:0,sm:0,xs:"5em"}, height:{lg:200,sm:200,xs:150}}}>
        <img src={preview2} height="200px" width="200" alt="" srcset="" />
      </Avatar>:
     <label htmlFor="select-Profile"><Avatar  sx={{ width:{lg:200,sm:200,xs:150},ml:{lg:0,sm:0,xs:"5em"}, height:{lg:200,sm:200,xs:150}}}>
        <CameraAltIcon sx={{fontSize:"2em"}} />
      </Avatar></label>}
      <TextField 
                sx={{pl:5,pr:5}}
                 size="small"
                type="file"  
                id="select-Profile"

                name='select-Profile'
                onChange={(e) => {
                  setFile2(e.currentTarget.files[0])
                 
                  var url = URL.createObjectURL(e.currentTarget.files[0])

                  console.log("url: ", url);

                  setPreview2(url)
                }}
                 style={{ display: 'none' }}
                />
      <TextField 
                sx={{pl:5,pr:5}}
                 size="small"
                type="file"  
                id="select-image"

                name='select-image'
                onChange={(e) => {
                  setFile(e.currentTarget.files[0])
                 
                  var url = URL.createObjectURL(e.currentTarget.files[0])

                  console.log("url: ", url);

                  setPreview(url)
                }}
                 style={{ display: 'none' }}
                />
      <TextField 
      onChange={(e) => { setFirstName(e.target.value) }}
       id="standard-basic" label="Updated Full Name" variant="standard" />

      {  (preview)?
           <Box
  
           sx={{display:"flex",justifyContent:"center",
             m:2, pl: 3, pr: 5,width:{lg:"400px",sm:"400px",xs:"310px"},backgroundColor:"gray" 
         ,borderRadius:"15px"
         }}
           > <div  className='zoom'>

          
                <img  style={{margin:"5px 0px 5px 22px "}} src={preview} height="150px" width="280px" alt="" srcset="" />
                </div></Box>:<label htmlFor="select-image"><Box
  
  sx={{display:"flex",justifyContent:"center",
    m:3, pl: 3, pr: 5,width:{lg:"400px",sm:"400px",xs:"310px"},backgroundColor:"gray" 
,borderRadius:"15px"
}}
  >

<CameraAltIcon sx={{fontSize:"6em"}} />

  </Box></label>
              }

<TextField
onChange={(e)=>{setCategoryName(e.target.value)}}
id="filled-basic" label="new Category Name" variant="filled" />
<Button type='submit'>
Done

</Button>

</Box></form>
<Typography sx={{m:2,fontSize:{xs:30,sm:50,lg:50}}} >

 All Catagries
</Typography>

<Box >
{(!homeCategoryData) ? null :


homeCategoryData?.map((eachCategory, index) => ( 
      
<CategoriesCard
key={index}
name={eachCategory?.name}
image={eachCategory?.CategoryImage
}

/>))}
</Box>


      </Box></div>
  )
}

export default OrderPage
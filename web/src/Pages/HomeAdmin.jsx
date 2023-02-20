import React,{useState,useEffect,useContext} from 'react'
import {
  Typography, Card, CardContent,CircularProgress,
  TextField, Button, Paper, Chip, Box, Grid,
  CardActions, CardActionArea, Divider, CardMedia,Stack
} from '@mui/material'
import { GlobalContext } from '../Context/Context';
import { SlideLeft } from '../utils/motion';
import { motion } from "framer-motion";
import axios from 'axios';
import ProductCard from '../Components/ProductCard';
import AllCardDetail from '../Components/AllCardDetail';
import UserCard from '../Components/UserCard';
const HomeAdmin = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [eof, setEof] = useState(false)

 const [homeProductData, setHomeProductData] = useState([])
const [loadUser, setLoadUser] = useState(false)

const [page, setPage] = useState(0)
const [CurrentPage, setCurrentPage] = useState(1)



  const getAllUsers = async () => {

    try {
    
      const response = await axios.get(`${state.baseUrl}/userFeed?page=${CurrentPage}`,{
           
        withCredentials: true,
        
     
    });
  
   
    console.log("hjanas",response)
    setPage(response.data)
    setHomeProductData(response.data.data)
    // setLoadUser(!loadUser)
    } catch (error) {

     console.log(error,"error")

    }
  }

  useEffect(() => {
    getAllUsers()
  
  }, [loadUser])
  return (
    <div style={{marginTop:"10px",padding:"1em"}}>
<Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
<Grid container spacing={3} sx={{p:3,display:"flex",}}>
<Grid item xs={12}  sm={6} md={3} >
            <AllCardDetail title="Total User" total={homeProductData.length}  />
          </Grid>
          <Grid item xs={12}  sm={6} md={3} >
            <AllCardDetail title="Weekly Sales" total={714000}  />
          </Grid>
          <Grid item xs={12}  sm={6} md={3} >
            <AllCardDetail title="Weekly Sales" total={714000}  />
          </Grid>
          <Grid item xs={12}  sm={6} md={3} >
            <AllCardDetail title="Weekly Sales" total={714000}  />
          </Grid>
          </Grid>
<Divider sx={{color:"white"}}/>
<Typography variant="h4" sx={{ mb: 5 }}>
          All Users
        </Typography>
        <Paper evaltion={5}>
    <Box sx={{display:"flex" ,justifyContent:"space-between",
    alignItems:"center",p:1,m:2}}>
    <Typography sx={{fontWeight:"bold"}}>
    Name
    </Typography>
    <Typography sx={{fontWeight:"bold",display:{xs:"none",lg:"block",sm:"block"}}}>
        Email
    </Typography>
    <Typography sx={{fontWeight:"bold",display:{xs:"none",lg:"block",sm:"block"}}}>
        Age
    </Typography>
    <Typography sx={{fontWeight:"bold"}}>
Status
    </Typography>
    <Typography sx={{fontWeight:"bold"}}>
    Change Status
    </Typography>

    <Typography sx={{fontWeight:"bold"}}>
        Submit
    </Typography>
    </Box></Paper>
        {(!homeProductData)?null:
       
       homeProductData.map((eachUser,index) =>(
       <UserCard
       
       key={index}
       id={eachUser?._id}
name={eachUser?.fullName}
email={eachUser?.email}
age={eachUser?.age}
status={(eachUser?.isDeleted === false)? "Active": "Banned"}
color={eachUser?.isAdmin}

/>))
}

      {/* <Grid 
      sx={{display:{lg:"flex",sx:"flex",xs:"block"},flexWrap:"wrap",m:{xs:1,sm:3,lg:3},
      mb:{xs:6,sm:5,lg:3},ml:{xs:3,sm:0,lg:0}}}
    
   >
 {(!homeProductData) ? null :


homeProductData?.map((eachProduct, index) => ( 
      
<ProductCard
key={index}
image={eachProduct?.productImage}
price={eachProduct?.price}
des={eachProduct?.description}
productType={eachProduct?.productType}
name={eachProduct?.name}
priceUnit={eachProduct?.priceUnit}
id={eachProduct?._id}
/>

))}
</Grid> */}
    </div>
  )
}

export default HomeAdmin;
import React from 'react'
import {
    Typography, Card, CardContent,CircularProgress,
    TextField, Button, Paper, Chip, Box, Grid,
    CardActions, CardActionArea, Divider, CardMedia,Stack
  } from '@mui/material'
const CategoriesCard = ({image,name}) => {
  return (
    <div>
          <Box sx={{display:"flex",alignItems:"center", width: '100%', maxWidth:{ lg:400,xs:300,sm:400},
    bgcolor: 'white',p:1,borderRadius:"10px",color:"green",m:"1em"}}>
     
      
      
      <CardMedia
        component="img"
        width="50"
        loading="lazy "
        height="150"
      image={image}
     
        alt="green iguana"
      />
      <Box sx={{ my: 3, mx: 2 }}>
     
            <Typography gutterBottom variant="h5" component="div">
          {name}
              
            </Typography>
        
          
         
      
      </Box>
     

  
    </Box>





    </div>
  )
}

export default CategoriesCard
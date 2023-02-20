import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import {Stack, Box} from '@mui/material';
const ProductSkeleten = () => {
  return (
    <div> <Box sx={{display:"flex", justifyContent:"space-between",p:{xs:2,lg:5,sm:3}}}>  <Stack spacing={1}>
    {/* For variant="text", adjust the height via font-size */}
  
    {/* For other variants, adjust the size with `width` and `height` */}

    
    <Skeleton variant="rounded" width={320} height={200} />
    <Skeleton animation="wave" height={15} width={220 } style={{  marginBottom: 3,marginLeft:10, }} />
            <Skeleton animation="wave" height={15} width={280} style={{ marginLeft:10, }} />
  </Stack>
  
  <Stack spacing={1} sx={{display:{xs:"none",sm:"block",lg:"block"}}}>
    <Skeleton variant="rounded" width={300} height={200} />
    <Skeleton animation="wave" height={15} width={220 } style={{  marginBottom: 3,marginLeft:10, }} />
            <Skeleton animation="wave" height={15} width={280} style={{ marginLeft:10, }} />
  </Stack>
  <Stack spacing={1} sx={{display:{xs:"none",sm:"block",lg:"block"}}}>
    <Skeleton variant="rounded" width={300} height={200} />
    <Skeleton animation="wave" height={15} width={220 } style={{  marginBottom: 3,marginLeft:10, }} />
            <Skeleton animation="wave" height={15} width={280} style={{ marginLeft:10, }} />
  </Stack>
  <Stack spacing={1} sx={{display:{xs:"none",sm:"block",lg:"block"}}}>
    <Skeleton variant="rounded" width={300} height={200} />
    <Skeleton animation="wave" height={15} width={220 } style={{  marginBottom: 3,marginLeft:10, }} />
            <Skeleton animation="wave" height={15} width={280} style={{ marginLeft:10, }} />
  </Stack>
  </Box> </div>
  )
}

export default ProductSkeleten
import React from 'react'
import { Card, Typography,Box,Paper,MenuItem,FormControl,Divider
    ,Select,InputLabel,Button } from '@mui/material';
const UserCard = (
{name,age,email,status}
) => {
    const [userStatus, setUserStatus] = React.useState('');

  const handleChange = (event) => {
    setUserStatus(event.target.value);
  };
  return (<><Paper evaltion={5}>
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

    <Divider/>
    <Paper evaltion={5}>



        <Box sx={{display:"flex" ,justifyContent:"space-between",alignItems:"center",p:1}}>
<Typography>
{name}
</Typography>
<Typography sx={{display:{xs:"none",lg:"block",sm:"block"}}}>
    {email}
</Typography>
<Typography sx={{display:{xs:"none",lg:"block",sm:"block"}}}>
    {age}
</Typography>
<Typography>
    {status}
</Typography>

<FormControl sx={{ pl: 3, pr: 5, width: { lg: "180px", sm: "200px", xs: "130px" } }}>
            <InputLabel
            variant='filled'
              sx={{ pl: 3, pr: 5, width: { lg: "180px", sm: "200px", xs: "200px" } }}
             >{status}</InputLabel>
            <Select
              
         
              value={userStatus}
            
              onChange={handleChange}
            >
              <MenuItem defaultValue={"Active"} value={"Active"}>Active</MenuItem>
              <MenuItem value={"Banned"}>Banned</MenuItem>
            
            </Select>

          </FormControl>
          <Button variant="contained" >Change</Button>
        </Box>

    </Paper></>
  )
}

export default UserCard
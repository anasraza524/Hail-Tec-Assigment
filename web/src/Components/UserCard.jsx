import React,{useState,useContext} from 'react'
import '../App.css'
import { Card, Typography,Box,Paper,MenuItem,FormControl,Divider
    ,Select,InputLabel,Button } from '@mui/material';
    import axios from 'axios';

    import { GlobalContext } from '../Context/Context';
const UserCard = ({name,age,email,status,color,id}) => {
    const [userStatus, setUserStatus] = useState('');
console.log(userStatus,"userStatus",id)

    let { state, dispatch } = useContext(GlobalContext);
    const [loadUser, setLoadUser] = useState(false)
    const  editUser = async(e)=> { 
    
        
       
    
        try {
          const response = await axios.put(`${state.baseUrl}/user/${id}`,{
            isDeleted:userStatus
           
          },{withCredentials:true})
         
          
    console.log(response,)
     
         
      
          setLoadUser(!loadUser)
    setUserStatus('')
        } catch (error) {
     
          console.log("error in Updating all products", error);
        }
      }
  const handleChange = (event) => {
    setUserStatus(event.target.value);
  };
  return (<>

    <Divider/>
    <Paper evaltion={5} sx={{mb:1}}
    
    className={(color === true)?"blue":""}>



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
              <MenuItem  value={false}>Active</MenuItem>
              <MenuItem value={true}>Banned</MenuItem>
            
            </Select>

          </FormControl>
          <Button onClick={editUser} variant="contained" >Change</Button>
        </Box>

    </Paper></>
  )
}

export default UserCard
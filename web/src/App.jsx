import { Routes, Route ,Navigate,  useHistory,
  useParams} from "react-router-dom";
import './App.css';
import { useState, useEffect,useContext } from "react"
import HomeUser from "./Pages/HomeUser";
import Loading from './assets/Loading.gif'
import Nav from './Components/Nav';
import OtpRecord from "./Pages/Auth/OtpRecord";
import HomeAdmin from './Pages/HomeAdmin';
import axios from 'axios';
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import StickyFooter from "./Components/Footer";
import ProductCard from "./Components/ProductCard";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";
import { GlobalContext } from './Context/Context';
import AddNewItem from "./Pages/AddNewItem";

import { style } from "@mui/system";
import AddToProduct from "./Pages/AddToProduct";
import UserOrderDetail from "./Pages/UserOrderDetail";
function App() {
  let { state, dispatch } = useContext(GlobalContext);





 const  LogoutHandle = async()=>{
  try {
    let response = await axios({
      withCredentials:true,
      method: "POST",
      url: `${state.baseUrl}/logout`,
      headers: {
        "Content-Type": "application/json",
      }}
   
    )

    console.log("response: ", response);

    dispatch({
      type: 'USER_LOGOUT'
    })
  } catch (error) {
    console.log("axios error: ", error);
  }

  }
// remain login api call


const getProfile = async () => {
  try {
    // axios.defaults.withCredentials = true;
    let response = await axios.get(`${state.baseUrl}/profile`, {
      withCredentials: true,
      
    })

    console.log("responseApp: ", response);

    dispatch({
      type: 'USER_LOGIN',
      payload: response.data

    })
    
  } catch (error) {

    console.log("axios error: ", error);

    dispatch({
      type: 'USER_LOGOUT'
    })
  }



}
useEffect(() => {
    
 
  getProfile();

}, [state.isLogin])
console.log(state.isLogin)
  // Inercepter of withCredentials = true;
  
//   useEffect(() => {

//     // Add a request interceptor
//     axios.interceptors.request.use(function (config) {
//       // Do something before request is sent
//       config.withCredentials = true;
//       return config;
//     }, function (error) {
//       // Do something with request error
//       return Promise.reject(error);
//     });
// axios.interceptors.request.use(function(config){

// })
//     // Add a response interceptor
//     axios.interceptors.response.use(function (response) {
//       // Any status code that lie within the range of 2xx cause this function to trigger
//       // Do something with response data
//       return response;
//     }, function (error) {
//       // Any status codes that falls outside the range of 2xx cause this function to trigger
//       // Do something with response error
//       if (error.response.status === 401) {
//         dispatch({
//           type: 'USER_LOGOUT'
//         })
//       }
//       return Promise.reject(error);
//     });
//   }, [])



  return (
    <div  >

{/* <Custome/> */}
     {/* Auth State */}

   {/* <Curd /> */}
       {(state.isLogin === false)?
       <div >

 <Routes>
<Route path="/" element={<Login/>}/>
<Route path="SignUp" element={<SignUp/>}/>
<Route path="ForgetPassword" element={<ForgetPassword/>}/>
<Route path="OtpRecord" element={<OtpRecord/>}/>
<Route path="ResetPassword/:id" element={<ResetPassword/>}/> 
{/* <Route path="/user/reset/:id/:token" element={<ResetPassword/>}/> */}
 <Route path="*" element={<Navigate to="/" replace={true} />}/> 

</Routes>

</div> :null
} 

 {/* Main State */}
{(state.isLogin===true && state.user.isAdmin===false )?
<div>
<Nav LogoutHandle={LogoutHandle} /> 

 <Routes>

     <Route path="/" element={<HomeUser />}/>
     <Route path="AddToProduct" element={<AddToProduct/>} />
     <Route path="UserOrderDetail" element={<UserOrderDetail/>} />
     <Route path="*" element={<Navigate to="/" replace={true} />} />
     </Routes> 
     {/* <StickyFooter/> */}
     </div>:null}

 {/* Admin State */}

 {(state.user.isAdmin===true)?
<div>
<Nav LogoutHandle={LogoutHandle} /> 

 <Routes>

     <Route path="/" element={<HomeAdmin />}/>
     <Route path="AddNewItem" element={<AddNewItem />}/>
    

     <Route path="*" element={<Navigate to="/" replace={true} />} />
     </Routes> 
     {/* <StickyFooter/> */}
     </div>:null}


     {(state.isLogin === null) ?

<div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: '100vh' }}>
  <img width={300} src={Loading}
// 
  alt="" />
</div>

: ""}
    </div>
  );
}

export default App;

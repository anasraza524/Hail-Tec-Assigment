
export const reducer = (state, action) => {
    switch (action.type) {
  
      case "USER_LOGIN": {
        return { ...state, isLogin: true,user: action.payload }
      }
      case "USER_LOGOUT": {
        return { ...state, isLogin: false,user: {} } // set this to null on purpose, do not change
      }
  case "USER_OTP":{
   return {  ...state,
    current_Otp:action.payload}
  }
  case "IS_ADMIN": {
    return { ...state, isAdmin: true } 
  }
  case "BAGE_NO":{
    return {  ...state,
    bageNo:action.payload}
   }
   case "CART_DATA":{
    return {  ...state,
     cartData:action.payload}
   }
   case "LOAD_PRODUCT": {
    return { ...state, loadProduct: true } 
  }
  case "LOAD_PRODUCT_0": {
    return { ...state, loadProduct: false } 
  }
  case "OTP_TIME_RUN_OUT":{

    return{...state,otpTimerRunOut:action.payload}
  }
  case "LOAD_SKELETON":{

    return{...state,productSkeleton:action.payload}
  }
      
      case "TOGGLE_THEME": {
        return { ...state, darkTheme: !state.darkTheme } // set this to null on purpose, do not change
      }
  
  
  
      default: {
        return state
      }
    }
  }
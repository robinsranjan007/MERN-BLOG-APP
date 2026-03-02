import { createSlice } from "@reduxjs/toolkit"



const authSlice=createSlice({
name:"auth",
initialState:{
    user:null,
    isLoggedIn:false,
    loading:false,
    error:false
    

},
reducers:{

    setUser:(state,action)=>{
        state.user=action.payload,
        state.isLoggedIn=true
    },

    setIsLoggedIn:(state,action)=>{
        state.isLoggedIn=action.payload
    },

    setLoading:(state,action)=>{
state.loading=action.payload
    },
setLogout:(state)=>{
state.user=null,
state.isLoggedIn=false

},
    setError:(state,action)=>{
        state.error=action.payload
    }

}



})

export const { setUser, setIsLoggedIn, setLoading, setError,setLogout } = authSlice.actions
export default authSlice.reducer

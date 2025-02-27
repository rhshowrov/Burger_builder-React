import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../api/constant";

export const loginUser=createAsyncThunk('api/login',
    async({username,password},{rejectWithValue})=>{
        try{
            const res= await api.post('api/user/login/',{username,password})
            
            return res.data
        }catch(error){
            //no response means Network error
            if (!error.response) {
              return rejectWithValue("Network Error! Check Internet or Server Status.");
            }
      
            // If server responded with an error
            return rejectWithValue(error.response.data.error);
          }

        }
)
export const registerUser=createAsyncThunk('/api/signup/',
  async({username,email,password},{rejectWithValue})=>{
    try{

      const res= await api.post('/api/user/signup/',{username,email,password})
      console.log(res)
      return res.data
    }
    catch(error){
      console.log(error);
      if(!error.response){
        return rejectWithValue("Network Error! Check Internet or Server Status.");
      }
      return rejectWithValue(error.response.data)
    }
  }
)
const initialState={
    isAuthorized:false,
    token:null,
    authStatus:null,
    loading:false,
    color:null,
}
const authSlice =createSlice({
    name:'auth',
    initialState,
    reducers:{
      logout:(state)=>{
        localStorage.clear();
        state.authStatus='Logout Successful!'
        state.color='success'
        state.isAuthorized=false
      }

    },
    extraReducers:(builder)=>{
            builder
            .addCase(loginUser.fulfilled, (state, action) => {
              // Set tokens in localStorage when login is successful
              localStorage.setItem(ACCESS_TOKEN, action.payload.access);
              localStorage.setItem(REFRESH_TOKEN, action.payload.refresh);

              // Update Redux state
              state.token = action.payload.access;
              state.isAuthorized = true;
              state.loading = false;
              state.color = "success";
              state.authStatus = 'Login Successful! Redirecting...';
          }) 
              .addCase(loginUser.pending,(state)=>{
                state.loading=true;
              })
              .addCase(loginUser.rejected,(state,action)=>{
                state.loading=false;
                state.color="danger";
                state.authStatus=action.payload
              })
              .addCase(registerUser.fulfilled, (state) => {
                // Set tokens in localStorage when signup is successful
                localStorage.clear();
                state.loading = false;
                state.color = "success";
                state.authStatus = 'Signup Successful! please Login';
            }) 
                .addCase(registerUser.pending,(state)=>{
                  state.loading=true;
                })
                .addCase(registerUser.rejected,(state,action)=>{
                  console.log(action.payload)
                  state.loading=false;
                  state.color="danger";
                  state.authStatus=action.payload.error
                })
        },

});


export const authSliceAction=authSlice.actions
export default authSlice;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../api/constant";

export const loginUser=createAsyncThunk('api/login',
    async({username,password},{rejectWithValue})=>{
        try{
            const res= await api.post('api/user/login/',{username,password})
            localStorage.setItem(ACCESS_TOKEN,res.data.access)
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
            return res.data.access
        }catch(error){
            //no response means Network error
            if(error.res){
                return rejectWithValue("Network Error! Check Internet or Server Status.")
            }
            return rejectWithValue(error.res.data)

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

    },
    extraReducers:(builder)=>{
            builder
              .addCase(loginUser.fulfilled,(state,action)=>{
                state.token=action.payload;
                state.isAuthorized=true;
                state.loading=false;
                state.color="success";
                state.authStatus='Login Successfull!!'
              })
              .addCase(loginUser.pending,(state)=>{
                state.loading=true;
              })
              .addCase(loginUser.rejected,(state,action)=>{
                state.loading=false;
                state.color="danger";
                state.authStatus=action.payload
              })
        },

});


export const authSliceAction=authSlice.actions
export default authSlice;
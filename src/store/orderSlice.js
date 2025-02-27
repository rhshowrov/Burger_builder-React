import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../api/api";

export const createOrder=createAsyncThunk('api/create-order',
    async(orderObj,{rejectWithValue})=>{
        try{
            const res=await api.post('/api/order/save_order/',orderObj)         
            return res.data
        }
        catch(error){
            console.log("ERROR Catch",error);
            
            if(!error.response){
                return rejectWithValue("Cheack Internet or Server Status")
            }
            return rejectWithValue(error.response.data)
        }

    }
)
export const getMyOrder=createAsyncThunk("api/orderlist/",
    async(__,{rejectWithValue})=>{
        try{
            const res=await api.get('api/order/list/')
            return res.data.orders
        }
        catch(error){
            if(!error.response){
                return rejectWithValue("Cheack Internet or Server Status")
            }
            return rejectWithValue(error.response.data)
        }

    }
)

const BURGER_ORDER={
    loading:null,
    status:null,
    redirect:false,
    orders:[],
    order:{}
}


const orderSlice=createSlice({
    name:"order",
    initialState:BURGER_ORDER,
    reducers:{
        resetOrder:(state)=>{
            state.loading=false
            state.status=null
            state.redirect=false
        }
    },
    extraReducers:
        (builder)=>{
            builder
            .addCase(createOrder.fulfilled,(state,action)=>{
                state.loading=false
                state.status="Order Placed Successfully!"
                state.redirect=true
            })
            .addCase(createOrder.pending,(state,action)=>{
                state.loading=true
                state.status="Order Placing"
            })
            .addCase(createOrder.rejected,(state,action)=>{
                state.loading=false
                state.status="We could not placed your Order!"
            })
            builder
            .addCase(getMyOrder.fulfilled,(state,action)=>{
                state.orders=action.payload
                state.loading=false
                state.status="Order Retrive Successfully!"
            })
            .addCase(getMyOrder.pending,(state)=>{
                state.loading=true
                state.status="Order Retriving"
            })
            .addCase(getMyOrder.rejected,(state)=>{
                state.loading=false
                state.status="We could not get your Order!"
            })

        }
    }
)


export const orderSliceAction=orderSlice.actions;
export default orderSlice;
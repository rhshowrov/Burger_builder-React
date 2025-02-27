import { createSlice } from "@reduxjs/toolkit";

const BURGER={
    top:'images/top.png',
    salad:0,
    cheese:0,
    meat:0,
    bottom:'images/bottom.png',
}


const burgerSlice=createSlice({
    name:'burger',
    initialState:BURGER,
    reducers:{
        addIngredients:(state,action)=>{
            const ingredient=action.payload
            if (state[ingredient] != undefined) {
                state[ingredient]+=1
                console.log("value added:",{ingredient});
                
            }

        },
        removeIngredients:(state,action)=>{
            const ingredient=action.payload
            if (state[ingredient] != undefined){
                state[ingredient]-=1
            }

        },
        resetBurger:(state)=>{
            state.salad=0
            state.cheese=0
            state.meat=0
        }
    }
}

)

export const burgerSliceAction=burgerSlice.actions
export default burgerSlice;
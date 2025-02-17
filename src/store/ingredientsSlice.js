import { createSlice } from "@reduxjs/toolkit";
const INGREDIENTS=[
    { 
        id:1,
        name:'salad',
        price:10,
        pic:"images/salad.png"
    },
    {
        id:2,
        name:'cheese',
        price:40,
        pic:"images/cheese.png"
    },
    {   
        id:3,
        name:'meat',
        price:10,
        pic:"images/meat.png"
    },
    

]

const ingredientsSlice=createSlice({
    name:'ingredients',
    initialState:INGREDIENTS,
    reducers:{
        addIngredients:(state,action)=>{
            // state.push(action.payload)   ---mutate directly(not good practice)
            return [...state, action.payload]; // Returns a new array --best practice
        }
    }
})


export const ingredientsSliceAction=ingredientsSlice.actions
export default ingredientsSlice;
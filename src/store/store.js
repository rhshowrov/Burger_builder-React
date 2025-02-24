import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "./IngredientsSlice";
import burgerSlice from "./BurgerSlice";
import authSlice from "./authSlice";


//define BurgerBuilder store -----> configure the redux store 
const BurgerBuilderStore=configureStore({
    reducer:{
        ingredients:ingredientsSlice.reducer,
        burger:burgerSlice.reducer,
        auth:authSlice.reducer,
    }
})

export default BurgerBuilderStore;
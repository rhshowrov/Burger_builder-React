import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "./IngredientsSlice";
import burgerSlice from "./BurgerSlice";
import authSlice from "./authSlice";
import orderSlice from "./orderSlice";


//define BurgerBuilder store -----> configure the redux store 
const BurgerBuilderStore=configureStore({
    reducer:{
        ingredients:ingredientsSlice.reducer,
        burger:burgerSlice.reducer,
        auth:authSlice.reducer,
        order:orderSlice.reducer,
    }
})

export default BurgerBuilderStore;
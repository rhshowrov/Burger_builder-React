import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "./IngredientsSlice";
import burgerSlice from "./BurgerSlice";


//define BurgerBuilder store -----> configure the redux store 
const BurgerBuilderStore=configureStore({
    reducer:{
        ingredients:ingredientsSlice.reducer,
        burger:burgerSlice.reducer,
    }
})

export default BurgerBuilderStore;
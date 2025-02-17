import { useState } from "react";
import Burger from "./Burger";
import styles from "./BurgerBuilder.module.css";
import { useDispatch } from "react-redux";
import { burgerSliceAction } from "../../store/BurgerSlice";

const BurgerBuilder = () => {
  const dispatch=useDispatch()
  const inputOnchangeHandler = (e) => {
    const { name} = e.target;
    dispatch(burgerSliceAction.addIngredients(name))
  };
  return (
    <div className="d-flex flex-row justify-content-center mt-3">
      <Burger />
      <div className="d-flex  flex-column text-start fw-semibold  w-25 m-3 p-3 ">
        <h4 className="bg-warning p-2 text-center rounded-2">Add Ingredient</h4>
        <label htmlFor="input">Salad:</label>
        <input
          className="input form-control border-success "
          min="1"
          max="5"
          type="number"
          onChange={inputOnchangeHandler}
          placeholder="Number Of Slice:"
          name="salad"
          id="salad"
          defaultValue={0}
          onKeyDown={(e) => e.preventDefault()}
        />
        <label htmlFor="input">Cheese:</label>
        <input
          className="input form-control border-success"
          min="1"
          max="5"
          type="number"
          onChange={inputOnchangeHandler}
          placeholder="Number Of Slice:"
          name="cheese"
          id="cheese"
          defaultValue={0}
          onKeyDown={(e) => e.preventDefault()}
        />
        <label htmlFor="input">Meat:</label>
        <input
          className="input form-control border-success"
          min="1"
          max="5"
          type="number"
          onChange={inputOnchangeHandler}
          placeholder="Number Of Slice:"
          name="meat"
          id="meat"
          defaultValue={0}
          onKeyDown={(e) => e.preventDefault()}
        />
        <p className="w-full border border-danger text-black rounded-2 mt-3 p-2">
          Price :100 Tk
        </p>
      </div>
    </div>
  );
};
export default BurgerBuilder;

import { useState } from "react";
import Burger from "./Burger";
import styles from "./BurgerBuilder.module.css";
const BurgerBuilder = () => {
  const [ingredients, setIngredients] = useState({
    salad: 0,
    cheese: 0,
    meat: 0,
  });
  const inputOnchangeHandler = (e) => {
    const { name, value } = e.target;
    setIngredients((ingredients) => ({
      ...ingredients,
      [name]: Number(value),
    }));
  };

  return (
    <center className="mt-3">
      <Burger ingredients={ingredients} />
      <div className="d-flex  flex-column text-start fw-semibold  w-25 m-2 p-3 ">
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
          onKeyDown={(e) => e.preventDefault()}
        />
      </div>
    </center>
  );
};
export default BurgerBuilder;

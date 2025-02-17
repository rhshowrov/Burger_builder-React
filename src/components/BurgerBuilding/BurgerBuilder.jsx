import { useState } from "react";
import Burger from "./Burger";
import styles from "./BurgerBuilder.module.css";
const INGREDIENT_PRICE = {
  salad: 10,
  cheese: 30,
  meat: 40,
};
const BurgerBuilder = () => {
  const [ingredients, setIngredients] = useState({
    salad: 1,
    cheese: 1,
    meat: 1,
  });
  const [totalPrice, setTotalPrice] = useState(80);
  function TotalPrice(newIngredients) {
    const total =
      newIngredients.salad * INGREDIENT_PRICE.salad +
      newIngredients.cheese * INGREDIENT_PRICE.cheese +
      newIngredients.meat * INGREDIENT_PRICE.meat;
    setTotalPrice(total);
  }
  const inputOnchangeHandler = (e) => {
    const { name, value } = e.target;
    const newIngredients = {
      ...ingredients,
      [name]: Number(value),
    };

    setIngredients(newIngredients);
    TotalPrice(newIngredients); // ✅ Pass updated ingredients to calculate correct price
  };

  return (
    <div className="d-flex flex-row justify-content-center mt-3">
      <Burger ingredients={ingredients} />
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
          defaultValue={1}
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
          defaultValue={1}
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
          defaultValue={1}
          onKeyDown={(e) => e.preventDefault()}
        />
        <p className="w-full border border-danger text-black rounded-2 mt-3 p-2">
          Price : {totalPrice} Tk
        </p>
      </div>
    </div>
  );
};
export default BurgerBuilder;

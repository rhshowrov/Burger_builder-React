import Ingredients from "./Ingredients";
import styles from "./Burger.module.css";
import { useSelector } from "react-redux";
const Burger = () => {
  const burger = useSelector((store) => store.burger);
  const ingredients = useSelector((store) => store.ingredients);
  // Check if all ingredients have a count of 0
  const isEmpty =
    burger.salad === 0 && burger.cheese === 0 && burger.meat === 0;
  return (
    <div className={styles.ovflow}>
      <img src={burger.top} alt="bread" className="mt-4" />
      {/* If empty, show message. Otherwise, render ingredients */}
      {isEmpty ? (
        <p className="text-center text-danger fw-bold mt-2">Start adding ingredients!</p>
      ) : (
        <>
          <Ingredients path={ingredients[0].pic} count={burger.salad} />
          <Ingredients path={ingredients[1].pic} count={burger.cheese} />
          <Ingredients path={ingredients[2].pic} count={burger.meat} />
        </>
      )}
      <img src={burger.bottom} alt="bread" />
    </div>
  );
};
export default Burger;

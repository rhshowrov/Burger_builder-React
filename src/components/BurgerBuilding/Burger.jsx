import Ingredients from "./Ingredients";
import styles from './Burger.module.css'
const Burger=({ingredients})=>{
    return(
        <div>
            <img src="images/top.png" alt="bread" />
            <Ingredients type={'salad'} number={ingredients.salad} />
            <Ingredients type={'cheese'} number={ingredients.cheese} />
            <Ingredients type={'meat'} number={ingredients.meat} />
            <img src="images/bottom.png" alt="bread" />
            
        </div>
    )
}
export default Burger;
import styles from './Ingredients.module.css'
const Ingredients = ({ number, type }) => {
    return (
      <div>
        {Array.from({ length: number }, (_, index) => (
          <div key={index}>
            {type === 'salad' && <img src="images/salad.png" alt="Salad" />}
            {type === 'cheese' && <img src="images/cheese.png" alt="Cheese" />}
            {type === 'meat' && <img src="images/meat.png" alt="Meat" />}
          </div>
        ))}
      </div>
    );
  };
  
  export default Ingredients;
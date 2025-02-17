const Ingredients = ({ path, count }) => {
  return (
    <div>
      {/* Render images based on count */}
      {Array.from({ length: count }).map((_, index) => (
        <img
          className="d-flex mt-1 mb-1 flex-column"
          key={index}
          src={path}
          alt="Ingredient"
        />
      ))}
    </div>
  );
};

export default Ingredients;

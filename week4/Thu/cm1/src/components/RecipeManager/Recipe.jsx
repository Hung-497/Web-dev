const Recipe = ({ recipe, onDelete }) => {
  return (
    <li className="recipe-item">
        <div className="recipe-info">
            <span className="recipe-name">{recipe.name}</span>
            <span className="recipe-description">{recipe.description}</span>
            <span className="recipe-cuisine">{recipe.cuisine}</span>
            <span className="recipe-difficulty">{recipe.difficulty}</span>
            <span className="recipe-cookTime">{recipe.cookTime}</span>
            <span className="recipe-servings">{recipe.servings}</span>
            <span className="recipe-allergens">{recipe.allergens}</span>
            <span className="recipe-ingredients">{recipe.ingredients}</span>
        </div>
            <button onClick={onDelete} className="delete-button">Delete</button></li>
  );
}

export default Recipe;

import { useState } from "react"
import "./RecipeManager.css";
import Recipe from "./Recipe";

function RecipeManager() {
  const[recipes, setRecipes] = useState([])
  const[name, setName] = useState("")
  const[description, setDescription] = useState("")
  const[cuisine, setCuisine] = useState("")
  const[difficulty, setDifficulty] = useState("Easy")
  const[cookTime, setCookTime] = useState("")
  const[servings, setServings] = useState("")
  const[allergens, setAllergens] = useState("")
  const[ingredients, setIngredients] = useState("")

  function handleNameChange(event) {
    setName(event.target.value)
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value)
  }

  function handleCuisineChange(event) {
    setCuisine(event.target.value)
  }

  function handleDifficultyChange(event) {
    setDifficulty(event.target.value)
  } 

  function handleCookTimeChange(event) {
    setCookTime(event.target.value)
  }

  function handleServingsChange(event) {
    setServings(event.target.value)
  }

  function handleAllergensChange(event) {
    setAllergens(event.target.value)
  }

  function handleIngredientsChange(event) {
    setIngredients(event.target.value)
  }


  function addRecipe() {
    if(name.trim() !== "" && description.trim() !== "" && cuisine.trim() !== "" && difficulty.trim() !== "" && cookTime.trim() !== "" && servings.trim() !== "" && allergens.trim() !== "" && ingredients.trim() !== "") {
      setRecipes((r) => [...r, { name, description, cuisine, difficulty, cookTime, servings, allergens, ingredients }]);
      setName("")
      setDescription("")
      setCuisine("")
      setDifficulty("Easy")
      setCookTime("")
      setServings("")
      setAllergens("")
      setIngredients("")
    }
  }

  function deleteRecipe(index) {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
  }
  
  return (
    <div className="recipe-form">
      <h1>Recipe Manager</h1>

      <div>
        <input
          type="text"
          placeholder="Enter recipe name..."
          value={name}
          onChange={handleNameChange}
        />

        <textarea
          placeholder="Enter description..."
          value={description}
          onChange={handleDescriptionChange}
        />

        <input
          type="text"
          placeholder="Enter cuisine..."
          value={cuisine}
          onChange={handleCuisineChange}
        />

        <select
          value={difficulty}
          onChange={handleDifficultyChange}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <input
          type="number"
          placeholder="Enter cook time..."
          value={cookTime}
          onChange={handleCookTimeChange}
        />

        <input
          type="number"
          placeholder="Enter servings..."
          value={servings}
          onChange={handleServingsChange}
        />

        <input
          type="text"
          placeholder="Enter allergens..."
          value={allergens}
          onChange={handleAllergensChange}
        />

        <textarea
          placeholder="Enter ingredients..."
          value={ingredients}
          onChange={handleIngredientsChange}
        />

        <button onClick={addRecipe}>Add Recipe</button>
      </div>

       <ol className="recipe-list">
        {recipes.map((recipe, index) => (
          <Recipe key={index} recipe={recipe} onDelete={() => deleteRecipe(index)}
          />
        ))}
      </ol>
    </div>
  );
}
    

 
export default RecipeManager;

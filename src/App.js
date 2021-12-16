import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';

function RecipePart(props){
// Parts can be Ingredients or Instructions
  const partDivs = props.parts.map((part, p)=>{
    return (
      <li key={p} className={props.type}>{part}</li>
    )
  })
  return (
    <div className="recipePart" id={props.type}>
      <h2 className="recipePartTitle">{props.type}</h2>
      <ul className={props.type + "List"}>
        {partDivs}
      </ul>
    </div>
  )
}

function GetStarted(){
// Default div to display in recipe if no recipe selected
  return (
    <div className="getStarted">
      <h1>Select a Recipe</h1>
      <p>Get started by selecting a recipe!</p>
    </div>
  )
}

function AddRecipe(){
  return (
    <div className="recipeForm">
      <h1>Add a New Recipe</h1>
      <form className="inputRecipe">
        <div className="inputPartGroup" id="inputNameGroup">
          <label for="inputName">Name</label>
          <input id="inputName" />
        </div>
        <div className="inputPartGroup" id="inputIngredientsGroup">
          <label for="inputIngredients">Ingredients</label>
          <textarea className="inputArea" id="inputIngredients" />
        </div>
        <div className="inputPartGroup" id="inputInstructionsGroup">
          <label for="inputInstructions">Instructions</label>
          <textarea className="inputArea" id="inputInstructions" />
        </div>

        <input type="submit" text="Submit" />
      </form>
    </div>
  )
}

function Recipe(props){
// Recipe is composed of a name, ingredients, and instructions
  if (props.activeRecipeIndex===-1){
    return (
      <div className="recipe">
        <GetStarted />
      </div>
    )
  } else if (props.activeRecipeIndex===-2) {
    return (
      <AddRecipe />
    )
  } else {
    const activeRecipe = props.recipes[props.activeRecipeIndex]
    return (
      <div className="recipe">
        <div className="recipeName">
          <h1 className="recipeName">{activeRecipe.name}</h1>
        </div>
        <div className="recipeBody">
          <RecipePart 
            parts={activeRecipe.ingredients} 
            type="ingredients" 
          />
          <RecipePart 
            parts={activeRecipe.instructions} 
            type="instructions" 
          />
        </div>
      </div>
    )
  }
}


function RecipeListItem(props){
  return (
    <div 
      className={`listItem ${props.index===props.activeRecipeIndex ? "activeItem" : ""}`}
      key={props.index}
      onClick={()=>props.handleClick(props.index)}
    >
      {props.recipe.name}
    </div>
  )
}

function RecipeList(props){
  const listItems = props.recipes.map((recipe, r)=>{
    return <RecipeListItem 
      handleClick={props.handleClick}
      activeRecipeIndex={props.activeRecipeIndex}
      recipe={recipe}
      index={r}
      key={r}
    />
  })
  
  const addItem = <div 
    className="listItem"
    onClick={()=>props.handleClick(-2)}
    >
    Add New Recipe
  </div>

  return (
    <div className="recipeList" key={1}>
      {listItems}
      {addItem}
    </div>
  )
}

function App() {
  const [recipes, setRecipes] = useState([]);
  const [activeRecipeIndex, setActiveRecipeIndex] = useState(-1);

  // Functions
  function callAPI(){
    fetch("http://localhost:3003/recipes")
      .then(res => res.json())
      .then(data => setRecipes(data.recipes))
      .catch(err => err)
  }

  function handleClick(e){
    setActiveRecipeIndex(e)
  }

  function handleMouseover(e){
    console.log("Mousing", e)
  }

  // Effects
  useEffect(()=>{
    callAPI()
  },[])

  // Arrow Art
  // <a href="https://www.vecteezy.com/free-vector/hand-drawn-arrow">Hand Drawn Arrow Vectors by Vecteezy</a>

  return (
    <div className="App">
      <RecipeList
        recipes={recipes}
        activeRecipeIndex={activeRecipeIndex}
        setActiveRecipeIndex={setActiveRecipeIndex}
        handleClick={handleClick}
        handleMouseover={handleMouseover}
      />
      <Recipe 
        recipes={recipes}
        activeRecipeIndex={activeRecipeIndex}
      />
    </div>
  );
}

export default App;

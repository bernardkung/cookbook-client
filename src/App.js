import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
// import logo from './logo.svg';
import './App.css';
import editIcon from './images/icons8-edit-24.png'
import trashIcon from './images/icons8-trash-24.png'
// import searchIcon from './images/icons8-search-24.png'

function GetStarted(){
// Default div to display in recipe if no recipe selected
  return (
    <div className="getStarted">
      <h1>Select a Recipe</h1>
      <p>Get started by selecting a recipe!</p>
    </div>
  )
}

function RecipeForm(props){
  const [recipe, setRecipe] = useState({
    "name": "",
    "ingredients": "",
    "instructions": "",
  })

  function handleChange(event) {
    event.persist()
    setRecipe(recipe=>({
      ...recipe,
      [event.target.id]: DOMPurify.sanitize(event.target.value)
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const recipeJson = {recipe}
    props.addRecipe(recipeJson)
  }

  return (
    <div className="recipeForm">
      <h1>Add a New Recipe</h1>
      <form className="inputRecipe">
        <div className="inputPartGroup" id="inputNameGroup">
          <label htmlFor="name">Name</label>
          <input id="name" value={recipe.name} onChange={handleChange}/>
        </div>
        <div className="inputPartGroup" id="inputIngredientsGroup">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea 
            id="ingredients" 
            className="inputArea" 
            value={recipe.ingredients} 
            onChange={handleChange}
          />
        </div>
        <div className="inputPartGroup" id="inputInstructionsGroup">
          <label htmlFor="instructions">Instructions</label>
          <textarea 
            id="instructions" 
            className="inputArea" 
            value={recipe.instructions} 
            onChange={handleChange} 
          />
        </div>

        <input type="submit" text="Submit" onClick={handleSubmit}/>
      </form>
    </div>
  )
}

function RecipePart(props){
// Parts can be Ingredients or Instructions
  // Render the raw recipe part into Markdown
  const getMarkdownText = () => {
    const rawMarkup = marked(props.part);
    return { __html: rawMarkup };
  };

  return (
    <div className="recipePart" id={props.type}>
      <h2 className="recipePartTitle">{props.type}</h2>
      <div className={props.type} dangerouslySetInnerHTML={getMarkdownText()}></div>
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
      <RecipeForm addRecipe={props.addRecipe} />
    )
  } else {
    const activeRecipe = props.recipes[props.activeRecipeIndex]
    return (
      <div className="recipe">
        <div className="recipeTitle">
          <h1 className="recipeName">{activeRecipe.name}</h1>
          <div className="recipeActions">
            <img 
              id={props.activeRecipeIndex}
              src={editIcon} 
              onClick={props.handleEditRecipe}
            />
            <img 
              id={props.activeRecipeIndex}
              src={trashIcon} 
              onClick={props.handleDeleteRecipe}
            />
          </div>
        </div>
        <div className="recipeBody">
          <RecipePart 
            part={activeRecipe.ingredients} 
            type="ingredients" 
          />
          <RecipePart 
            part={activeRecipe.instructions} 
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
  // Ran into error here where props.recipes was undefined
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
  function getRecipes(){
    fetch("http://localhost:3003/recipes")
      .then(res => res.json())
      .then(data => setRecipes(data.recipes))
      .catch(err => err)
  }


  function addRecipe(recipeJson){
    console.log("Sending:", recipeJson)
    fetch("http://localhost:3003/recipes", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(recipeJson)
    })
      .then(res => {
        // This should be more robust at error handling
        if (res.status===406) {
          throw Error("Failed to save recipe!")
        } else if (res.status===400) {
          throw Error("Failed to refresh recipes!")
        }
        return res.json()
      })
      .then(data => {
        setRecipes(data.recipes)
      })
      .catch(error => {
        console.log("error")
        console.warn(error)
      })
  }

  function handleClick(e){
    setActiveRecipeIndex(e)
  }

  function handleMouseover(e){
    console.log("Mousing", e)
  }

  function handleEditRecipe(e){
    console.log("edit recipe")
    console.log(e.target)
  }

  function handleDeleteRecipe(e){
    console.log("Sending DELETE request", recipes[e.target.id].name, "to", 'http://localhost:3003/recipes/' + e.target.id)

    fetch('http://localhost:3003/recipes/' + e.target.id, { method: 'DELETE' })
        .then(res => {
          if (!res.ok) {
            throw Error("Response not okay!")
          }
          console.log("receiving", res.status)
          return res.text()
        })
        .then(data=>console.log(data))
        .catch((err)=>console.warn("not destroyed!", err))
  } 
  // Effects
  useEffect(()=>{
    getRecipes()
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
        addRecipe={addRecipe}
        handleEditRecipe={handleEditRecipe}
        handleDeleteRecipe={handleDeleteRecipe}
      />
    </div>
  );
}

export default App;

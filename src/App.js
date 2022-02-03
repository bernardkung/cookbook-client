import React, { useState, useEffect } from 'react';
// import DOMPurify from 'dompurify';
// import { marked } from 'marked';

// import logo from './logo.svg';
import './App.css';
import editIcon from './images/icons8-edit-24.png'
import trashIcon from './images/icons8-trash-24.png'
// import searchIcon from './images/icons8-search-24.png'

import RecipeList from "./Components/RecipeList"
import MainPage from "./Components/MainPage"
// import GetStarted from "./Components/GetStarted"
// import RecipeForm from "./Components/RecipeForm"
// import Recipe from "./Components/Recipe"

function App() {
  const [recipes, setRecipes] = useState([])
  const [activeRecipeIndex, setActiveRecipeIndex] = useState(-1)
  const [showForm, setShowForm] = useState(false)

  // Functions
  function refreshRecipes(data){
    // Keep only the recipe part of the recipes, removing filenames
    const recipes = data.recipes.filter(r=>r.name)
    setRecipes(recipes)
  }

  async function getRecipes(){
    fetch("http://localhost:3003/recipes")
      .then(res => {
        return res.json()
      })
      .then(data => {
        refreshRecipes(data)
      })
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
        console.log("1", res)
        // This should be more robust at error handling
        if (res.status===406) {
          throw Error("Failed to save recipe!")
        } else if (res.status===400) {
          throw Error("Failed to refresh recipes!")
        }
        console.log("res", res)
        return res.json()
      })
      .then(data => {
        refreshRecipes(data)
      })
      .catch(error => console.warn(error))
  }

  function updateRecipe(recipeJson, recipeId){
    console.log("Updating:", recipeId, recipeJson)
    fetch('http://localhost:3003/recipes/' + recipeId)
  }

  function handleClick(id, state=false){
    setActiveRecipeIndex(id)
    setShowForm(state)
  }

  function handleEditRecipe(e){
    console.log("Edit Recipe clicked")
    // Trigger the form to show
    setShowForm(true)
  }

  function handleDeleteRecipe(e){
    console.log("Sending DELETE request", recipes[e.target.id].name, "to", 'http://localhost:3003/recipes/' + e.target.id)

    fetch('http://localhost:3003/recipes/' + e.target.id, { method: 'DELETE' })
        .then(res => {
          if (!res.ok) {
            throw Error("Response not okay!")
          }
          return res.json()
        })
        .then(data=>refreshRecipes(data))
        .catch((err)=>console.warn("not destroyed!", err))
  }

  // Effects
  useEffect(async ()=>{

    fetch("http://localhost:3003/recipes")
    .then(res => {
      return res.json()
    })
    .then(data => {
      refreshRecipes(data)
      // const recipes = data.recipes.filter(r=>r.name)
      // setRecipes(recipes)
    })
    .catch(err => console.warn(err))

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
      />
      <MainPage 
        recipes={recipes}
        activeRecipeIndex={activeRecipeIndex}
        setActiveRecipeIndex={setActiveRecipeIndex}
        showForm={showForm}
        setShowForm={setShowForm}
        addRecipe={addRecipe}
        updateRecipe={updateRecipe}
        handleEditRecipe={handleEditRecipe}
        handleDeleteRecipe={handleDeleteRecipe}
      />
    </div>
  );
}

export default App;

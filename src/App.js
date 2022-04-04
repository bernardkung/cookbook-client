import React, { useState, useEffect } from 'react';

// import logo from './logo.svg';
import './App.css';
// import editIcon from './images/icons8-edit-24.png'
// import trashIcon from './images/icons8-trash-24.png'
// import searchIcon from './images/icons8-search-24.png'

import RecipeList from "./Components/RecipeList"
import MainPage from "./Components/MainPage"

function App() {
  const [recipes, setRecipes] = useState([])
  const [activeRecipeId, setActiveRecipeId] = useState(-1)
  const [showForm, setShowForm] = useState(false)

  // Functions
  function refreshRecipes(res){
    // This could be better at handling errors and unexpected recipes
    const recipes = res.data.filter(r=>r.name)
    console.log(recipes)
    setRecipes(recipes)
    setShowForm(false)
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
        refreshRecipes(data)
      })
      .catch(error => console.warn(error))
  }

  function updateRecipe(recipeJson){
    fetch('http://localhost:3003/recipes/' + recipeJson._id, {
      method: "PUT",
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
        refreshRecipes(data)
      })
      .catch(error => console.warn(error))
  }

  function handleClick(id, state=false){
    // When a recipeListItem/addRecipe is clicked\
    setActiveRecipeId(id)
    setShowForm(state)
  }

  function handleEditRecipe(e){
    // When edit button on a recipe is clicked
    setShowForm(true)
  }

  function handleDeleteRecipe(e){
    console.log(e.target)
    // Delete currently active recipe
    fetch('http://localhost:3003/recipes/' + activeRecipeId, { method: 'DELETE' })
        .then(res => {
          if (!res.ok) {
            throw Error("Response not okay!")
          }
          // Reset Main Page to Getting Started
          setActiveRecipeId(-1)
          setShowForm(false)

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
    .then(data => refreshRecipes(data))
    .catch(err => console.warn(err))

  },[])

  // Arrow Art
  // <a href="https://www.vecteezy.com/free-vector/hand-drawn-arrow">Hand Drawn Arrow Vectors by Vecteezy</a>

  return (
    <div className="App">
      <RecipeList
        recipes={recipes}
        activeRecipeId={activeRecipeId}
        setActiveRecipeId={setActiveRecipeId}
        handleClick={handleClick}
      />
      <MainPage 
        recipes={recipes}
        activeRecipeId={activeRecipeId}
        setActiveRecipeId={setActiveRecipeId}
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

import React from 'react'
import GetStarted from "../Components/GetStarted"
import RecipeForm from "../Components/RecipeForm"
import Recipe from "../Components/Recipe"

function MainPage(props){
  console.log("active recipe id:", props.activeRecipeId)
  // Recipe is composed of a name, ingredients, and instructions
    if (props.activeRecipeId===-1){
      if (!props.showForm){
        console.log("Get Started")
        return <GetStarted />
      } else {
        console.log("New Recipe")
        return <RecipeForm 
          activeRecipeId={props.activeRecipeId}
          setActiveRecipeId={props.setActiveRecipeId}
          addRecipe={props.addRecipe}
          updateRecipe={props.updateRecipe}
        />
      }
    } else {
      const activeRecipe = props.recipes.find(recipe=>recipe.id===props.activeRecipeId)
      console.log(activeRecipe)
      if (props.showForm){
        console.log("Edit Recipe")
        return <RecipeForm 
          recipe={activeRecipe}
          activeRecipeId={props.activeRecipeId}
          setActiveRecipeId={props.setActiveRecipeId}
          addRecipe={props.addRecipe}
          updateRecipe={props.updateRecipe}
        />
      } else {
        console.log("Display Recipe")
        return <Recipe 
          recipe={activeRecipe}
          activeRecipeId={props.activeRecipeId}
          handleDeleteRecipe={props.handleDeleteRecipe}
          handleEditRecipe={props.handleEditRecipe}
        />
      }
    }
  }

export default MainPage
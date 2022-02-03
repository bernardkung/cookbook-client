import React from 'react'
import GetStarted from "../Components/GetStarted"
import RecipeForm from "../Components/RecipeForm"
import Recipe from "../Components/Recipe"

function MainPage(props){
    console.log(props.activeRecipeIndex)
  // Recipe is composed of a name, ingredients, and instructions
    if (props.activeRecipeIndex===-1){
      if (!props.showForm){
        console.log("Get Started")
        return <GetStarted />
      } else {
        console.log("New Recipe")
        return <RecipeForm 
          activeRecipeIndex={props.activeRecipeIndex}
          setActiveRecipeIndex={props.setActiveRecipeIndex}
          addRecipe={props.addRecipe}
          updateRecipe={props.updateRecipe}
        />
      }
    } else {
      const activeRecipe = props.recipes[props.activeRecipeIndex]
      if (props.showForm){
        console.log("Edit Recipe")
        return <RecipeForm 
          recipe={activeRecipe}
          activeRecipeIndex={props.activeRecipeIndex}
          setActiveRecipeIndex={props.setActiveRecipeIndex}
          addRecipe={props.addRecipe}
          updateRecipe={props.updateRecipe}
        />
      } else {
        console.log("Display Recipe")
        return <Recipe 
          recipe={activeRecipe}
          activeRecipeIndex={props.activeRecipeIndex}
          handleDeleteRecipe={props.handleDeleteRecipe}
          handleEditRecipe={props.handleEditRecipe}
        />
      }
    }
  }

export default MainPage
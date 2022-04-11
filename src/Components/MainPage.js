import React from 'react'
import GetStarted from "../Components/GetStarted"
import RecipeForm from "../Components/RecipeForm"
import Recipe from "../Components/Recipe"

function MainPage(props){
  // Recipe is composed of a name, ingredients, and instructions
    if (props.activeRecipeId===-1){
      if (!props.showForm){
        return <GetStarted />
      } else {
        return <RecipeForm 
          recipes={props.recipes}
          activeRecipeId={props.activeRecipeId}
          setActiveRecipeId={props.setActiveRecipeId}
          addRecipe={props.addRecipe}
          updateRecipe={props.updateRecipe}
        />
      }
    } else {
      const activeRecipe = props.recipes.find(recipe=>recipe.id===props.activeRecipeId)
      if (props.showForm){
        return <RecipeForm
          recipes={props.recipes}
          activeRecipeId={props.activeRecipeId}
          setActiveRecipeId={props.setActiveRecipeId}
          addRecipe={props.addRecipe}
          updateRecipe={props.updateRecipe}
        />
      } else {
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
import React from 'react'
import RecipePart from "../Components/RecipePart"

import editIcon from '../images/icons8-edit-24.png'
import trashIcon from '../images/icons8-trash-24.png'

function Recipe(props){
  return (
    <div className="recipe">
      <div className="recipeTitle">
        <h1 className="recipeName">{props.recipe.name}</h1>
        <div className="recipeActions">
          <img 
            // id={props.activeRecipeId}
            src={editIcon} 
            onClick={props.handleEditRecipe}
          />
          <img 
            id={props.activeRecipeId}
            src={trashIcon} 
            onClick={props.handleDeleteRecipe}
          />
        </div>
      </div>
      <div className="recipeBody">
        <RecipePart 
          part={props.recipe.ingredients} 
          type="ingredients" 
        />
        <RecipePart 
          part={props.recipe.instructions} 
          type="instructions" 
        />
      </div>
    </div>
  )
}
  
export default Recipe
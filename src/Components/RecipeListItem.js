import React from 'react'

function RecipeListItem(props){
    return (
      <div 
        className={`listItem ${props.index===props.activeRecipeId ? "activeItem" : ""}`}
        key={props.recipe.id}
        onClick={()=>props.handleClick(props.recipe.id, false)}
      >
        {props.recipe.name}
      </div>
    )
  }

export default RecipeListItem
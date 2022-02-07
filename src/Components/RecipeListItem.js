import React from 'react'

function RecipeListItem(props){
    return (
      <div 
        className={`listItem ${props.index===props.activeRecipeId ? "activeItem" : ""}`}
        key={props.recipe._id}
        onClick={()=>props.handleClick(props.recipe._id, false)}
      >
        {props.recipe.name}
      </div>
    )
  }

export default RecipeListItem
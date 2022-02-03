import React from 'react'

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

export default RecipeListItem
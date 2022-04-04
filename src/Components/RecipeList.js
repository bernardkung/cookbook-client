
import React from 'react'
import RecipeListItem from "../Components/RecipeListItem"

function RecipeList(props){
  // Ran into error here where props.recipes was undefined
  const listItems = props.recipes.map((recipe, r)=>{
    return <RecipeListItem 
      handleClick={props.handleClick}
      activeRecipeId={props.activeRecipeId}
      recipe={recipe}
      index={recipe.id}
      key={recipe.id}
    />
  })
  const addItem = <div 
    className="listItem"
    onClick={()=>props.handleClick(-1, true)}
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
  
export default RecipeList
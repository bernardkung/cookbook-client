import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

function RecipeForm(props){
    const [recipe, setRecipe] = useState({
      "name": "",
      "ingredients": "",
      "instructions": "",
    })
  
    function handleChange(event) {
      event.persist()
      setRecipe(recipe=>({
        ...recipe,
        [event.target.id]: DOMPurify.sanitize(event.target.value)
      }))
    }
  
    function handleSubmit(event) {
      event.preventDefault()
      const recipeJson = {recipe}
      // check if this is an edit recipe, or add recipe
      if (props.recipe){
        props.updateRecipe(recipeJson)
      } else {
        props.addRecipe(recipeJson)
      }
    }
  
    function handleCancel(){
      setRecipe({
        "name": "",
        "ingredients": "",
        "instructions": "",
      })
      props.setShowForm(false)
    }
  
    // If coming from edit, then initialize the form with existing recipe
    useEffect(()=>{
      if ('recipe' in props){
        setRecipe(props.recipe)
      }
    }, [])
  
    return (
      <div className="recipeForm">
        <h1>Add a New Recipe</h1>
        <form className="inputRecipe">
          <div className="inputPartGroup" id="inputNameGroup">
            <label htmlFor="name">Name</label>
            <input id="name" value={recipe.name} onChange={handleChange}/>
          </div>
          <div className="inputPartGroup" id="inputIngredientsGroup">
            <label htmlFor="ingredients">Ingredients</label>
            <textarea 
              id="ingredients" 
              className="inputArea" 
              value={recipe.ingredients} 
              onChange={handleChange}
            />
          </div>
          <div className="inputPartGroup" id="inputInstructionsGroup">
            <label htmlFor="instructions">Instructions</label>
            <textarea 
              id="instructions" 
              className="inputArea" 
              value={recipe.instructions} 
              onChange={handleChange} 
            />
          </div>
  
          <div className="inputButtonGroup" id="inputButtonGroup">
            <button 
              id="cancelButton" 
              className="formButton" 
              onClick={handleCancel}
            >Cancel</button>
            <input 
              id="submitButton" 
              className="formButton" 
              type="submit" 
              text="Submit" 
              onClick={handleSubmit} 
            />
          </div>
        </form>
      </div>
    )
  }
  
export default RecipeForm
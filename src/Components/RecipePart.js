import React from 'react'
import ReactMarkdown from 'react-markdown'

function RecipePart(props){
  // Parts can be Ingredients or Instructions
    return (
      <div className="recipePart" id={ props.type }>
        <h2 className="recipePartTitle">{ props.type }</h2>
        <ReactMarkdown children={ props.part } />
      </div>
    )
  }

export default RecipePart
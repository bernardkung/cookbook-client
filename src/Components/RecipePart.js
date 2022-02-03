import React from 'react'
import { marked } from 'marked';

function RecipePart(props){
  // Parts can be Ingredients or Instructions
    // Render the raw recipe part into Markdown
    const getMarkdownText = () => {
      const rawMarkup = marked(props.part);
      return { __html: rawMarkup };
    };
  
    return (
      <div className="recipePart" id={props.type}>
        <h2 className="recipePartTitle">{props.type}</h2>
        <div className={props.type} dangerouslySetInnerHTML={getMarkdownText()}></div>
      </div>
    )
  }

export default RecipePart
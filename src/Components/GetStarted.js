import React, { useState, useEffect } from 'react';

function GetStarted(){
    // Default div to display in recipe if no recipe selected
      return (
        <div className="recipe">
          <div className="getStarted">
            <h1>Select a Recipe</h1>
            <p>Get started by selecting a recipe!</p>
          </div>
        </div>
      )
    }
    
export default GetStarted;
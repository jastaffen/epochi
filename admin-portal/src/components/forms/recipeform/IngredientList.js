import React from 'react';

const IngredientList = ({ ingredients, removeIngredient, setIngEdit }) => (
    <div className="ingredient-list">
        <h3>List of Ingredients</h3>
                { ingredients.length > 0 ? ingredients.map(ingredient => (

                    <div key={ingredient.name} >
                        <span>
                            {ingredient.measurement} 
                            {ingredient.unit} of 
                            { ingredient.name } 
                            { ingredient.additionalNotes }
                        </span>
                        <button onClick={() => setIngEdit(ingredient)}>Edit</button>
                        <button onClick={() => removeIngredient(ingredient)}>x</button>
                    </div>
                
                )) : 
                <>
                    <p>The list is currently empty. 
                        Add some ingredients in the form to the 
                        right of this box.
                    </p>
                </> }
    </div>
);

export default IngredientList;
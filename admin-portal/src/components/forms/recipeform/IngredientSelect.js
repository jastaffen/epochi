import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getAllIngredients } from '../../../actions/ingredients';

const IngredientSelect = ({ getAllIngredients, 
    ingredients: { loading, allIngredients }, ingredientId, setIngredient}) => {
    
    const [ searchText, setSearchText ] = useState('');
    
    useEffect(() => {
        if (allIngredients.length === 0) {
            getAllIngredients();
        }    
    }, [ loading, allIngredients.length, getAllIngredients ]);
    
    const renderIngredients = () => {
        let ingredientsToDisplay = [...allIngredients];

        if (searchText) {
            ingredientsToDisplay = ingredientsToDisplay.filter(ingredient => (
                ingredient.name.toLowerCase().includes(searchText.toLowerCase())
            ))
        }

        return ingredientsToDisplay.map(ingredient => {
            return (
                <div key={ingredient._id} onClick={() => setIngredient(ingredient._id)} 
                className={ingredient._id === ingredientId ? 
                'selected card' : 'card'} >
                    <span>{ ingredient.name }</span>
                </div>
            )
        })
    }

    return (
        <div className="radio-box-container">
            <h3>Choose an Ingredient to Showcase</h3>
            <input type="text" className="search" value={searchText}
                placeholder="Search ingredient..."
                onChange={e => setSearchText(e.target.value)} 
            />
            <div className="radio-box">
                { !loading && renderIngredients()}
            </div>
        </div>
    )

}

const msp = state => ({
    ingredients: state.ingredients
})

export default connect(msp, { getAllIngredients })(IngredientSelect);
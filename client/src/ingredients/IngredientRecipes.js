import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getRecipesByIngredient } from '../actions/recipes';

const IngredientRecipes = ({ getRecipesByIngredient, recipes, match }) => {
    
    useEffect(() => {
        getRecipesByIngredient(match.params.ingredientId)
    }, [getRecipesByIngredient, match, recipes])

    return( 
        <div className="item-container">
            {recipes && 
            recipes.map(recipe => (
                <div key={recipe._id} className="recipe-card">
                    <img className="circle-image" 
                        src={recipe.image} alt={recipe.title} 
                    />
                    <h3>{recipe.title}</h3>
                </div>
            ))}
        </div> 
    )
}

IngredientRecipes.propTypes = {
    getRecipesByIngredient: PropTypes.func.isRequired,
    recipes: PropTypes.array.isRequired
}

const msp = state => ({
    recipes: state.recipes.recipesByIngredient
})

export default connect(msp, { getRecipesByIngredient })(IngredientRecipes);
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getRecipeById } from '../actions/recipes';

const RecipeProfile = ({ getRecipeById, recipes: { loading, selectedRecipe }, match }) => {

    useEffect(() => {
        getRecipeById(match.params.recipeId)
    }, [getRecipeById, match]);


    const { title, _id, image, description, ingredients, instructions } = selectedRecipe;
    return(
        <>
            
            {!loading && selectedRecipe && 
                <div>
                    <h1>{title}</h1>
                    <img src={image} alt={title} width={400} height={200} />
                    <p>{description}</p>
                    <div>
                        <ul>
                            {ingredients.map(ingredient => (
                                <li key={ingredient._id}>{ingredient.name}</li>
                            ))}
                        </ul>
                    </div>
                    
                </div>
            }
        </>
    )
}

RecipeProfile.propTypes = {
    getRecipeById: PropTypes.func.isRequired,
    recipes: PropTypes.object.isRequired
}

const msp = state => ({
    recipes: state.recipes
})

export default connect(msp, { getRecipeById })(RecipeProfile);
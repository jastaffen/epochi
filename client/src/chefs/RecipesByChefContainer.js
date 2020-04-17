import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getChefsRecipes } from '../actions/recipes';

const RecipesByChefContainer = ({ getChefsRecipes, chefRecipes, id, name }) => {

    useEffect(() => {
        getChefsRecipes(id);
    }, [getChefsRecipes, id]);


    return(
        <div className="cr-container">
            <h1>{name}'s Recipes</h1>
            {chefRecipes && chefRecipes.map(recipe => (
                <Link to={`/recipes/${recipe._id}`} key={recipe._id} className="cr-card">
                    <img className="circle-image cr-links" 
                    src={recipe.image} alt={recipe.name} />
                </Link>
            ))}
        </div>
    )
}

RecipesByChefContainer.propTypes = {
    getChefsRecipes: PropTypes.func.isRequired,
    chefRecipes: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

const msp = state => ({
    chefRecipes: state.recipes.recipesByChef
})

export default connect(msp, { getChefsRecipes })(RecipesByChefContainer);
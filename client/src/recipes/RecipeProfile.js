import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import IngredientList from './IngredientList';
// import RecipeInstructions from './RecipeInstructions';

import { getRecipeById } from '../actions/recipes';

const RecipeProfile = ({ getRecipeById, recipes: { loading, selectedRecipe }, match }) => {

    useEffect(() => {
        getRecipeById(match.params.recipeId)
    }, [getRecipeById, match]);


    const { title, image, description, ingredients, instructions, chef, ingredient } = selectedRecipe;
    return(
        <>
            
            {!loading && selectedRecipe && 
                <div>
                    <h1>{title}</h1>
                    { chef &&
                    <Link to={`/chefs/${chef._id}`}>
                        <h5 id="rp-chef-link">by {chef.name}</h5>
                    </Link>
                    }
                    
                    <img src={image} alt={title} width={400} height={200} />
                    <p>{description}</p>
                    <div>
                        {ingredients && ingredient && 
                            <IngredientList ingredients={ingredients} 
                                ingredient={ingredient} 
                            /> 
                        }
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
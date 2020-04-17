import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import IngredientList from './IngredientList';
import InstructionList from './InstructionList';

import { getRecipeById } from '../actions/recipes';

const RecipeProfile = ({ getRecipeById, recipes: { loading, selectedRecipe }, match }) => {

    useEffect(() => {
        getRecipeById(match.params.recipeId)
    }, [getRecipeById, match]);


    const { title, image, description, ingredients, instructions, chef, ingredient } = selectedRecipe;
    return(
        <>
            
            {!loading && selectedRecipe && 
                <div className="recipe-profile">
                    <h1 className="title">{title}</h1>
                    { chef &&
                    <Link to={`/chefs/${chef._id}`}>
                        <h5 className="title" id="rp-chef-link">by {chef.name}</h5>
                    </Link>
                    }
                    <div className="recipe-info">

                        <div className="recipe-desc">
                            <img src={image} alt={title} />
                            <p><span>Description</span>{description}</p>
                        </div>

                        <div className="recipe-ings-inst">
                            {ingredients && ingredient && 
                            <>
                                <IngredientList ingredients={ingredients} /> 
                                <InstructionList instructions={instructions} />
                            </>
                            }
                        </div>

                        
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
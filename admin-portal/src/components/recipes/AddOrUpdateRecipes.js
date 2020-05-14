import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import GoBack from '../functional/GoBack';
import AllRecipes from './AllRecipes';
import RecipeForm from '../forms/recipeform/RecipeForm';

const AddOrUpdateRecipes = ({ history }) => {
    const [ showAddForm, setShowAddForm ] = useState(false);

    return (
        <div className="item-container" >
            <GoBack history={history} itemType="recipe" />
            <AllRecipes />

            {!showAddForm ? 
                <button className="button" 
                    onClick={() => setShowAddForm(true)}>
                        Add A New Recipe
                </button> 
            : 
            <RecipeForm from='add' />
            }
        </div>
    )
}

export default withRouter(AddOrUpdateRecipes);
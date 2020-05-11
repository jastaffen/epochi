import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import GoBack from '../functional/GoBack';
import AllIngredients from './AllIngredients';
import IngredientForm from '../forms/ingredientform/IngredientForm';

const AddOrUpdateIngredient = ( { history } ) => {
    const [ showAddForm, setShowAddForm ] = useState(false);

    return (
        <div className="item-container" >
            <GoBack history={history} itemType="ingredient" />
            <AllIngredients />

            {!showAddForm ? 
                <button className="button" 
                    onClick={() => setShowAddForm(true)}>
                        Add A New Ingredient
                </button> 
            : <IngredientForm from="add" /> 
            }
        </div>
    )
}

export default withRouter(AddOrUpdateIngredient);
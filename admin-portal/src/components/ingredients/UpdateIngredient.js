import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import GoBack from '../functional/GoBack';
import  IngredientForm from '../forms/ingredientform/IngredientForm';

const UpdateIngredient = ({ ingredients: { loading, selectedIngredient }, history })  => {
    return (
        !loading &&
        <>
            <GoBack history={history} itemType="ingredient" />
            <IngredientForm from="update"  selectedIngredient={selectedIngredient} />
        </>
        
    )
}

const msp = state => ({
    ingredients: state.ingredients
})

export default connect(msp)( withRouter(UpdateIngredient) );
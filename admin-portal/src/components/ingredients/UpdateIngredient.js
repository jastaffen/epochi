import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import GoBack from '../functional/GoBack';
import AllIngredients from '../ingredients/AllIngredients';
import  IngredientForm from '../forms/ingredientform/IngredientForm';

const UpdateIngredient = ({ ingredients: { loading, selectedIngredient }, history })  => {
    return (
        !loading &&
        <>
            <GoBack history={history} itemType="ingredient" />
            <AllIngredients />
            <h1 style={{ textAlign: 'center' }}>Update {selectedIngredient.name}</h1>
            <IngredientForm from="update"  selectedIngredient={selectedIngredient} />
        </>
        
    )
}

const msp = state => ({
    ingredients: state.ingredients
})

export default connect(msp)( withRouter(UpdateIngredient) );
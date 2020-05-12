import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getAllIngredients } from '../../actions/ingredients';

import AllItems from '../AllItems';

const AllIngredients = ({ getAllIngredients, ingredients: { loading, allIngredients } }) => {
    useEffect(() => {
        if (allIngredients.length === 0) {
            getAllIngredients();
        }
    }, [ getAllIngredients ]);


    return (
        <>
            {!loading && (
                <AllItems itemType="ingredient" items={ allIngredients } />
            )}
        </>
    )
}

const msp = state => ({
    ingredients: state.ingredients
})

export default connect(msp, { getAllIngredients })(AllIngredients);
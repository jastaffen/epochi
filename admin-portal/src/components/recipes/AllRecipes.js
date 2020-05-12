import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getAllRecipes } from '../../actions/recipes';

import AllItems from '../AllItems';

const AllRecipes = ({ getAllRecipes, recipes: { loading, allRecipes }}) => {
    useEffect(() => {
        if (allRecipes.length === 0) {
            getAllRecipes();
        }
    }, [ getAllRecipes, allRecipes.length ]);


    return (
        <>
            {!loading && (
                <AllItems itemType='recipe' items={allRecipes} />
            )}
        </>
    )
}

const msp = state => ({
    recipes: state.recipes
})

export default connect(msp, { getAllRecipes })(AllRecipes);
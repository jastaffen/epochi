import React, { useEffect } from 'react';
import { connect } from 'react-redux';


import AllItems from '../AllItems';

const AllRecipes = () => {
    useEffect(() => {
        if (allRecipes.length === 0) {
            console.log('emptyyyyyyy');
        }
    }, [ ]);


    return (
        <>
            {!loading && (
                <AllItems  />
            )}
        </>
    )
}

const msp = state => ({
    ingredients: state.ingredients
})

export default connect(msp, { getAllRecipes })(AllRecipes);
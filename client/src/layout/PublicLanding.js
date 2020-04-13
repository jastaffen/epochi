import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRecipesByMonth } from '../actions/recipes';

const PublicLanding = ({ recipesByMonth, getRecipesByMonth }) => {

    useEffect(() => {
        getRecipesByMonth();
    }, [])

    return (
        <>HI</>
    )
}

PublicLanding.propTypes = {
    getRecipesByMonth: PropTypes.func.isRequired,
    recipesByMonth: PropTypes.array.isRequired
}

const msp = state => ({
    recipesByMonth: state.recipes.recipesOfTheMonth
})


export default connect(msp, { getRecipesByMonth })( PublicLanding );
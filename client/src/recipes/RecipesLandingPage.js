import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dropdown from '../layout/Dropdown';
import RecipesContainer from './RecipesContainer';

import { getRecipesByMonth } from '../actions/recipes';
import { formatMonth } from '../utils/dateTime';

const RecipesLandingPage = ({ getRecipesByMonth, recipes: { loading, recipesOfTheMonth } }) => {
    const [ month, setMonth ] = useState(formatMonth());

    useEffect(() => {
        getRecipesByMonth(month);
    }, [getRecipesByMonth, month])

    const monthChange = (e) => {
        setMonth(e.target.value)
    }

    return (
        <>
            <Dropdown month={month} monthChange={monthChange} />
            {!loading && 
                <RecipesContainer recipes={recipesOfTheMonth} />
            }
        </>
    )
}

RecipesLandingPage.propTypes = {
    getRecipesByMonth: PropTypes.func.isRequired,
    recipes: PropTypes.object.isRequired
}

const msp = state => ({
    recipes: state.recipes
})

export default connect(msp, { getRecipesByMonth })(RecipesLandingPage);
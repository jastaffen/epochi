import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getIngredientsByMonth } from '../actions/ingredients';
import { formatMonth } from '../utils/dateTime';

const IngredientLandingPage = ({ 
    getIngredientsByMonth, ingredients: { 
        loading, ingredientsByMOnth 
    }}) => {

    const [ month, setMonth ] = useState(formatMonth());

    useEffect(() => {
        getIngredientsByMonth(month);
    }, [getIngredientsByMonth, month])

    return(
        <>All of the ingredients?</>
    )
}

IngredientLandingPage.propTypes = {
    getIngredientsByMonth: PropTypes.func.isRequired,
    ingredients: PropTypes.object.isRequired
}

const msp = state => ({
    ingredients: state.ingredients
})

export default connect(msp, { getIngredientsByMonth })(IngredientLandingPage);
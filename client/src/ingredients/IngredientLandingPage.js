import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dropdown from '../layout/Dropdown';
import IngredientsContainer from './IngredientsContainer';

import { getIngredientsByMonth } from '../actions/ingredients';
import { formatMonth } from '../utils/dateTime';

const IngredientLandingPage = ({ 
    getIngredientsByMonth, ingredients: { 
        loading, ingredientsByMonth 
    }}) => {
    
    
    const [ month, setMonth ] = useState(formatMonth());

    useEffect(() => {
        getIngredientsByMonth(month);
    }, [getIngredientsByMonth, month]);

    const monthChange = (e) => {
        setMonth(e.target.value)
    }

    return(
        <>
            <Dropdown month={month} 
                monthChange={monthChange} 
            />
            { !loading && 
                <IngredientsContainer 
                    ingredientsByMonth={ingredientsByMonth} 
                /> 
            }
        </>
    )
}

IngredientLandingPage.propTypes = {
    getIngredientsByMonth: PropTypes.func.isRequired,
    ingredients: PropTypes.object.isRequired
}

const msp = state => ({
    ingredients: state.ingredients
})

export default connect(msp, { getIngredientsByMonth })(withRouter(IngredientLandingPage));
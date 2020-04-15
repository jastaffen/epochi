import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FeaturedRecipe from '../recipes/FeaturedRecipe';
import SelectorBox from '../recipes/SelectorBox';

import { getRecipesByMonth } from '../actions/recipes';



const PublicLanding = ({ recipes: { recipesOfTheMonth, loading }, getRecipesByMonth }) => {
    const [ i, setI ] = useState(0);
    // const [timer, setTimer] = useState(null)
    // let timer;

    useEffect(() => {
        getRecipesByMonth();
    }, [getRecipesByMonth])

    // infinitely carousels through the recipes from the current month
    useEffect(() => {
        let newNum = i;
        if (!loading) {
          const timer = setTimeout(() => {
            
            //    checks to see that i is less than the number of recipes
               if (i < recipesOfTheMonth.length - 1) {
                    newNum = newNum + 1;
                    setI(newNum)
            //     if i is about to be great than our recipes array set back to the first
               } else if (i === recipesOfTheMonth.length - 1) {
                    setI(0)
               }
           }, 8000);
           return () => clearTimeout(timer);
       }
    }, [loading, i, recipesOfTheMonth, setI])

    const selectBox = (e, index) => {
        setI(index);
    }


    return (
        <div className="pl">
            {!loading && recipesOfTheMonth.length >= 1 ?
                <div className="plr-container">
                    <SelectorBox selectBox={selectBox} recipes={recipesOfTheMonth} recipe={recipesOfTheMonth[i]} /> 
                    <FeaturedRecipe recipe={recipesOfTheMonth[i]} /> 
                </div>: null}
        </div>
    )
}

PublicLanding.propTypes = {
    getRecipesByMonth: PropTypes.func.isRequired,
    recipes: PropTypes.object.isRequired
}

const msp = state => ({
    recipes: state.recipes
})


export default connect(msp, { getRecipesByMonth })( PublicLanding );
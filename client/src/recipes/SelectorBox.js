import React from 'react';
import PropTypes from 'prop-types';

import { formatMonth } from '../utils/dateTime';

const SelectorBox = ({ recipes, recipe, selectBox }) => {

    const displayRecipeBoxes = () => {
        return recipes.map((r, index) => {
            if (r.title === recipe.title) {
                return <li className="r-selected" key={index}>{r.title}</li>
            } else {
                return <li onClick={(e) => selectBox(e, index)} key={index}>{r.title}</li>
            }
        })
    }
    
    return (

        <div className="sb-container">
            <h1 id="pl-title">Featured Recipes for {formatMonth()} </h1>
            <div className="s-box">
                <ul>
                    {displayRecipeBoxes()}
                </ul>
            </div>
        </div>

    )
}

SelectorBox.propTypes = {
    recipes: PropTypes.array.isRequired,
    recipe: PropTypes.object.isRequired,
    selectBox: PropTypes.func.isRequired
}

export default SelectorBox;
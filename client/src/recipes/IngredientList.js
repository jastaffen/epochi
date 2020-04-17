import React from 'react';
import PropTypes from 'prop-types';

import { formatIngredient } from '../utils/formatIngredient';

const IngredientList = ({ ingredients }) => {

    return(
        <ul className="rp-ing-list">
            <li className="first">Ingredients</li>
            {ingredients && ingredients.map((ing => (
                    <li key={ing._id}>
                        {formatIngredient(ing)}
                    </li>
            )))}

        </ul>
    )
}

IngredientList.propTypes = {
    ingredients: PropTypes.array.isRequired
}

export default IngredientList;
import React from 'react';
import PropTypes from 'prop-types';

const IngredientList = ({ ingredients, ingredient }) => {

    const formatIngredient = (ing) => {
        let ingStr = '';
        const { measurement: {$numberDecimal}, unit, name, additionalInfo } = ing;
        if ($numberDecimal !== "0") ingStr += $numberDecimal
        if (unit.toUpperCase() !== 'quantity'.toUpperCase() &&
        unit !== 'to taste') ingStr += ` ${unit}`
        ingStr += ` ${name}`;
        if (additionalInfo) ingStr += ` ${additionalInfo}`;
        if (unit === 'to taste') ingStr +=  ` ${unit}`
        return ingStr;
    }

    return(
        <ul className="rp-ing-list">

            {ingredients.map(ing => (
                <li key={ing._id}>{formatIngredient(ing)}</li>
            ))}

        </ul>
    )
}

IngredientList.propTypes = {
    ingredients: PropTypes.array.isRequired
    // ingredient: PropTypes.object.isRequired
}

export default IngredientList;
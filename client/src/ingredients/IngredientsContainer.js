import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const IngredientsContainer = ({ ingredientsByMonth }) => {

    return(
        <div className="item-container ing-container">
            {ingredientsByMonth.map(ingredient => (
                <Link to={`/${ingredient._id}/recipes`} key={ingredient._id}>
                    <div className="ing-card">
                        <img className="circle-image" 
                            src={ingredient.image} 
                            alt={ingredient.name}
                        />
                        <h3>{ingredient.name}</h3>
                    </div>
                </Link>
            ))}
        </div>
    )
}

IngredientsContainer.propTypes = {
    ingredientsByMonth: PropTypes.array.isRequired
}

export default IngredientsContainer;
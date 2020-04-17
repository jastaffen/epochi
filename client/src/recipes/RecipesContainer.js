import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RecipesContainer = ({ recipes }) => {
    return (
        <div className="item-container">
            {recipes.map(recipe => (
                <Link to={`/recipes/${recipe._id}`} className="recipe-card" key={recipe._id}>
                    <img className="circle-image" src={recipe.image} alt={recipe.title} />
                    <h3>{recipe.title}</h3>
                </Link>
            ))}
        </div>
    )
}

RecipesContainer.propTypes = {
    recipes: PropTypes.array.isRequired
}

export default RecipesContainer;
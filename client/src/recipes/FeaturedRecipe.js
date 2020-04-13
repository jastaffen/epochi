import React from 'react';
import PropTypes from 'prop-types';

const FeaturedRecipe = ({ recipe }) => {

    const { published, chef: { name, avatar }, title, image } = recipe;

    const handleDate = () => {
        return published.split(' ').slice(1, 4).join(' ');
    }

    return (
        <div className="rp-container">
            <div className="rp-link">
                <h1>{title}</h1>
                <img className="rp-image" src={image} alt={title} />

                <div>
                    <h5>{handleDate()}</h5>
                    <h5>{name}</h5>
                </div>
                
            </div>
        </div>
    )
}

FeaturedRecipe.propTypes = {
    recipe: PropTypes.object.isRequired
}

export default FeaturedRecipe;
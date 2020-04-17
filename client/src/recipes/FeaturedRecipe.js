import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const FeaturedRecipe = ({ recipe }) => {

    const { published, chef: { name, avatar, _id }, title, image } = recipe;

    const handleDate = () => {
        return published.split(' ').slice(1, 4).join(' ');
    }

    return (
        <div className="rp-container">
            <div className="rp-link">
                
                    <h1>{title}</h1>

                    <Link to={`/recipes/${recipe._id}`}>
                        <img className="rp-image hover" 
                            src={image} alt={title} 
                        />
                    </Link>

                <div className="rp-info">
                
                    <Link to={`/chefs/${_id}`}>
                        <div className="rp-chef">
                            <img src={avatar} alt={name} />
                            <h5>{name}</h5>  
                        </div>
                    </Link>

                    <h5>{handleDate()}</h5>
                    
                </div>
                
            </div>
        </div>
    )
}

FeaturedRecipe.propTypes = {
    recipe: PropTypes.object.isRequired
}

export default FeaturedRecipe;
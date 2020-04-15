import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ChefCard = ({ chef }) => {
    return (
        <Link to={`/chefs/${chef._id}`} >
            <div className="chef-card">
                <img src={chef.avatar} />
                <h2>{chef.name}</h2>
            </div>
        </Link>
    )
}

ChefCard.propTypes = {
    chef: PropTypes.object.isRequired
}

export default ChefCard;
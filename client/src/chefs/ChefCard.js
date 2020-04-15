import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ChefCard = ({ chef }) => {
    const { _id, avatar, name } = chef;

    return (
        <Link to={`/chefs/${_id}`} >
            <div className="chef-card">
                <img className="circle-image" src={avatar} alt={name} />
                <h2>{name}</h2>
            </div>
        </Link>
    )
}

ChefCard.propTypes = {
    chef: PropTypes.object.isRequired
}

export default ChefCard;
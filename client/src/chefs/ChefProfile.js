import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RecipesByChef from './RecipesByChef';

import { getChef } from '../actions/chefs';

const ChefProfile = ( { getChef, match, chefs: { selectedChef, loading } } ) => {
    useEffect(() => {
        getChef(match.params.id);
    })
    const { name, bio, avatar } = selectedChef;
    return (
        <div class="cp-container">
            {!loading && selectedChef && 
            <>
                <div className="chef-profile">
                    <h1>{name}</h1>
                    <img src={avatar} alt={name} />
                    <p>{bio}</p>
                </div>

                <RecipesByChef />
                <hr />
            </>
            }
            {/* <>
                <RecipesByChef />
            </> */}
        </div>
    )
}

ChefProfile.propTypes = {
    getChef: PropTypes.func.isRequired,
    chefs: PropTypes.object.isRequired
}

const msp = state => ({
    chefs: state.chefs
});


export default connect(msp, { getChef })(ChefProfile);
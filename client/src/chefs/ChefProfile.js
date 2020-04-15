import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RecipesByChef from './RecipesByChefContainer';

import { getChef } from '../actions/chefs';

const ChefProfile = ( { getChef, match, chefs: { selectedChef, loading } } ) => {
    useEffect(() => {
        getChef(match.params.id);
    }, [getChef, match.params.id]);

    const { name, bio, avatar } = selectedChef;
    
    return (
    <>
        <div className="cp-container">
            {!loading && selectedChef && 
            <>
                <div className="chef-profile">
                    <h1>{name}</h1>
                    <img src={avatar} alt={name} />
                    <p>{bio}</p>
                </div>

                <RecipesByChef id={match.params.id} name={name} />
                
                
            </>
            }
            
        </div>

        <hr />
    </>
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
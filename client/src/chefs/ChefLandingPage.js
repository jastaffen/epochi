import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ChefCard from './ChefCard';
import Loading from '../layout/Loading';

import { getAllChefs } from '../actions/chefs';

const ChefLandingPage = ({ getAllChefs, chefs: { allChefs, loading } }) => {

    useEffect(() => {
        getAllChefs()
    }, [getAllChefs])

    return(
        <div className="cpl-container item-container">
            {!loading ?
            
                allChefs.map(chef => 
                <ChefCard key={chef._id} chef={chef} />)
                :

                <Loading />
            }
        </div>
    )
}

ChefLandingPage.propTypes = {
    getAllChefs: PropTypes.func.isRequired,
    chefs: PropTypes.object.isRequired
}

const msp = state => ({
    chefs: state.chefs
})

export default connect(msp, { getAllChefs })(ChefLandingPage);
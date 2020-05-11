import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ChefForm from '../forms/ChefForm';
import AllChefs from './AllChefs';
import GoBack from '../functional/GoBack';

const UpdateChef = ({ chefs: { loading, selectedChef }, history }) => {
    return(
        !loading && (
        <>  
            <GoBack history={history} itemType="chef" />
            <AllChefs />
            <ChefForm from={'update'} selectedChef={ selectedChef } />
        </>
        )   
    )
}

const msp = state => ({
    chefs: state.chefs
})

export default connect( msp )( withRouter(UpdateChef) );
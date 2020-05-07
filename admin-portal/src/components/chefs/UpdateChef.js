import React from 'react';

import { connect } from 'react-redux';

import ChefForm from '../forms/ChefForm';
import AllChefs from './AllChefs';

const UpdateChef = ({ chefs: { loading, selectedChef }}) => {
    return(
        !loading && (
        <>  
            <AllChefs />
            <ChefForm from={'update'} selectedChef={ selectedChef } />
        </>
        )   
    )
}

const msp = state => ({
    chefs: state.chefs
})

export default connect( msp )( UpdateChef );
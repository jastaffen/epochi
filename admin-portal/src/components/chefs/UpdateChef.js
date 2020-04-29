import React from 'react';

import { connect } from 'react-redux';

import ChefForm from '../forms/ChefForm';

const UpdateChef = ({ chefs: { loading, selectedChef }}) => {
    return(
        <ChefForm from={'update'} selectedChef={ selectedChef } />
    )
}

const msp = state => ({
    chefs: state.chefs
})

export default connect( msp )( UpdateChef );
import React from 'react';

const GoBack = ({ history }) => (

    <button className="button" 
        onClick={() => history.goBack()}>
        Go Back
    </button>
    
);

export default GoBack;
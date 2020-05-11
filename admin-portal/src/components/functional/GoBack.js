import React from 'react';

const GoBack = ({ history, itemType }) => {
    const { location: { pathname } } = history;

    const goBack = () => {
        if ( pathname === `/add-${itemType}`) {
            history.push('/dashboard');
        } else if ( pathname.includes(`/edit-${itemType}`) ) {
            history.push(`/add-${itemType}`);
        }
    }
    return (
    <button className="button" 
        onClick={goBack}>
        Go Back
    </button>
    )
    
};

export default GoBack;
import React from 'react';

const GoBack = ({ history }) => {
    const { location: { pathname } } = history;

    const goBack = () => {
        if ( pathname === '/add-chef' || pathname === '/add-ingredient' ) {
            history.push('/dashboard');
        } else if ( pathname.includes('/edit-chef') ) {
            history.push('/add-chef');
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
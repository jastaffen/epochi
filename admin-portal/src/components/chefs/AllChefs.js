import React from 'react';

const AllChefs = ({ from }) => {
    if (from === 'add-chef') {
        return (
            <div>Here's the list of 
                chefs in the database. 
                You won't be able to add a 
                chef that already exists.
            </div>
        )
    } else {
        return (
            <div>
                Select the chef you'd like to update
            </div>
        )
    }
}

export default AllChefs;
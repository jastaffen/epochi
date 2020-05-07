import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import AllChefs from './AllChefs';
import GoBack from '../functional/GoBack';
import ChefForm from '../forms/ChefForm';

const AddOrUpdateChef = ({ history }) => {

    const [ showAddForm, setShowAddForm ] = useState(false);

    return(
        <div className="chef-container">
            <GoBack history={history} />
            <h3>All Chefs (update a chef):</h3>
            <AllChefs />
            
            {!showAddForm ?
                <button className="button" 
                    onClick={() => setShowAddForm(true)}>
                        Add A New Chef
                </button> 
                :
                <ChefForm from={'add'} />
            }
        </div>
    )
}

export default withRouter(AddOrUpdateChef);
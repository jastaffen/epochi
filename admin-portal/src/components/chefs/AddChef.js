import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import AllChefs from './AllChefs';
import GoBack from '../functional/GoBack';
import ChefForm from '../forms/ChefForm';

const AddChef = ({ history }) => {

    const [ showAddForm, setShowAddForm ] = useState(false);

    return(
        <div>
            <GoBack history={history} />
            <AllChefs from="add-chef" />
            
            { 
                !showAddForm ?
                
                <button className="button" 
                    onClick={() => setShowAddForm(true)}>
                        Add A Chef
                </button> 
                
                :

                <ChefForm />
            }

        </div>
    )
}

export default withRouter(AddChef);
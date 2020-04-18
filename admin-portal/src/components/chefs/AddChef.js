import React from 'react';
import { withRouter } from 'react-router-dom';

import AllChefs from './AllChefs';
import GoBack from '../functional/GoBack';

const AddChef = ({ history }) => {


    return(
        <div>
            <GoBack history={history} />
            <AllChefs from="add-chef" />
            Add Chef
        </div>
    )
}

export default withRouter(AddChef);
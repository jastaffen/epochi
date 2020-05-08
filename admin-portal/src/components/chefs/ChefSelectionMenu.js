import React from 'react';
import { withRouter } from 'react-router-dom';

import AllChefs from './AllChefs';
import GoBack from '../functional/GoBack';

const ChefSelectionMenu = ({ history }) => {
    
    return (
        <div>
            <GoBack history={history} />
            <AllChefs from="update-chef" />
        </div>
    )
}

export default withRouter(ChefSelectionMenu);
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return <Redirect to='/' />
    } else {
        return <Route {...rest} render={props => <Component {...props} />} />
    }

    // return (<Route {...rest} 
    //     render={props => 
    //         !localStorage.getItem('token') ? 
    //     (<Redirect to="/" />) : 
    //     (<Component {...props} />) }
    // />)

}

export default PrivateRoute;
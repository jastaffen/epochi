import React from 'react';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    let history = useHistory();
    const logout = e => {
        e.preventDefault();
        localStorage.removeItem('token');
        history.push('/')
    }
    return(
        <div>
            <h1>Welcome</h1>
            
            <button onClick={logout}>Logout</button>
            
        </div>
    )
}

export default Dashboard;
import React from 'react';
import { useHistory, Link } from 'react-router-dom';

const Dashboard = () => {

    let history = useHistory();
    const logout = e => {
        e.preventDefault();
        localStorage.removeItem('token');
        history.push('/')
    }
    return(
        <nav>
            <button className="button" id="logout" onClick={logout}>
                Logout
            </button>

            <div className="navbar">
                <h1>Welcome</h1>
                <p>What would you like to do?</p>
                
                <div className="button-container">
                    
                    <hr />

                    <div className="flex-button">
                        <Link to="/add-chef">
                            <button className="button">
                                Add or Update Chefs
                            </button>
                        </Link>
                    </div>


                    <hr />

                    <div className="flex-button">
                        <button className="button">Add an ingredient</button>
                        <button className="button">Update an ingredient</button>
                    </div>

                    <hr />

                    <div className="flex-button">
                        <button className="button">Add a recipe</button>
                        <button className="button">Edit a recipe</button>
                    </div>

                    <hr />

                </div> 
            </div>
        </nav>
    )
}

export default Dashboard;
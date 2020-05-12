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
                        <Link to="/add-ingredient" >
                            <button className="button">
                                Add or Update Ingredients
                            </button>
                        </Link>
                    </div>

                    <hr />

                    <div className="flex-button">
                        <Link to="/add-recipe">
                            <button className="button">
                                Add or Update Recipes
                            </button>
                        </Link>
                    </div>

                    <hr />

                </div> 
            </div>
        </nav>
    )
}

export default Dashboard;
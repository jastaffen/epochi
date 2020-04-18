import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return(
        <nav>
            <div className="home-button">
                <Link to="/">EPOCHI</Link>
            </div>
            <div className="app-links">
                <Link className="underline" to="/chefs">CHEFS</Link>
                <Link className="underline" to="/ingredients">INGREDIENTS</Link>
                <Link className="underline" to="/recipes">RECIPES</Link> 
            </div>
            
            {/* <div className="auth-button">
                <Link to="/login">LOGIN</Link>
            </div> */}

        </nav>
    )
}

export default NavBar;
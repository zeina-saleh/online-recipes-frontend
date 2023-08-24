import React from 'react'
import { useNavigate } from 'react-router-dom';

const Nav2 = ({handleOpenListModal}) => {
    
    const navigation = useNavigate();

    function navigate () {
        navigation('/landing')
    }

    return (
        <>
        <nav className="navbar">
            <div className="navbar-brand">Foody Recipe</div>
            <ul className="navbar-list">
                <li className="navbar-item" onClick={navigate}>Recipes</li>
                <li className="navbar-item" onClick={handleOpenListModal}>Shopping List</li>
                <li className="navbar-item">Logout</li>
            </ul>
        </nav>
        </>
    );
}

export default Nav2
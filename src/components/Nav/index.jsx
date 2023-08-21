import React from "react";
import "./style.css";
import { useState } from "react";

const Nav = ({handleOpenModal}) => {

    

    return (
        <>
        <nav className="navbar">
            <div className="navbar-brand">BeSt ReCiPeS</div>
            <ul className="navbar-list">
                <li className="navbar-item" onClick={handleOpenModal}>Add Recipe</li>
                <li className="navbar-item">Shopping List</li>
                <li className="navbar-item">Calendar</li>
                <li className="navbar-item">Logout</li>
            </ul>
        </nav>
        </>
    );
};

export default Nav;
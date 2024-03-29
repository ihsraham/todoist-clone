import React from 'react';
import logo from '../assets/images/logo.png';

function Header() {
    return (
        <header className="header">
            <nav>
                <div className="logo">
                    <img src={logo} alt="Todoist" />
                </div>
            </nav>
        </header>
    );
};

export default Header

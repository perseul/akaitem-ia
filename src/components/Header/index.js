import React from 'react';

import logoaka from '../../assets/logoaka.svg'
import elipse from '../../assets/elipse.svg';

import "./styles.css";

const Header = () => 
    <header id="main-header">
        <div className="logo-aka">
        <img src={logoaka} alt="Logo" />
        </div>
        <div className="elipse-aka">
            <img src={elipse} alt="Elipse" />
        </div>
    </header>

export default Header;
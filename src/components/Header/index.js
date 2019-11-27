import React from 'react';

import logoaka from '../../assets/logoaka.png'
import elipse from '../../assets/elipse.svg';
import carrinho from '../../assets/carrinho.svg';

import "./styles.css";

const Header = () => 
    <header id="main-header">  
            <div className="logo-aka">
              <a href="/"> <img src={logoaka} alt="Logo" /> </a>
            </div>
            <div className="elipse-aka">
                <a href="/"> <img src={elipse} alt="Elipse" /> </a>
            </div>
        <div className="carrinho-total">
            <a href="/cart"><img src={carrinho} alt="Carrinho" /> </a>        
        </div>
    </header>
    

export default Header;
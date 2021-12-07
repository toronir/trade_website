import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState';
import {Link} from 'react-router-dom'


function Header() {
    const value = useContext(GlobalState);
    return (
        <header>
            <div className="menu">
                <button>Menu</button>   
            </div>

            <div className="logo">
                <Link to ="/">SHOPLOGO</Link>
            </div>
            <ul >
                <li>
                    <Link to="/">Products</Link>
                </li>
                <li>
                    <Link to="/login">Login or Register</Link>
                </li>           
                <li>
                    <button>Colse</button>
                </li>
            </ul>
            <div className="cart-icon">
                    <span>0</span>
                    <Link to="/cart">
                        <a> Cart</a>
                    </Link>
                </div>
        </header>
    )
}

export default Header



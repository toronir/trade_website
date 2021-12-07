import React from 'react'
import { Routes ,Route } from 'react-router-dom';
import Products from './mainpages/products/Products';
import Login from './mainpages/auth/Login';
import Register from './mainpages/auth/Register';
import Cart from './mainpages/cart/Cart';
import NotFound from './utis/notFound/NotFound';

function Pages() {
    return (
        <Routes>
            <Route path='/' element={<Products/>} />
            <Route path="/login" element={<Login/>}  />
            <Route path="/register" element={<Register/>}  />
            <Route path="/cart" element={<Cart/>}  />

            <Route path="*" element={<NotFound/>}  />

        </Routes>
    )
}

export default Pages

import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './pages/main';
import Product from './pages/product';
import Cart from './pages/cart';

const RoutesService = () => (
    <BrowserRouter>
    <Routes>
        <Route exact path='/' element={<Main/>} />
        <Route path='/products/:id' element={<Product/>} />
        <Route path='/cart' element={<Cart/>} />
    </Routes>
    </BrowserRouter>
);

export default RoutesService;
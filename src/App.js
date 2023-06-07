import React from 'react';
import RoutesService from  './routesService';

import './styles.css';

import Header from './components/Header';


const App = () => (
    <div className="App">
      <Header />
      <RoutesService />
    </div>
);

export default App;

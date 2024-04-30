import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom';
import './App.css';

import homeImage from './images/home.png';

import Routes from './Routes'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <Link to="/" className="">
            <img src={homeImage} className="return" alt="return"/>
          </Link>
        </header>
        <Routes /> 
      </div>
    </BrowserRouter>
  );
}

export default App;
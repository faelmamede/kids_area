import React, { useState } from 'react';

import toysImage from '../../images/toys.jpg';
import configImage from '../../images/config.png';
import historyImage from '../../images/history.png';

import './Home.css'
import { Link } from 'react-router-dom';

function Home(props) {
    return (
        <main className='nav'>
            <Link to="/configurations" className='card'>
                <img src={configImage} alt="config"/>
                <h1>Configurações</h1>
            </Link>
            <Link to="/kidsarea" className='card'>
                <img src={toysImage} alt="toys"/>
                <h1>Área Kids</h1>
            </Link>
            <Link to="/history" className='card'>
                <img src={historyImage} alt="history"/>
                <h1>Histórico</h1>
            </Link>
        </main>
    )
}

export default Home
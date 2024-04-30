import React, { useEffect, useState } from 'react';

import './History.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from '../utils/Table';

function History(props) {
    const [customers, setCustomers] = useState([]);
    const tableHeaders = ['Nome', 'Responsavel', 'Entrada', 'Saida', 'Preco', 'Pagamento'];

    useEffect(() => {
        axios.get('http://localhost:3001/customers').then((response) => {
            setCustomers(response.data);
        });
    });

    return (
        <section className='hi'>
            <div className='summary'>
                <div className='total'>
                    <h2>Ganho Total</h2>
                    <h3>R$ {customers.reduce((acc, customer) => acc + customer.price, 0).toFixed(2)}</h3>                
                </div>
                <div className='pix'>
                    <h2>Pix</h2>
                    <h3>R$ {customers.filter((customer) => customer.payment_type === 'pix').reduce((acc, customer) => acc + customer.price, 0).toFixed(2)}</h3>
                </div>
                <div className='money'>
                    <h2>Dinheiro</h2>
                    <h3>R$ {customers.filter((customer) => customer.payment_type === 'dinheiro').reduce((acc, customer) => acc + customer.price, 0).toFixed(2)}</h3>
                </div>
            </div>
            <Table
                header={tableHeaders}
                rows={customers}
                showPrice={true}
                dateFormat='DD/MM/YYYY HH:mm'
            />
        </section>
    )
}

export default History
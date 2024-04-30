import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment/moment';

import './KidsArea.css'
import Clock from '../utils/Clock';
import Table from '../utils/Table';

function KidsArea(props) {
    const [numberOfCustomers, setNumberOfCustomers] = useState(0);
    const [customers, setCustomers] = useState([]);
    const [configurations, setConfigurations] = useState([{}]);
    
    const tableHeaders = ['Nome', 'Responsável', 'Horário de entrada', 'Horário de saída', 'Tempo restante', ''];

    useEffect(() => {
        axios.get('http://localhost:3001/customers').then((response) => {
            setCustomers(response.data);
        });

        axios.get('http://localhost:3001/configurations').then((response) => {
            setConfigurations(response.data);
        });
    }, [numberOfCustomers]);

    const isNotNull = (value) => {
        return value !== null && value !== '';
    }

    const createCustomer = (event) => {
        event.preventDefault();
        const customer = {
            name: event.target.name.value,
            responsible: event.target.responsible.value,
            payment_type: event.target.payment.value,
            time: event.target.time.value,
            price: configurations.find((configuration) => configuration.minutes === Number(event.target.time.value)).price,
            start_time: moment().format(),
            playing: true
        };

        if (isNotNull(customer.name) && isNotNull(customer.responsible)) {
            axios.post('http://localhost:3001/customers', customer).then((response) => {
                setNumberOfCustomers(numberOfCustomers + 1);
            });
        }
        else {
            alert('Preencha todos os campos!');
        }
    }

    const removeCustomer = (event, id) => {
        event.preventDefault();
        const end_time = moment().format();
        const customer = customers.find((customer) => customer.id === id);
        customer.end_time = end_time;
        customer.playing = false;
        axios.put(`http://localhost:3001/customers/${customer.id}`, customer).then((response) => {
            setNumberOfCustomers(numberOfCustomers - 1);
        });
    }

    return (
        <main className='customers'>
            <Clock />
            <div className='new-customer'>
                <form onSubmit={createCustomer}>
                    <label htmlFor='name'>Nome</label>
                    <input type='text' id='name' name='name'/>
                    <label htmlFor='responsible'>Responsável</label>
                    <input type='text' id='responsible' name='responsible'/>
                    <label htmlFor='time'>Tempo (minutos)</label>
                    <select id='time' name='time'>
                        {configurations.map((configuration) => {
                            return (
                                <option value={configuration.minutes}>{configuration.minutes}</option>
                            )
                        })}
                    </select>
                    <label htmlFor='payment'>Pagamento</label>
                    <select id='payment' name='payment'>
                        <option value='pix'>pix</option>
                        <option value='dinheiro'>dinheiro</option>
                    </select>
                    <button type='submit'>Adicionar</button>
                </form>
            </div>
            <Table 
                header={tableHeaders}
                rows={customers}
                filter={true}
                actions={true}
                showRemainingTime={true}
                dateFormat='HH:mm:ss'
                callBackRemoveAction={removeCustomer}
            />
        </main>
    )
}

export default KidsArea
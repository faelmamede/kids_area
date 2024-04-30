import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Config.css'
import DynamicInput from '../utils/DynamicInput';

function Config(props) {
    const [configurations, setConfigurations] = useState([]);
    const API = 'http://localhost:3001/configurations';

    useEffect(() => {
        axios.get(API).then((response) => {
            setConfigurations(response.data);
        });
    }, [API]);

    const saveConfigurations = async (event, inputs) => {
        event.preventDefault();
        alert("Não deu tempo de fazer essa parte kkkk")
        /*if (inputs.some((input) => input.minutes === 0)) {
            alert('Minutos não podem ter valor 0!');
            return;
        }
        await removeAllConfgurations();
        await addAllConfigurations(inputs);*/
    }

    const removeAllConfgurations = () => {
        configurations.forEach((configuration) => {
            axios.delete(`${API}/${Number(configuration.id)}`).then((response) => {
            });
        });
    }

    const addAllConfigurations = (inputs) => {
        inputs.sort((a, b) => a.minutes - b.minutes).map((input, index) => {
            return {id: index, minutes: input.minutes, price: input.price};
        }).forEach((input) => {
            axios.post(API, input).then((response) => {});
        });
    }

    return (
        <main className='configurations'>
            <DynamicInput inputs={configurations} callBack={saveConfigurations}/>
        </main>
    )
}

export default Config
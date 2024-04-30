import React, { useEffect, useState } from 'react';

import './DynamicInput.css'

function DynamicInput(props) {
    const [inputs, setInputs] = useState([]);

    useEffect(() => {
        setInputs(props.inputs);
    }, [props.inputs]);

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        const newInputs = [...inputs];
        newInputs[index][name] = value;
        setInputs(newInputs);
    }

    const addInput = () => {
        setInputs([...inputs, {minutes: 0, price: 0}]);
    }

    const removeInput = (index) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);
    }

    return (
        <div class='dn'>
            <form onSubmit={event => props.callBack(event, inputs)}>
                {inputs.map((input, index) => {
                    return (
                        <div className='dn-input'>
                            <label htmlFor="minutes">Minutos:</label>
                            <input type="number" id="minutes" name="minutes" required value={input.minutes} onChange={event => handleChange(event, index)}/>
                            <label htmlFor="price">Preço:</label>
                            <input type="number" id="price" name="price" required value={input.price} onChange={event => handleChange(event, index)}/>
                            <span className='currency'>R$</span>
                            <button type='button' className='minus-button' onClick={event => removeInput(index)}>-</button>
                        </div>
                    )
                })}
                <div className='dn-footer'>
                    <button type='submit' className='save-button'>Salvar</button>
                    <button type='button' className='plus-button' onClick={addInput}>+</button>
                </div>
            </form>
        </div>
    )
}

export default DynamicInput
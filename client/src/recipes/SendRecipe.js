import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import { formatIngredient } from '../utils/formatIngredient';

const SendRecipe = ({ ingredients, instructions }) => {
    const [ formatIng, setFormatIng ] = useState('');
    const [ formatInst, setFormatInst ] = useState('');
    const [ recipient, setRecipient ] = useState('');
    const [ formDisplay, setFormDisplay ] = useState(false);
    const [ buttonText, setButtonText ] = useState('Text Ingredients?')
    
    useEffect(() => {
        let ingString = '';
        for (let ingredient of ingredients) {
            ingString += `${formatIngredient(ingredient)} ❚ `;
        }
        setFormatIng(ingString);
    }, [formatIngredient, ingredients]);

    const sendText = async (e) => {
        e.preventDefault();
        // fetch send text routte and send but first figure out 
        // how to properly configure phone number input
        await axios
            .get(`http://localhost:5400/api/send-text?recipient=+1${recipient}&textMessage=${formatIng}`);
        
        setRecipient('');
        setFormDisplay(false);
        setButtonText('Text has been successfully sent. Send another?')
    }
    return (
        <div className="text">
            {formDisplay ? 
                <form onSubmit={sendText} autocomplete="off">
                    <input type="tel" name="telphone" 
                    placeholder="Digits Here!" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                    maxLength="12"  title="Ten digits code" required value={recipient} 
                    onChange={(e) => setRecipient(e.target.value)} 
                    />    
                    <span>e.g. 888-888-8888</span>
                </form>
            
            : 
                <button className="text" onClick={() => setFormDisplay(true)}>{buttonText}</button>}
        </div>
    )
}

export default SendRecipe;
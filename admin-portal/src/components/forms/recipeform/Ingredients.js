import React, { useState, useEffect } from 'react';


import FormField from '../FormField';

const Ingredients = ({ addToIngredients, ingEdit }) => {
    const UNITS = ['Ibs', 'cups', 'oz', 'tablespoons', 
        'teaspoons', 'grams', 'quantity', 'to taste'];

    const initialState = {
        name: '',
        measurement: 0,
        unit: '',
        additionalNotes: '',
        id: Math.random(10000000)
    }

    const [ form, setForm ] = useState(initialState);

    useEffect(() => {
        if (ingEdit) {
            setForm(ingEdit)
        }
    }, [ ingEdit ]);

    const handleChange = e => {
        setForm({ ...form,[e.target.name]: e.target.value })
    }

    const { name, measurement, unit, additionalNotes } = form;

    const handleAddClick = e => {
        e.preventDefault();
        if (!name || !measurement || !unit ) {
            return alert('Empty fields')
        } 
        if (ingEdit) {
            addToIngredients(form, true)
        } else {
            addToIngredients(form, false);
        }
        setForm(initialState);
    }

    return (
        <div className="ingredient-form">
            <h3>Add an Ingredient to The Ingredients List</h3>
            <div className="initial-fields">
                <FormField type="text" name="name" value={name} 
                    handleChange={handleChange}
                />
            </div>
            <br />
            <div>
                <label>
                    Quantity:
                    <FormField type="number" name="measurement" value={measurement}
                        handleChange={handleChange} step={0.01}
                    />
                </label>
            
                <div className="unit-box radio-box-container">
                    <div className="radio-box">
                        <h3>Unit of Measurement</h3>
                    { UNITS.map(item => (
                        <div className={ unit === item ? "card selected" : "card" } 
                            key={item} onClick={() => setForm({ ...form, unit: item })}>
                            <span>{ item }</span>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
            <div>
                <textarea placeholder="additional notes..."
                    id="additional-notes"
                    value={ additionalNotes } onChange={(e) => setForm({ ...form, additionalNotes: e.target.value })} >
                </textarea>
            </div>
            <div>
                <button onClick={handleAddClick}>
                    add ingredient
                </button>
            </div>
        </div>
    )
}

export default Ingredients;
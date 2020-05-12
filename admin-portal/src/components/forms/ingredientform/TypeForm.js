import React from 'react';

import FormField from '../FormField';

const TypeForm = ({ FOOD_GROUPS, handleIngredientChange, selectedValue }) => (
    <div className="food-group-container"> 
        <span>Check One of the Below:</span>
        <div className="groups-container">
    { FOOD_GROUPS.map(group => (
        <div className="group" key={ group } >
            <label>
                { group }
                <FormField type='radio' name="type" value={group} 
                handleChange={handleIngredientChange} checked={group === selectedValue} />
            </label>
        </div>
        ))}
        </div>
    </div>
)

export default TypeForm;
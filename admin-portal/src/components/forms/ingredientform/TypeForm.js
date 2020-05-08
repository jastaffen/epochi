import React from 'react';

import FormField from '../FormField';

const TypeForm = ({ FOOD_GROUPS, handleIngredientChange }) => (
    <> 
        <span>Check One of the Below:</span>
    { FOOD_GROUPS.map(group => (
        <div className="group" key={ group } >
            <label>
                { group }
                <FormField type='radio' name="type" value={group} 
                handleChange={handleIngredientChange} />
            </label>
        </div>
        ))}
    </>
)

export default TypeForm;
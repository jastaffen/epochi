import React from 'react';

const formatPlaceholder = name => {
    if (name === 'firstName') {
        return 'first name';
    } else if (name === 'lastName') {
        return 'last name'
    } else {
        return name;
    }
}

const FormField = ({ type, name, handleChange, value, ...rest }) => (
    <input className="form-field" type={type} name={name} 
        placeholder={formatPlaceholder(name)}
        value={value} onChange={handleChange} autoComplete="off" 
        {...rest}
    />
)

export default FormField;
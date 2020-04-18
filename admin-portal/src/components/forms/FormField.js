import React from 'react';

const FormField = ({ type, name, handleChange, value }) => (
    <input className="form-field" type={type} name={name} placeholder={name}
        value={value} onChange={handleChange} autoComplete="off"
    />
)

export default FormField;
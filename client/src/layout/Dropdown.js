import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ month, monthChange }) => {
    const months = [ 
        "January", "February", "March", 
        "April", "May", "June", "July", "August", 
        "September", "October", "November", "December" 
    ];

    return(
        <div className="dropdown">
            <select value={ month } onChange={monthChange}>

                {months.map(month => 

                    <option key={ month } value={ month }>{ month }</option>)
                
                }

            </select>
        </div>
    )
}

Dropdown.propTypes = {
    month: PropTypes.string.isRequired,
    monthChange: PropTypes.func.isRequired
}

export default Dropdown;
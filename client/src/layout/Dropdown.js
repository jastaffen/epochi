import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ months, month, monthChange }) => {


    return(
        <div className="ing-dropdown">
            <select value={ month } onChange={monthChange}>

                {months.map(month => 

                    <option key={ month } value={ month }>{ month }</option>)
                
                }

            </select>
        </div>
    )
}

Dropdown.propTypes = {
    months: PropTypes.array.isRequired,
    month: PropTypes.string.isRequired,
    monthChange: PropTypes.func.isRequired
}

export default Dropdown;
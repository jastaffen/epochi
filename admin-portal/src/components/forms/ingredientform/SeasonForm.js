import React, { useEffect } from 'react';

import FormField from '../FormField';

const SeasonForm = ({ MONTHS, handleMonthSelect, season }) => {
    
    return (
        <div className="season-container">
            <span>During which month(s) can you find this ingredient
                in New York State:
            </span>
            <div className="months-container">
            { MONTHS.map(month => (
                <div className={ season.includes(month) ? 'month selected' : 'month' } 
                    key={month} onClick={() => handleMonthSelect(month)}
                >
                    <span>{month}</span>
                </div>
            ))}
            </div>
        </div>
    )
}

export default SeasonForm;
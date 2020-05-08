import React, { useEffect } from 'react';

import FormField from '../FormField';

const SeasonForm = ({ MONTHS, handleMonthSelect, season }) => {
    
    return (
        <div className="season-container">
            <span>Check all that apply:</span>
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
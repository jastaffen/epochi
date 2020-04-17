import React from 'react';
import PropTypes from 'prop-types';

const InstructionList = ({ instructions }) => {
    return(
        <ul>
            <li className="first">Instructions</li>
            {instructions.map(instruction => (
                <li key={instruction}>{instruction}</li>
            ))}
        </ul>
    )
}

InstructionList.propTypes = {
    instructions: PropTypes.array.isRequired
}

export default InstructionList;
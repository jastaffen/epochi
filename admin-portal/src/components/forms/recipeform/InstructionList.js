import React, { useState } from 'react';

const InstructionList = ({ instructions }) => {
    if (instructions.length === 0) {
        return (
        <div>
            <span>No instructions have been added yet</span>
        </div>
        )} 

    const renderedInstructions = instructions.map((instruction, index) => (
        <div key={instruction}>
            <button>|||</button>
            <span>{`${index + 1}.) `}  {instruction}</span>
            <button>Edit</button>
            <button>x</button>
        </div>
    ))

    return (
        <div className="instructions-box">
            <div className="instruction-card">
                {renderedInstructions}
            </div>
        </div>
    )
}

export default InstructionList;
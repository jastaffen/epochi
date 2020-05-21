import React, { useState } from 'react';

const InstructionList = ({ instructions, setInstEdit, 
    moveUp, moveDown, removeInstruction }) => {

    if (instructions.length === 0) {
        return (
        <div>
            <span>No instructions have been added yet</span>
        </div>
        )} 
    
    const renderedInstructions = instructions.map((instruction, index) => (
        <div key={instruction.body} className="instruction-card">
            {`${index + 1}.) `}  
            <div className="info">
                <span>{instruction.body}</span>
            </div>
            <button onClick={() => setInstEdit(instruction)}>Edit</button>
            <button onClick={() => removeInstruction(instruction)}>x</button>

            <div className="change-order">
                {index !== 0 && 
                    <button onClick={ () => moveUp(index) }>
                        ↑
                    </button> 
                }

                {instruction !== instructions[instructions.length - 1] && 
                    <button onClick={ () => moveDown(index) } >
                        ↓
                    </button> }
            </div>
            
        </div>
    ))

    return (
        <div className="instructions-box-container">
            <div className="instruction-box">
                {renderedInstructions}
            </div>
        </div>
    )
}

export default InstructionList;
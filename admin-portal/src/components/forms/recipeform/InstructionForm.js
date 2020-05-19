import React, { useState } from 'react';

const InstructionForm = ({ appendInstruction }) => {
    const [ instruction, setInstruction ] = useState('');

    const addInstruction = e => {
        e.preventDefault();
        if (instruction.length === 0) {
            return alert('empty field');
        }

        appendInstruction(instruction);
        setInstruction('');
    }

    return (
        <div>
            <textarea placeholder="add an instruction..." value={ instruction }
            onChange={(e) => setInstruction(e.target.value)} 
            className="instruction"></textarea>
            <button onClick={addInstruction}>Add instruction</button>
        </div>
    )
}

export default InstructionForm;
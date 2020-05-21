import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const InstructionForm = ({ appendInstruction, instEdit }) => {
    const [ instruction, setInstruction ] = useState({
        body: '',
        id: uuidv4()
    });

    useEffect(() => {
        if (instEdit) setInstruction(instEdit)
    }, [ instEdit ])

    const addInstruction = e => {
        e.preventDefault();
        if (instruction.length === 0) {
            return alert('empty field');
        }
        if (instEdit) {
            appendInstruction(instruction, true)
        } else {
            appendInstruction(instruction);
        }
        setInstruction({
            body: '',
            id: uuidv4()
        });
    }
    
    return (
        <div className="instruction-form">
            <textarea placeholder="add an instruction..." value={ instruction.body }
            onChange={(e) => setInstruction({ ...instruction, body: e.target.value })} 
            className="instruction"></textarea>
            <button onClick={addInstruction}> { instEdit ? 'Update' : 'Add' } Instruction</button>
        </div>
    )
}

export default InstructionForm;
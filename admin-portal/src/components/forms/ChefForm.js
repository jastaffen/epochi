import React, { useState, useEffect } from 'react';

import DragandDrop from '../../utils/DragandDrop';
import FormField from './FormField';

const ChefForm = ( { from } ) => {
    const [ selectFile, setSelectFile ] = useState(null)
    const [ chef, setChef ] = useState({
        name: '',
        avatar: '',
        bio: ''
    });

    
    const handleChange = e => {
        setChef({
            ...chef,
            [e.target.name]: e.target.value
        })
    }

    console.log(chef);

    const { name, bio, avatar } = chef;
    return(
        <div>
            <FormField type="text" 
                name="name" value={name}
                handleChange={handleChange}
            />

            <FormField type="textarea" 
                name="bio" value={bio}
                handleChange={handleChange}
            />

            <FormField type="file" name="avatar" 
                handleChange={(e) => setChef({...chef, avatar: e.target.files[0]})} 
                accept=".png, .jpg, .jpeg"
            />
        
            {avatar && 
            <>
                <button onClick={() => setChef({...chef, avatar: ''})}>
                    x
                </button>
                <img src={URL.createObjectURL(avatar)} 
                    alt={'avatar preview'} 
                    className="circle-image" 
                    width="500" height="500"
                />
            </>
            }
        </div>
    )
}

export default ChefForm;
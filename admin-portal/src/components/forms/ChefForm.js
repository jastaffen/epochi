import React, { useState } from 'react';

import FormField from './FormField';

const ChefForm = ( { from } ) => {
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

            <FormField type="text" name="avatar"
            value={avatar} handleChange={handleChange} />
        </div>
    )
}

export default ChefForm;
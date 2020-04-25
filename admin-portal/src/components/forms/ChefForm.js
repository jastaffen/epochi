import React, { useState } from 'react';

import FormField from './FormField';

const ChefForm = ( { from } ) => {
    const [ chef, setChef ] = useState({
        firstName: '',
        lastName: '',
        avatar: '',
        bio: ''
    });

    const handleChange = e => {
        setChef({
            ...chef,
            [e.target.name]: e.target.value
        });
    }

    const { firstName, lastName, bio, avatar } = chef;

    const handleSubmit = e => {
        e.preventDefault();
        if ( !firstName || !lastName || !bio || !avatar ) {
            alert(`You must enter a first name, last name,
             bio and avatar`);
        } 
        const body = {
            name: `${firstName} ${lastName}`,
            bio,
            avatar
        }
    }

    return (
        <div className="chef-fields">
            <div className="initial-fields">
                {avatar ? 
                <div className="image-file">
                    <button onClick={() => setChef({...chef, avatar: ''})}>
                        x
                    </button>
                    <img src={URL.createObjectURL(avatar)} 
                        alt={'avatar preview'} 
                        className="circle-image" 
                        width="500" height="500"
                    />
                </div> :

                <FormField type="file" name="avatar" 
                    handleChange={(e) => setChef({...chef, avatar: e.target.files[0]})} 
                    accept=".png, .jpg, .jpeg"
                />
                }

                <div className="name-fields">
                    <FormField type="text" 
                        name="firstName" value={firstName}
                        handleChange={handleChange}
                    />

                    <FormField type="text" 
                        name="lastName" value={lastName}
                        handleChange={handleChange}
                    />
                </div>
            </div>
            
            <textarea name="bio" value={bio}
            rows='5' cols='33' onChange={handleChange} 
            placeholder="bio">
            </textarea>
            
            <button id='submit' onClick={handleSubmit}>
                Add New Chef
            </button>
        </div>
    )
}

export default ChefForm;
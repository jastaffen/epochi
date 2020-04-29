import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { addChef } from '../../actions/chefs';

import FormField from './FormField';

const ChefForm = ( { from, selectedChef, addChef } ) => {
    const initialState = {
        firstName: '',
        lastName: '',
        avatar: '',
        bio: ''
    }

    const [ previewAvatar, setPreviewAvatar ] = useState(false);

    const [ chef, setChef ] = useState({
        firstName: '',
        lastName: '',
        avatar: '',
        bio: ''
    });

    useEffect(() => {
        const { name, avatar, bio } = selectedChef;
        const nameArr = name.split(' ');
        if (from === 'update') {
            setChef({
                firstName: nameArr[0],
                lastName: nameArr[1],
                avatar,
                bio
            });
        }
    }, [ selectedChef ])

    const handleChange = e => {
        setChef({
            ...chef,
            [e.target.name]: e.target.value
        });
    }

    const clearAvatar = () => {
        setChef({...chef, avatar: ''});
        setPreviewAvatar(false);
    }

    const { firstName, lastName, bio, avatar } = chef;

    const handleSubmit = e => {
        e.preventDefault();
        if ( !firstName || !lastName || !bio || !avatar ) {
            alert(`You must enter a first name, last name,
             bio and avatar`);
        } 

        addChef(chef);
        setChef(initialState);
    }

    console.log(avatar);

    return (
        <div className="chef-fields">
            <div className="initial-fields">
                {avatar ? 
                <div className="image-file">
                    <button onClick={clearAvatar}>
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
                // <>
                //     <FormField type="text" name="avatar" handleChange={handleChange} />
                //     <button onClick={() => setPreviewAvatar(true)}>View Preview</button>
                // </>
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

export default connect(null, { addChef })(ChefForm);
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addChef, updateChef, deselectChef, deleteChef } from '../../actions/chefs';
import { CHEF_URL, configureImageURL } from '../../utils/imageDirectories';

import FormField from './FormField';


const ChefForm = ( { history, from, selectedChef, addChef, updateChef, 
        deselectChef, deleteChef } ) => {
    
    const form = useRef();

    const initialState = {
        firstName: '',
        lastName: '',
        avatar: '',
        bio: ''
    }

    const [ previewAvatar, setPreviewAvatar ] = useState(false);

    const [ chef, setChef ] = useState(initialState);

    useEffect(() => {
        form.current.scrollIntoView();
    }, [ ])


    useEffect(() => {
        if (selectedChef) {
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

    const handleImageDisplay = () => {
        if (from === 'update' && !previewAvatar) {
            return CHEF_URL + configureImageURL(avatar);
        } else if (from === 'update' && previewAvatar || from === 'add' && previewAvatar) {
            return URL.createObjectURL(avatar);
        } 
    }

    const { firstName, lastName, bio, avatar } = chef;

    const handleImageChange = e => {
        setChef({...chef, avatar: e.target.files[0]});
        setPreviewAvatar(true);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if ( !firstName || !lastName || !bio || !avatar ) {
            alert(`You must enter a first name, last name,
             bio and avatar`);
        } 

        if (from === 'add') {
            addChef(chef);
        } else {
            updateChef( chef, selectedChef._id );
        }        
        setChef( initialState );
        deselectChef();
        history.push('/add-chef');
    }

    const handleDelete = () => {
        deselectChef();
        deleteChef(selectedChef._id);
        history.push('/add-chef');
    }

    
    return (
        <div className="chef-fields" ref={ form } >
            <div className="initial-fields">
                { avatar ? 
                <div className="image-file">
                    <button onClick={clearAvatar}>
                        x
                    </button>
                    <img src={handleImageDisplay()} 
                        alt={'avatar preview'} 
                        className="circle-image" 
                        width="500" height="500"
                    />
                </div> :

                <FormField type="file" name="avatar" 
                    handleChange={(e) => handleImageChange(e)}
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
            
            <div className="form-btn-container">
                <button className='submit' onClick={handleSubmit}>
                    {from === 'update' ? 'Update Chef' : 'Add New Chef'}
                </button>

                { from === 'update' && (

                <button className='submit delete' onClick={handleDelete} >
                    Delete Chef
                </button>
            
                )}
            </div>
        </div>
    )
}

export default connect(null, { addChef, updateChef, 
    deselectChef, deleteChef })(withRouter(ChefForm));
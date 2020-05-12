import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';



import ImageForm from './ImageForm';
import SeasonForm from './SeasonForm';
import TypeForm from './TypeForm';
import FormField from '../FormField';

import { createIngredient, updateIngredient, deselectIngredient } from '../../../actions/ingredients';

const IngredientForm = ({ history, from, createIngredient, 
    selectedIngredient, updateIngredient, deselectIngredient }) => {
    const form = useRef();
    
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
    'September', 'October', 'November', 'December'];

    const FOOD_GROUPS = [ 'meat', 'seafood', 'vegetable', 'fruit', 
        'nut', 'seed', 'grain', 'dairy', 'green' ];

    const initialState = {
        season: [],
        name: '',
        type: '',
        image: ''
    }


    const [ previewImage, setPreviewImage ] = useState(false);
    const [ ingredient, setIngredient ] = useState(initialState);

    useEffect(() => {
        form.current.scrollIntoView();
    }, []);

    useEffect(() => {
        if (selectedIngredient) {
            const { season, name, type, image } = selectedIngredient;
            setIngredient({
                season,
                name, 
                type,
                image
            });
        }
    }, [ selectedIngredient ])

    const handleImageChange = e => {
        setIngredient({...ingredient, image: e.target.files[0]});
        setPreviewImage(true);
    }

    const clearImage = () => {
        setIngredient({
            ...ingredient,
            image: ''
        })
    }

    const handleMonthSelect = month => {
        if (!season.includes(month)) {
            setIngredient({
                ...ingredient,
                season: [...season, month]
            });
        } else {
            let months = ingredient.season;
            let seasonWOutToggledMonth = [...months].filter(m => m !== month);
            setIngredient({
                ...ingredient,
                season: seasonWOutToggledMonth
            });
        }
    }

    const handleIngredientChange = e => {
        setIngredient({
            ...ingredient,
            [e.target.name]: e.target.value
        })
    }

    const { name, image, season, type } = ingredient;
    
    const handleSubmit = () => {
        if ( !name || !image || !season || !type ) {
            return alert('all fields must be completed');
        }

        if ( from === 'add' ) {
            createIngredient(ingredient);
        } else {
            updateIngredient(ingredient, selectedIngredient._id)
        }

        setIngredient(initialState);
        deselectIngredient();
        history.push('/add-ingredient')
    }
    
    const handleDelete = () => {
        console.log('delete')
    }

    return (
        <div className="chef-fields" ref={ form }>
            <ImageForm from={from} previewImage={previewImage} image={image}
                handleImageChange={handleImageChange} clearImage={clearImage} />
            
            <div className="ing-info-fields">
                <div className="name-and-type">

                    <div>
                        <FormField type="text" value={name} name="name" 
                            handleChange={handleIngredientChange} 
                        />
                    </div>

                    <div className="type-radio-container">
                        <TypeForm FOOD_GROUPS={FOOD_GROUPS} selectedValue={type}
                            handleIngredientChange={handleIngredientChange} 
                        />
                    </div>

                </div>

                <div>
                    <SeasonForm MONTHS={MONTHS} handleMonthSelect={handleMonthSelect} 
                    season={season} />
                </div>
                
            </div>
            <div className="form-btn-container">
                <button className='submit' onClick={handleSubmit}>
                    { from === 'update' ? 'Update Ingredient' : 'Add New Ingredient'}
                </button>
                { from === 'update' && (

                <button className='submit delete' onClick={handleDelete} >
                    Delete Ingredient
                </button>

                )}
            </div>
        </div>
    )
}

export default connect(null, 
    { 
        createIngredient, updateIngredient, deselectIngredient 
    })
        ( withRouter(IngredientForm) );
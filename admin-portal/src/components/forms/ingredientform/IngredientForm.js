import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';


import ImageForm from './ImageForm';
import SeasonForm from './SeasonForm';
import TypeForm from './TypeForm';
import FormField from '../FormField';
import { createIngredient } from '../../../actions/ingredients';

const IngredientForm = ({ from }) => {
    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
    'September', 'October', 'November', 'December'];

    const FOOD_GROUPS = [ 'meat', 'seafood', 'veggie', 'fruit', 
        'nut', 'seed', 'grain', 'dairy' ];

    const initialState = {
        season: [],
        name: '',
        type: '',
        image: ''
    }


    const [ previewImage, setPreviewImage ] = useState(false);
    const [ ingredient, setIngredient ] = useState(initialState);


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
                season: [ ...season, month ]
            })
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

    

    const { name, image, _id, season, type } = ingredient;
    
    const handleSubmit = () => {
        if ( !name || !image || !season || !type ) {
            return alert('all fields must be completed');
        }

        if ( from === 'add' ) {
            createIngredient(ingredient)
        } else {
            console.log(ingredient);
        }
    }
    

    return (
        <div className="chef-fields">
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
                        <TypeForm FOOD_GROUPS={FOOD_GROUPS} 
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
                    Add New Ingredient
                </button>
            </div>
        </div>
    )
}

export default IngredientForm;
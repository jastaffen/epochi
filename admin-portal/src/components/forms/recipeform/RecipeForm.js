import React, { useState, useEffect, useRef } from 'react';

import ImageForm from '../ImageForm';
import FormField from '../FormField';
import ChefSelect from './ChefSelect';
import IngredientSelect from './IngredientSelect';

const RecipeForm = ({ from }) => {
    const form = useRef();

    const initialState = {
        title: '',
        image: '',
        ingredientId: '',
        chefId: '',
        description: '',
        instructions: [],
        ingredients: []
    }

    const [ recipe, setRecipe ] = useState(initialState);
    const [ previewImage, setPreviewImage ] = useState(false);

    const clearImage = () => {
        setRecipe({ ...recipe, image: '' });
        setPreviewImage(false);
    }

    const handleImageChange = e => {
        setRecipe({ ...recipe, image: e.target.files[0] });
        setPreviewImage(true);
    }

    const handleRecipeChange = e => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });
    }

    const setChef = chefId => {
        setRecipe({ ...recipe, chefId: chefId })
    }

    const setIngredient = ingredientId => {
        setRecipe({ ...recipe, ingredientId })
    }

    useEffect(() => {
        form.current.scrollIntoView()
    }, []);

    const { title, image, description, 
        instructions, ingredients, chefId, ingredientId } = recipe;
    
    return (
        <div className="chef-fields" ref={ form }>
            <ImageForm derived="recipe" previewImage={previewImage} 
                from={from} previewImage={previewImage} image={image}
                handleImageChange={handleImageChange} clearImage={clearImage} 
            />

            <div className="ing-info-fields">
                <div className="name-and-description">

                    <div>
                        <FormField type="text" value={title} name="title" 
                            handleChange={handleRecipeChange} 
                        />
                    </div>

                    <textarea name="description" value={description}
                        rows='5' cols='33' onChange={handleRecipeChange} 
                        placeholder="description">
                    </textarea>
                </div>

            </div>
            <div className="radio-box-forms">
                <ChefSelect chefId={chefId} setChef={setChef} />
                <IngredientSelect ingredientId={ingredientId} 
                    setIngredient={setIngredient} 
                />
            </div>
            
        </div>
    )
}

export default RecipeForm;
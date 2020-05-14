import React, { useState, useEffect, useRef } from 'react';

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

    useEffect(() => {
        form.current.scrollIntoView()
    }, []);

    return (
        <div className="chef-fields" ref={ form }>
            
        </div>
    )
}

export default RecipeForm;
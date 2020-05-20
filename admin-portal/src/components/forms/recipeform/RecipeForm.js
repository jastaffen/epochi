import React, { useState, useEffect, useRef } from 'react';

import ImageForm from '../ImageForm';
import FormField from '../FormField';
import ChefSelect from './ChefSelect';
import IngredientSelect from './IngredientSelect';
import Ingredients from './Ingredients';
import IngredientList from './IngredientList';
import InstructionForm from './InstructionForm';
import InstructionList from './InstructionList';

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
    const [ ingEdit, setIngEdit ] = useState(null);
    const [ instEdit, setInstEdit ] = useState(null);

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

    const addToIngredients = (ingredient, edit=false) => {
        if (edit) {
            let updatedIngredients = [...recipe.ingredients].map(ing => {
                if (ing.id === ingredient.id) {
                    return ingredient;
                } else {
                    return ing;
                }
            });
            setRecipe({ ...recipe, ingredients: updatedIngredients });
            setIngEdit(null);
        } else {
            setRecipe({...recipe, 
                ingredients: [...recipe.ingredients, ingredient]
            });
        }
        
    }

    const removeIngredient = ingredient => {
        const ingredientsWithoutIngredient = [...recipe.ingredients].filter(ing => ing.id !== ingredient.id);
        setRecipe({
            ...recipe,
            ingredients: ingredientsWithoutIngredient
        });
    }

    const appendInstruction = (instruction, edit=false) => {
        if (edit) {
            let instructionsWithEdit = [...recipe.instructions].map(inst => {
                return inst.id === instruction.id ? instruction : inst;
            });
            setRecipe({ ...recipe, instructions: instructionsWithEdit });
            return setInstEdit(null)
        }
        setRecipe({...recipe, instructions: [...recipe.instructions, instruction]});
    }

    const moveUp = index => {
        const copy = [...recipe.instructions];
        const instruction = copy[index];
        const prevHolder = copy[index - 1];
        copy[index - 1] = instruction;
        copy[index] = prevHolder;
        setRecipe({ ...recipe, instructions: copy })
    }

    const moveDown = index => {
        const copy = [...recipe.instructions];
        const instruction = copy[index];
        const postHolder = copy[index + 1];
        copy[index + 1] = instruction;
        copy[index] = postHolder;
        setRecipe({ ...recipe, instructions: copy });
    }

    useEffect(() => {
        form.current.scrollIntoView()
    }, []);

    const { title, image, description, 
        instructions, ingredients, chefId, ingredientId } = recipe;
    
    
    return (
        <div className="chef-fields" ref={ form }>
            <ImageForm derived="recipe" previewImage={previewImage} 
                from={from} image={image}
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
            <div className="ingredients-container">

                <IngredientList ingredients={ingredients} 
                    setIngEdit={setIngEdit} 
                    removeIngredient={removeIngredient} 
                />
                <Ingredients addToIngredients={addToIngredients} ingEdit={ingEdit} />
            </div>
            <hr id="line-break" />
            <div>
                <h3>INSTRUCTIONS</h3>
                <div className="instructions-container">  
                    <InstructionList instructions={instructions} 
                        setInstEdit={setInstEdit} moveUp={moveUp} moveDown={moveDown}
                    />
                    <InstructionForm appendInstruction={appendInstruction} instEdit={instEdit} />
                </div>
                
            </div>
        </div>
    )
}

export default RecipeForm;
import { GET_ALL_RECIPES, RECIPE_ERROR, 
    RECIPE_LOADING, CREATE_RECIPE, SELECT_RECIPE } from './types';
import axios from 'axios';

export const getAllRecipes = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5400/api/recipes/minimal');
        dispatch({
            type: GET_ALL_RECIPES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: RECIPE_ERROR,
            payload: err
        });
    }
}

export const createRecipe = recipe => async dispatch => {
    const { title, description, image, 
        ingredientId, chefId, instructions, ingredients } = recipe;
    
    const instArr = instructions.map(inst => inst.body);
    const ingsArr = [];
    ingredients.map(ing => {
        const { name, quanity, unit, additionalNotes } = ing;
        ingsArr.push({ name, quanity, unit, additionalNotes });
    })
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', image);
    fd.append('instructions', instArr);
    fd.append('ingredients', JSON.stringify(ingsArr));
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "*/*"
          }
    }
    try {
        const res = await axios
            .post(`http://localhost:5400/api/recipes/${chefId}/${ingredientId}`, fd, config);
        debugger;
        dispatch({
            type: CREATE_RECIPE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: RECIPE_ERROR,
            payload: err
        });
    }
}

export const selectRecipe = id => async dispatch => {
    try {
        dispatch({
            type: RECIPE_LOADING
        });
        const res = await axios.get(`http://localhost:5400/api/recipes/${id}`);
        dispatch({
            type: SELECT_RECIPE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: RECIPE_ERROR,
            payload: err
        });
    }
}


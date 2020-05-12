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
    const fd = new FormData();
    for (let key in recipe) {
        fd.append(key, recipe[key]);
    }
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "*/*"
          }
    }
    try {
        const res = await axios
            .post('http://localhost:5400/api/recipes', fd, config);
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


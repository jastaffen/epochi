import { GET_ALL_INGREDIENTS, INGREDIENTS_LOADING, INGREDIENT_ERROR, CREATE_INGREDIENT, SELECT_INGREDIENT, PATCH_INGREDIENT, DESELECT_INGREDIENT, DELETE_INGREDIENT } from './types';
import axios from 'axios';

export const getAllIngredients = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5400/api/ingredients');
        dispatch({
            type: GET_ALL_INGREDIENTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: INGREDIENT_ERROR,
            payload: err.message
        });
    }
}

export const createIngredient = ingredient => async dispatch => {
    const fd = new FormData();
    const { name, type, season, image } = ingredient;
    fd.append('type', type);
    fd.append('name', name);
    fd.append('season', season);
    fd.append('image', image);
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "*/*"
          }
    }
    try {
        const res = await axios
            .post('http://localhost:5400/api/ingredients', fd, config);
        dispatch({
            type: CREATE_INGREDIENT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: INGREDIENT_ERROR,
            payload: err
        });
    }
}

export const selectIngredient = ingredientId => async dispatch => {
    try {
        dispatch({
            type: INGREDIENTS_LOADING
        });
        const res = await axios
            .get(`http://localhost:5400/api/ingredients/ingredient/${ingredientId}`);
        dispatch({
            type: SELECT_INGREDIENT,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: INGREDIENT_ERROR,
            payload: err
        })
    }
}

export const updateIngredient = (ingredient, id) => async dispatch => {
    const fd = new FormData();
    const { name, season, type, image } = ingredient;
    fd.append('name', name);
    fd.append('type', type);
    fd.append('season', season);
    fd.append('image', image);
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "*/*"
          }
    }
    try {
        dispatch({
            type: INGREDIENTS_LOADING
        });
        const res = await axios
            .patch(`http://localhost:5400/api/ingredients/edit-ingredient/${id}`, 
                fd, config);
        dispatch({
            type: PATCH_INGREDIENT,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: INGREDIENT_ERROR,
            payload: err
        });
    }
}

export const deselectIngredient = () => dispatch => {
    dispatch({ type: DESELECT_INGREDIENT })
}

export const deleteIngredient = id => async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5400/api/ingredients/${id}`);
        dispatch({
            type: DELETE_INGREDIENT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: INGREDIENT_ERROR,
            payload: err
        });
    }
}
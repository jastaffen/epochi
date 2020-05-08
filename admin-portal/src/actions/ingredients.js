import { GET_ALL_INGREDIENTS, INGREDIENTS_LOADING, INGREDIENT_ERROR, CREATE_INGREDIENT } from './types';
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
    debugger;
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
    debugger;
    try {
        const res = await axios
            .post('http://localhost:5400/api/ingredients', fd, config);
        debugger;
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
import { GET_ALL_INGREDIENTS, INGREDIENTS_LOADING, INGREDIENT_ERROR } from './types';
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
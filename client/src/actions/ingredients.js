import axios from 'axios';
import { GET_INGREDIENTS_BY_MONTH, INGREDIENT_ERROR } from './types';

// GET INGREDIENTS BY MONTH
export const getIngredientsByMonth = ( month ) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5400/api/ingredients/${month}`);

        dispatch({
            type: GET_INGREDIENTS_BY_MONTH,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: INGREDIENT_ERROR,
            payload: err.message
        });
    }
}
import axios from 'axios';
import { GET_RECIPES_BY_MONTH, RECIPE_ERROR } from '../actions/types';

import { formatMonth } from '../utils/dateTime';

export const getRecipesByMonth = () => async dispatch => {

    const month = formatMonth();
    
    try {
        const res = await axios.get(`http://localhost:5400/api/recipes/recipes-by-month/${month}`);

        dispatch({
            type: GET_RECIPES_BY_MONTH,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: RECIPE_ERROR,
            payload: err.message
        });
    }
};
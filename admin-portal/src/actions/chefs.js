import { GET_ALL_CHEFS, CHEF_ERROR } from './types';

import axios from 'axios';

export const getAllChefs = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5400/api/chefs');

        dispatch({
            type: GET_ALL_CHEFS,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: CHEF_ERROR,
            payload: err.message
        })
    }
}
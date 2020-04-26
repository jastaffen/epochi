import { GET_ALL_CHEFS, CHEF_ERROR, CREATE_CHEF } from './types';

import axios from 'axios';

import { formatChefBody } from '../utils/formatChefBody';

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

export const addChef = chef => async dispatch => {
    const body = formatChefBody(chef);
    try {
        const res = await axios.post('http://localhost:5400/api/chefs', body);
        dispatch({
            type: CREATE_CHEF,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: CHEF_ERROR,
            payload: err
        });
    }
}
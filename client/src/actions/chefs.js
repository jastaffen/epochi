import axios from 'axios';
import { GET_ALL_CHEFS, GET_CHEF, CHEF_ERROR } from './types';

export const getAllChefs = () => async dispatch => {
    try {
        let res = await axios.get('http://localhost:5400/api/chefs');

        dispatch({
            type: GET_ALL_CHEFS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: CHEF_ERROR,
            payload: err.message
        })
    }
}

export const getChef = (id) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5400/api/chefs/${id}`)
        dispatch({
            type: GET_CHEF,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: CHEF_ERROR,
            payload: err.message
        })
    }
}
import { GET_ALL_CHEFS, CHEF_ERROR, CREATE_CHEF, SELECT_CHEF } from './types';

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
    const fd = new FormData();
    const body = formatChefBody(chef);
    fd.append('body', body);
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
            "type": "formData"
          }
    }
    try {
        const res = await axios
            .post('http://localhost:5400/api/chefs', fd, config);
            
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

export const selectChef = id => dispatch => {
    dispatch({
        type: SELECT_CHEF,
        payload: id
    });
}
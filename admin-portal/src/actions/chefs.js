import { GET_ALL_CHEFS, CHEF_ERROR, CREATE_CHEF, SELECT_CHEF, 
    SET_LOADING, PATCH_CHEF, DESELECT_CHEF, DELETE_CHEF } from './types';

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
    const { name, bio, avatar } = body;
    fd.append('name', name);
    fd.append('bio', bio);
    fd.append('avatar', avatar);
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "*/*"
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

export const updateChef = (chef, id) => async dispatch => {
    const fd = new FormData();
    const body = formatChefBody(chef);
    const { name, bio, avatar } = body;
    fd.append('name', name);
    fd.append('bio', bio);
    fd.append('avatar', avatar);
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "*/*"
          }
    }
    try {
        const res = await axios
            .patch(`http://localhost:5400/api/chefs/${id}`, fd, config);
        dispatch({
            type: PATCH_CHEF,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: CHEF_ERROR,
            payload: err
        });
    }
}

export const selectChef = id => async dispatch => {
    dispatch({
        type: SET_LOADING
    })
    try {
        const res = await axios.get(`http://localhost:5400/api/chefs/${id}`);

        dispatch({
            type: SELECT_CHEF,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: CHEF_ERROR,
            payload: err
        })
    }    
}

export const deselectChef = () => dispatch => {
    dispatch({
        type: DESELECT_CHEF
    });
}

export const deleteChef = id => async dispatch => {
    if (window.confirm('Are you sure you want to delete? Deletion is permanent.')) {
        try {
            const deletedChef = await axios.delete(`http://localhost:5400/api/chefs/${id}`);
            dispatch({
                type: DELETE_CHEF,
                payload: deletedChef
            });
        } catch (err) {
            dispatch({
                type: CHEF_ERROR,
                payload: err.message
            });
        }
    }
    
}
import { GET_ALL_CHEFS, GET_CHEF, CHEF_ERROR } from '../actions/types';
import { stat } from 'fs';

const initialState = {
    allChefs: [],
    chefsByIngredient: [],
    selectedChef: {},
    selectedChefRecipes: [],
    selectedChefIngredients: [],
    loading: true,
    error: []
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_ALL_CHEFS: 
            return {
                ...state,
                allChefs: payload,
                loading: false
            }

        case GET_CHEF:
            return {
                ...state,
                selectedChef: payload,
                loading: false
            }

        case CHEF_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default: 
            return state
    }
}
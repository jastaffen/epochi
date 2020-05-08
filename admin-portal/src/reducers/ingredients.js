import { GET_ALL_INGREDIENTS, INGREDIENTS_LOADING, INGREDIENT_ERROR } from '../actions/types';

const initialState = {
    allIngredients: [],
    selectedIngredient: {},
    loading: true,
    error: ''
}

export default function( state = initialState, action ) {
    const { type, payload } = action;
    switch(type) {
        case GET_ALL_INGREDIENTS: 
            return {
                ...state,
                allIngredients: payload,
                loading: false
            }

        case INGREDIENTS_LOADING:
            return {
                ...state,
                loading: true
            }

        case INGREDIENT_ERROR: 
            return {
                ...state,
                error: payload,
                loading: false
            }
        
        default: 
            return state
    }
}
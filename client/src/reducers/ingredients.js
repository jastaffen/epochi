import { GET_INGREDIENTS_BY_MONTH, INGREDIENT_ERROR } from '../actions/types';

const initialState = {
    ingredientsByMonth: [],
    ingredientsByChef: [],
    selectedRecipeIngredient: {},
    loading: true,
    error: ''
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch( type ) {

        case GET_INGREDIENTS_BY_MONTH:
            return {
                ...state,
                loading: false,
                ingredientsByMonth: payload
            }

        case INGREDIENT_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
            
        default: 
            return state
    }
}
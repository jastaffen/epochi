import { GET_RECIPES_BY_MONTH, RECIPE_ERROR } from '../actions/types';

const initialState = {
    recipesOfTheMonth: [],
    recipesByChef: [],
    recipesByIngredient: [],
    recipe: {},
    loading: true,
    error: ''
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case GET_RECIPES_BY_MONTH:
            return {
                ...state,
                recipesOfTheMonth: payload,
                loading: false
            }
        case RECIPE_ERROR: 
            return {
                ...state,
                error: payload,
                loading: false
            }
        default: 
            return state
    }
}
import { GET_RECIPES_BY_MONTH, RECIPE_ERROR, GET_RECIPES_BY_CHEF, GET_RECIPES_BY_INGREDIENT, GET_RECIPE_BY_ID } from '../actions/types';

const initialState = {
    recipesOfTheMonth: [],
    recipesByChef: [],
    recipesByIngredient: [],
    selectedRecipe: {},
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

        case GET_RECIPES_BY_CHEF: 
            return {
                ...state,
                recipesByChef: payload,
                loading: false
            }
        
        case GET_RECIPES_BY_INGREDIENT:
            return {
                ...state,
                loading: false,
                recipesByIngredient: payload
            }
        
        case GET_RECIPE_BY_ID:
            return {
                ...state,
                loading: false,
                selectedRecipe: payload
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
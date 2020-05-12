import { GET_ALL_RECIPES, RECIPE_ERROR, RECIPE_LOADING, SELECT_RECIPE, PATCH_RECIPE, DESELECT_RECIPE, DELETE_RECIPE } from '../actions/types';

const initialState = {
    allRecipes: [],
    selectedRecipe: {},
    loading: true,
    error: ''
}

export default function( state = initialState, action ) {
    const { type, payload } = action;
    switch(type) {
        case GET_ALL_RECIPES:
            return {
                ...state,
                allRecipes: payload,
                loading: false
            }
        
        case SELECT_RECIPE:
            return {
                ...state,
                selectedRecipe: payload,
                loading: true
            }
        
        case PATCH_RECIPE:
            const allRecipesWithUpdated = [...state.allRecipes]
                .map(recipe => {
                    return recipe._id === payload._id ? payload : recipe
                });
            return {
                ...state,
                allRecipes: allRecipesWithUpdated
            }
        
        case DESELECT_RECIPE:
            return {
                ...state,
                selectedRecipe: {}
            }

        case DELETE_RECIPE:
            const allRecipesWithoutDeleted = [...state.allRecipes]
                .filter(recipe => recipe._id !== payload._id);
            return {
                ...state,
                allRecipes: allRecipesWithoutDeleted
            }

        case RECIPE_LOADING:
            return {
                ...state,
                loading: true
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
import axios from 'axios';
import { GET_RECIPES_BY_MONTH, RECIPE_ERROR, GET_RECIPES_BY_CHEF, GET_RECIPES_BY_INGREDIENT, GET_RECIPE_BY_ID } from '../actions/types';


export const getRecipesByMonth = (month) => async dispatch => {
    
    try {
        const res = await axios.get(`http://localhost:5400/api/recipes/recipes-by-month/${month}`);

        dispatch({
            type: GET_RECIPES_BY_MONTH,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: RECIPE_ERROR,
            payload: err.message
        });
    }
};

// get chef's recipes
export const getChefsRecipes = (id) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5400/api/chefs/${id}/recipes`);

        dispatch({
            type: GET_RECIPES_BY_CHEF,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: RECIPE_ERROR,
            payload: err.message
        });
    }
}

export const getRecipesByIngredient = (ingredientId) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5400/api/ingredients/recipes/${ingredientId}`);

        dispatch({
            type: GET_RECIPES_BY_INGREDIENT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: RECIPE_ERROR,
            payload: err.message
        });
    }
}

export const getRecipeById = recipeId => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5400/api/recipes/${recipeId}/`);
        
        dispatch({
            type: GET_RECIPE_BY_ID,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: RECIPE_ERROR,
            payload: err.message
        });
    }
}
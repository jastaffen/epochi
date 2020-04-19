import { combineReducers } from 'redux';


import alerts from './alerts';
import chefs from './chefs';
import ingredients from './ingredients';
import recipes from './recipes';

export default combineReducers({
    alerts,
    chefs, 
    ingredients,
    recipes
})
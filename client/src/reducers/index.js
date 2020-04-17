import { combineReducers } from 'redux';

import alerts from './alerts'
import recipes from './recipes'
import chefs from './chefs';
import ingredients from './ingredients';

export default combineReducers({
    alerts,
    recipes,
    chefs,
    ingredients
})
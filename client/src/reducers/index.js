import { combineReducers } from 'redux';

import alerts from './alerts'
import recipes from './recipes'
import chefs from './chefs';

export default combineReducers({
    alerts,
    recipes,
    chefs
})
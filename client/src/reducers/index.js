import { combineReducers } from 'redux';

import alerts from './alerts'
import recipes from './recipes'

export default combineReducers({
    alerts,
    recipes
})
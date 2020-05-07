import { GET_ALL_CHEFS, CREATE_CHEF, PATCH_CHEF, SELECT_CHEF, 
    DELETE_CHEF, CHEF_ERROR, SET_LOADING, DESELECT_CHEF } from '../actions/types';

const initialState = {
    allChefs: [],
    selectedChef: {},
    loading: true,
    errors: []
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch(type) {

        case GET_ALL_CHEFS:
            return {
                ...state,
                allChefs: payload,
                loading: false
            }
        
        case CREATE_CHEF:
            return {
                ...state,
                allChefs: [...state.allChefs, payload],
                loading: false
            }
        
        case SELECT_CHEF: 
            return {
                ...state,
                selectedChef: payload,
                loading: false
            }

        case DESELECT_CHEF: 
            return {
                ...state,
                selectedChef: null
            }
            
        case PATCH_CHEF:
            const chefsWithUpdated = [...state.allChefs].map(chef => {
                return chef._id === payload._id ? payload : chef;
            });

            return {
                ...state,
                allChefs: chefsWithUpdated,
                loading: false
            }
            
        case DELETE_CHEF:
            const chefsWithoutPayload = 
                [...state.allChefs].filter(chef => chef._id !== payload._id);
            
            return {
                ...state,
                allChefs: chefsWithoutPayload,
                loading: false
            }
        
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        
        case CHEF_ERROR:
            return {
                ...state,
                errors: payload
            }

        default: 
            return state
    }
}
import {ADD_VOCALIST} from '../actions/types';
    
const vocalistState = {
    vocalist: {}
}

export default function(state = vocalistState, action) {
    switch(action.type) {
        case ADD_VOCALIST:
        return {
            ...state,
            vocalist: action.payload,
        }
        default:
            return vocalistState;
    }
}



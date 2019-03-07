import { POPULATE_NAMES } from '../../redux/types';
    
const sortVocalist = {
    names: [],
}

export default function(state = sortVocalist, action) {
    switch(action.type) {
        case POPULATE_NAMES:
            return {
                ...state,
                names: action.payload,
            }
        default:
            return state;
    }
}



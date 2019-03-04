import { POPULATE_NAMES } from '../../redux/types';
    
const filterVocalist = {
    names: [],
}

export default function(state = filterVocalist, action) {
    switch(action.type) {
        case POPULATE_NAMES:
            return {
                ...state,
                names: action.payload,
            }
        default:
            return filterVocalist;
    }
}



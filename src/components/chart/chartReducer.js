import { GET_NAMES, GET_GENDERS, GET_HIGHEST_NOTES, GET_LOWEST_NOTES } from '../../redux/types';
    
const chartState = {
    names: [],
    genders: [],
    highestNotes: [],
    lowestNotes: []
}

export default function(state = chartState, action) {
    switch(action.type) {
        case GET_NAMES:
            return {
                ...state,
                names: action.payload,
        }
        case GET_GENDERS:
            return {
                ...state,
                genders: action.payload,
        }
        case GET_HIGHEST_NOTES:
            return {
                ...state,
                highestNotes: action.payload,
            }
        case GET_LOWEST_NOTES:
            return {
                ...state,
                lowestNotes: action.payload,
            }
        default:
            return chartState;
    }
}



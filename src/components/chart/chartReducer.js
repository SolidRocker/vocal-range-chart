import { GET_NAMES, GET_GENDERS, GET_HIGHEST_NOTES, GET_LOWEST_NOTES, ADD_TO_CHART, POST_CHANGE } from '../../redux/types';
    
const chartState = {
    names: [],
    genders: [],
    highestNotes: [],
    lowestNotes: [],
    newTrigger: false
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
        case ADD_TO_CHART:
        console.log("R: " + action.payload_gender);
            return {
                ...state,
                names: action.payload_name,
                genders: action.payload_gender,
                highestNotes: action.payload_highestNote,
                lowestNotes: action.payload_lowestNote,
                newTrigger: action.payload_trigger
                /*names: [...state.names, action.payload_name],
                genders: [...state.genders, action.payload_gender],
                highestNotes: [...state.highestNotes, action.payload_highestNote],
                lowestNotes: [...state.lowestNotes, action.payload_lowestNote]*/
            }
        case POST_CHANGE:
            return {
                ...state,
                newTrigger: action.payload_trigger
        }
        default:
            return chartState;
    }
}



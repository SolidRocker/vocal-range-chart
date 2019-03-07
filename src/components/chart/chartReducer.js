import {
    ADD_TO_CHART,
    POST_CHANGE,
    REMOVE_FROM_CHART,
    POST_REMOVE_CHANGE } from '../../redux/types';
    
const chartState = {
    vocalists: [],
    newTrigger: false,
    removeTrigger: false,
    currentEntryCount: 0
}

export default function(state = chartState, action) {
    switch(action.type) {
        case ADD_TO_CHART:
            return {
                ...state,
                newTrigger: action.payload_trigger,
                vocalists: [...state.vocalists, action.payload],
                currentEntryCount: state.currentEntryCount + 1
            }
         case REMOVE_FROM_CHART:
            return {
                removeTrigger: action.payload_trigger,
                vocalists: [
                    ...state.vocalists.slice(0, action.payload_id),
                    ...state.vocalists.slice(action.payload_id+1)
                ],
                currentEntryCount: state.currentEntryCount - 1
            }

        case POST_CHANGE:
            return {
                ...state,
                newTrigger: action.payload_trigger
        }

        case POST_REMOVE_CHANGE:
            return {
                ...state,
                removeTrigger: action.payload_trigger
            }
        default:
            return state;
    }
}



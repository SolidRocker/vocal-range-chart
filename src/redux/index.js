import { combineReducers } from 'redux';
import chartReducer from '../components/chart/chartReducer';
import sortVocalistReducer from '../components/sortVocalist/sortVocalistReducer';
import createVocalistReducer from '../components/createVocalist/createVocalistReducer';

export default combineReducers({
    chart: chartReducer,
    sortVocalist: sortVocalistReducer,
    createVocalist: createVocalistReducer
})
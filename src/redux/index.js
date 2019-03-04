import { combineReducers } from 'redux';
import chartReducer from '../components/chart/chartReducer';
import filterVocalistReducer from '../components/filterVocalist/filterVocalistReducer';
import createVocalistReducer from '../components/createVocalist/createVocalistReducer';

export default combineReducers({
    chart: chartReducer,
    filterVocalist: filterVocalistReducer,
    createVocalist: createVocalistReducer
})
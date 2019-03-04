import { combineReducers } from 'redux';
import chartReducer from '../components/chart/chartReducer';
import filterVocalistReducer from '../components/filterVocalist/filterVocalistReducer';

export default combineReducers({
    chart: chartReducer,
    filterVocalist: filterVocalistReducer
})
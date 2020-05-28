import { combineReducers } from 'redux';
import ingredientsReducer from './ingredients';

const appReducer = combineReducers({
    ingredients: ingredientsReducer,
});

export default appReducer;

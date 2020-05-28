import * as actionTypes from '../action/types';
import { updateObject } from './utility';
import _ from "lodash";
import { reOrder } from '../../helper/reOrderHelper';

const initialState = {
    allIngredients: [],
    oldIndex: undefined,
    newIndex: undefined,
    error: false,
    loading: false

};

const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INGREDIENT_POPULATE_START: return populateIngredientsStart(state, action);
        case actionTypes.INGREDIENT_POPULATE_SUCCESS: return populateIngredientsSuccess(state, action);
        case actionTypes.INGREDIENT_POPULATE_FAIL: return populateIngredientsFail(state, action);
        case actionTypes.INGREDIENT_MOVE_START: return moveIngredientsStart(state, action);
        case actionTypes.INGREDIENT_MOVE_SUCCESS: return moveIngredientsSuccess(state, action);
        case actionTypes.INGREDIENT_MOVE_FAIL: return moveIngredientsFail(state, action);
        case actionTypes.INGREDIENT_ADD_START: return addIngredientsStart(state, action);
        case actionTypes.INGREDIENT_ADD_SUCCESS: return addIngredientsSuccess(state, action);
        case actionTypes.INGREDIENT_ADD_FAIL: return addIngredientsFail(state, action);
        default:
            return state;
    }
};

const addIngredientsStart = (state, action) => {
    const updatedState = {
        error: false,
        loading: true
    }
    return updateObject(state, updatedState);
}

const addIngredientsSuccess = (state, action) => {
    const updatedState = {
        allIngredients: [action.ingredient, ...state.allIngredients],
        error: false,
        loading: false
    }
    //updatedState = { allIngredients: { ...state.allIngredients[1].prev, ...action.ingredient.refId } }
    return updateObject(state, updatedState);
}

const addIngredientsFail = (state, action) => {
    const updatedState = {
        error: true,
        loading: false
    }
    return updateObject(state, updatedState);
}

const moveIngredientsStart = (state, action) => {
    let newList = reOrder(state.allIngredients, action.from, action.to);
    const updatedState = {
        allIngredients: newList,
        oldIndex: action.from,
        newIndex: action.to,
        error: false,
        loading: true
    }
    return updateObject(state, updatedState);
}

const moveIngredientsSuccess = (state, action) => {
    const updatedState = {
        oldIndex: undefined,
        newIndex: undefined,
        error: false,
        loading: false
    }
    return updateObject(state, updatedState);
}

const moveIngredientsFail = (state, action) => {
    let newList = reOrder(state.allIngredients, state.newIndex, state.oldIndex);
    const updatedState = {
        allIngredients: newList,
        oldIndex: undefined,
        newIndex: undefined,
        error: true,
        loading: false
    }
    return updateObject(state, updatedState);
}

const populateIngredientsStart = (state, action) => {
    const updatedState = {
        allIngredients: [],
        error: false,
        loading: true
    }
    return updateObject(state, updatedState);
}

const populateIngredientsSuccess = (state, action) => {
    const updatedState = {
        allIngredients: action.ingredients,
        error: false
    }
    return updateObject(state, updatedState);
}

const populateIngredientsFail = (state) => {
    return updateObject(state, { error: true });
};

export default ingredientsReducer;
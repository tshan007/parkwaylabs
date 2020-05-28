import { put, select } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../action";
import * as selectors from "../selector";

export function* populateIngredientsSaga(action) {
    yield put(actions.populateIngredientsStart());
    try {
        const response = yield axios.get(
            "http://localhost:3003/ingredients/all",
        );
        yield put(actions.populateIngredientsSuccess(response.data));
    } catch (error) {
        yield put(actions.populateIngredientsFail());
    }
}

export function* addIngredientsSaga(action) {
    let newIngredient = {
        name: action.ingredientName,
    }
    yield put(actions.addIngredientStart());
    try {
        const response = yield axios.post(
            "http://localhost:3003/ingredients/add",
            newIngredient
        );
        yield put(actions.addIngredientSuccess(response.data));
    } catch (error) {
        yield put(actions.addIngredientFail());
    }
}

export function* moveIngredientsSaga(action) {
    const ingredients = yield select(selectors.allIngredients);
    let payload = {
        from: ingredients[action.from],
        to: ingredients[action.to],
        optUp: action.from > action.to
    }

    yield put(actions.moveIngredientsStart(action.from, action.to));
    try {
        yield axios.post(
            "http://localhost:3003/ingredients/move",
            payload
        );
        yield put(actions.moveIngredientsSuccess());
    } catch (error) {
        yield put(actions.moveIngredientsFail());
    }
}

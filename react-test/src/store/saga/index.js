import { takeEvery, all } from "redux-saga/effects";
import * as actions from "../action/types";
import {
  populateIngredientsSaga,
  moveIngredientsSaga,
  addIngredientsSaga
} from "./ingredients";

export function* watchIngredients() {
  yield all([
    takeEvery(actions.INGREDIENT_POPULATE, populateIngredientsSaga),
    takeEvery(actions.INGREDIENT_MOVE, moveIngredientsSaga),
    takeEvery(actions.INGREDIENT_ADD, addIngredientsSaga)
  ]);
}


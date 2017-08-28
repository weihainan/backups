import {takeLatest, takeEvery} from 'redux-saga/effects';
import {loginUserAsync, validToken} from './admin';
import {applesList, pickApple, eatApple} from './apple';
import {
    chargesList,
    addCharge,
    getChargesLabels,
    deleteCharge,
    getYearAndMonth,
    deleteLabel,
    addLabel,
    statistics,
} from './charge';
import {addTodo, deleteTodo, completeTodo, fetchTodos} from './todo'
import {LOGIN_ADMIN, VALID_TOKEN} from '../actions/AdminAction';
import {FETCH_APPLES, PICK_APPLE, EAT_APPLE} from '../actions/AppleAction';
import {FETCH_TODOS_REQUEST, ADD_TODO_REQUEST, DELETE_TODO_REQUEST, COMPLETE_TODO_REQUEST} from '../actions/TodoAction';
import {
    FETCH_CHARGES,
    ADD_CHARGES,
    FETCH_CHARGES_LABEL,
    DELETE_CHARGES,
    FETCH_YEARANDMONTH,
    DELETE_CHARGES_LABEL,
    ADD_CHARGES_LABEL,
    CHARGES_STATISTICS,
} from '../actions/ChargeAction';

export default function* rootSaga() {
    yield takeLatest(LOGIN_ADMIN, mapPayload(loginUserAsync))
    yield takeEvery(VALID_TOKEN, mapPayload(validToken))

    yield takeEvery(FETCH_APPLES, mapPayload(applesList))
    yield takeEvery(PICK_APPLE, mapPayload(pickApple))
    yield takeEvery(EAT_APPLE, mapPayload(eatApple))

    yield takeEvery(FETCH_CHARGES, mapPayload(chargesList))
    yield takeEvery(ADD_CHARGES, mapPayload(addCharge))
    yield takeEvery(DELETE_CHARGES, mapPayload(deleteCharge))

    yield takeEvery(FETCH_CHARGES_LABEL, mapPayload(getChargesLabels))
    yield takeEvery(DELETE_CHARGES_LABEL, mapPayload(deleteLabel))
    yield takeEvery(ADD_CHARGES_LABEL, mapPayload(addLabel))

    yield takeEvery(FETCH_YEARANDMONTH, mapPayload(getYearAndMonth))
    yield takeEvery(CHARGES_STATISTICS, mapPayload(statistics))

    yield takeEvery(FETCH_TODOS_REQUEST, mapPayload(fetchTodos))
    yield takeEvery(COMPLETE_TODO_REQUEST, mapPayload(completeTodo))
    yield takeEvery(DELETE_TODO_REQUEST, mapPayload(deleteTodo))
    yield takeEvery(ADD_TODO_REQUEST, mapPayload(addTodo))
}


/**
 * 提取action.payload
 * saga层直接接触参数,便于saga复用
 * @param func
 * @returns {mapFunc}
 */
function mapPayload(func) {
    return function* mapFunc(action) {
        return yield func.call(this, action.payload)
    }
}
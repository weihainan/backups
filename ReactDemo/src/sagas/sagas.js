import { takeLatest, takeEvery } from 'redux-saga/effects';
import { loginUserAsync } from './admin';
import { applesList, pickApple, eatApple } from './apple';
import { chargesList, addCharge } from './charge';
import { LOGIN_ADMIN } from '../actions/AdminAction';
import { FETCH_APPLES, PICK_APPLE, EAT_APPLE } from '../actions/AppleAction';
import { FETCH_CHARGES, ADD_CHARGES } from '../actions/ChargeAction';


export default function* rootSaga() {
    yield takeLatest(LOGIN_ADMIN, mapPayload(loginUserAsync))

    yield takeEvery(FETCH_APPLES, mapPayload(applesList))
    yield takeEvery(PICK_APPLE, mapPayload(pickApple))
    yield takeEvery(EAT_APPLE, mapPayload(eatApple))

    yield takeEvery(FETCH_CHARGES, mapPayload(chargesList))
    yield takeEvery(ADD_CHARGES, mapPayload(addCharge))
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
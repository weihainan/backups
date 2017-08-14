import {select, put, call} from 'redux-saga/effects';
import * as actionTypes from '../actions/ChargeAction.js'
import chargeService from '../services/ChargeService'


export function* chargesList(body) {
    try {
        let response = yield call([chargeService, chargeService.getCharges], body)
        yield put(actionTypes.fetchChargesSuccess(response))
    } catch (err) {
        yield put(actionTypes.fetchChargesFail(err.message))
    }
}
export function* addCharge(charge) {
    try {
        let response = yield call([chargeService, chargeService.addCharge], charge)
        yield put(actionTypes.addChargesSuccess(response))
    } catch (err) {
        yield put(actionTypes.addChargesFail(err.message))
    }
}
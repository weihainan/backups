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

export function* deleteCharge(id) {
    try {
        let response = yield call([chargeService, chargeService.deleteCharge], id)
        yield put(actionTypes.deleteChargesSuccess(response))
    } catch (err) {
        yield put(actionTypes.deleteChargesFail(err.message))
    }
}

export function* getChargesLabels(params) {
    try {
        let response = yield call([chargeService, chargeService.getLabels], params)
        yield put(actionTypes.fetchChargesLabelSuccess(response))
    } catch (err) {
        yield put(actionTypes.fetchChargesLabelFail(err.message))
    }
}

export function* getYearAndMonth() {
    try {
        let response = yield call([chargeService, chargeService.yearAndMonth])
        yield put(actionTypes.fetchYearAndMonthSuccess(response))
    } catch (err) {
        yield put(actionTypes.fetchYearAndMonthFail(err.message))
    }
}
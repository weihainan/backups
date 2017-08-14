import {select, put, call} from 'redux-saga/effects';
import * as actionTypes from '../actions/AppleAction.js'
import appleService from '../services/AppleService'


export function* applesList() {
    try {
        let response = yield call([appleService, appleService.getApples])
        yield put(actionTypes.fetchApplesSuccess(response))
    } catch (err) {
        yield put(actionTypes.fetchApplesFail(err.message))
    }
}

export function* pickApple() {
    try {
        let response = yield call([appleService, appleService.pickApple])
        yield put(actionTypes.pickAppleSuccess(response))
        yield put(actionTypes.fetchApples())
    } catch (err) {
        yield put(actionTypes.pickAppleFail(err.message))
    }
}

export function* eatApple(id) {
    try {
        let response = yield call([appleService, appleService.eat], id)
        yield put(actionTypes.eatAppleSuccess(response))
        yield put(actionTypes.fetchApples())
    } catch (err) {
        yield put(actionTypes.eatAppleFail(err.message))
    }
}
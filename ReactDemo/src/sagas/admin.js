import { select, put, call } from 'redux-saga/effects';
import * as actionTypes from '../actions/AdminAction.js'
import { setItem } from '../utils/localstorageUtils';
import adminService from '../services/AdminService'


export function* loginUserAsync(user) {
    try {
        let response = yield call([adminService, adminService.login], user)
        setItem('admin', response)
        yield put(actionTypes.loginSuccessAction(response))
    } catch (err) {
        yield put(actionTypes.loginFailureAction(err.message))
    }
}

export function* validToken(token) {
    try {
        let response = yield call([adminService, adminService.valid], token)
        yield put(actionTypes.valideTokenSuccess(response))
    } catch (err) {
        yield put(actionTypes.valideTokenFail(err.message))
    }
}
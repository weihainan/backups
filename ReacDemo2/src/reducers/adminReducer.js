import {fromJS} from 'immutable';
import * as actionTypes from '../actions/AdminAction.js'
import {initAdminLoginState} from '../constants/structure.default'

const initialState = fromJS(initAdminLoginState)

export default (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.LOGIN:
            return fromJS(state)
                .set('logining', true)
                .set('errorMsg', '')
                .toJS();
        case actionTypes.LOGIN_SUCCESS:
            return fromJS(state)
                .set('logining', false)
                .set('isLoggedIn', true)
                .set('errorMsg', '')
                .toJS();
        case actionTypes.LOGIN_FAIL:
            return fromJS(state)
                .set('logining', false)
                .set('isLoggedIn', false)
                .set('errorMsg', action.payload).toJS();
    }
    return state
}
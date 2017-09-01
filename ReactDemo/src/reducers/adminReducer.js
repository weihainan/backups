import {fromJS} from 'immutable';
import * as actionTypes from '../actions/AdminAction.js'
import {initAdminLoginState} from '../constants/structure.default'

const initialState = fromJS(initAdminLoginState)

export default (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.LOGIN_ADMIN:
            return fromJS(state)
                .set('logining', true)
                .set('errorMsg', '')
                .toJS();
        case actionTypes.LOGIN_ADMIN_SUCCESS:
            return fromJS(state)
                .set('logining', false)
                .set('expired', false)
                .set('isLoggedIn', true)
                .set('errorMsg', '')
                .toJS();
        case actionTypes.LOGIN_ADMIN_FAILURE:
            return fromJS(state)
                .set('logining', false)
                .set('expired', false)
                .set('isLoggedIn', false)
                .set('errorMsg', action.payload).toJS();

        case actionTypes.VALID_TOKEN_SUCCESS: {
            if (action.payload && action.payload['state'] === 'expired') {
                return fromJS(state)
                    .set('expired', true)
                    .set('isLoggedIn', false)
                    .set('errorMsg', 'Token已经过期,请重新登陆.')
                    .toJS();
            }
            return fromJS(state).set('errorMsg', '').toJS();
        }
        case actionTypes.VALID_TOKEN_FAILURE:
            return fromJS(state)
                .set('errorMsg', action.payload).toJS();
    }
    return state
}

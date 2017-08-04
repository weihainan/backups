import {fromJS} from 'immutable';
import * as actionTypes from '../actions/AdminAction.js'

const initialState = {
    logining: false,
    errorMsg: '',
};

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
                .set('errorMsg', '')
                .toJS();
        case actionTypes.LOGIN_FAIL:
            return fromJS(state).set('logining', false).set('errorMsg', action.payload).toJS();

        default:
            return state;
    }

}
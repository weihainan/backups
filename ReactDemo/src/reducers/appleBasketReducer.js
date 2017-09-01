import {fromJS} from 'immutable';
import * as actionTypes from '../actions/AppleAction.js'
import {initApplesState} from '../constants/structure.default'
import formatMsg from '../utils/errorMsgFormat'

const initialState = fromJS(initApplesState)

export default (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_APPLES:
            return state;
        case actionTypes.FETCH_APPLES_SUCCESS:
            return fromJS(state).set('apples', action.payload).set('msg', '').toJS();
        case actionTypes.FETCH_APPLES_FAIL: {
            let msg = formatMsg(action.payload)
            return fromJS(state).set('msg', msg).toJS();
        }

        case actionTypes.PICK_APPLE:
            return state;
        case actionTypes.PICK_APPLE_SUCCESS:
            return fromJS(state).set('msg', '').toJS();
        case actionTypes.PICK_APPLE_FAIL: {
            let msg = formatMsg(action.payload)
            return fromJS(state).set('msg', msg).toJS();
        }

        case actionTypes.EAT_APPLE:
            return state;
        case actionTypes.EAT_APPLE_SUCCESS:
            return fromJS(state).set('msg', '').toJS();
        case actionTypes.EAT_APPLE_FAIL: {
            let msg = formatMsg(action.payload)
            return fromJS(state).set('msg', msg).toJS();
        }
    }
    return state
};

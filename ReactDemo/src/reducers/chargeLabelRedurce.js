import {fromJS} from 'immutable';
import {
    FETCH_CHARGES_LABEL, FETCH_CHARGES_LABEL_SUCCESS, FETCH_CHARGES_LABEL_FAIL,
} from '../actions/ChargeAction.js'
import {initChargeLableState} from '../constants/structure.default'
import formatMsg from '../utils/errorMsgFormat'

const initialState = fromJS(initChargeLableState)

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CHARGES_LABEL:
            return state;
        case FETCH_CHARGES_LABEL_SUCCESS:
            return fromJS(state).set('data', action.payload.items).toJS();
        case FETCH_CHARGES_LABEL_FAIL: {
            let msg = formatMsg(action.payload)
            return fromJS(state).set('msg', msg).toJS();
        }
        default:
            return state;
    }
    return state
};
import { fromJS } from 'immutable';
import {
    FETCH_CHARGES,
    FETCH_CHARGES_SUCCESS,
    FETCH_CHARGES_FAIL,
    DELETE_CHARGES,
    DELETE_CHARGES_SUCCESS,
    ADD_CHARGES_FAIL
} from '../actions/ChargeAction.js'
import { initChargeTableState } from '../constants/structure.default'
import formatMsg from '../utils/errorMsgFormat'

const initialState = fromJS(initChargeTableState)

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CHARGES:
            return state;
        case FETCH_CHARGES_SUCCESS:
            return fromJS(state).set('data', action.payload).set('msg', '').toJS();
        case FETCH_CHARGES_FAIL: {
            let msg = formatMsg(action.payload)
            return fromJS(state).set('msg', msg).toJS();
        }

        case DELETE_CHARGES:
            return state;
        case DELETE_CHARGES_SUCCESS:
            return state;
        case ADD_CHARGES_FAIL: {
            let msg = formatMsg(action.payload)
            return fromJS(state).set('msg', msg).toJS();
        }

        default:
            return state;
    }
    return state
};
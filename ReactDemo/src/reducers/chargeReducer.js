import {fromJS} from 'immutable';
import {
    ADD_CHARGES, ADD_CHARGES_SUCCESS, ADD_CHARGES_FAIL,
    FETCH_CHARGES, FETCH_CHARGES_SUCCESS, FETCH_CHARGES_FAIL,
    DELETE_CHARGES, DELETE_CHARGES_SUCCESS, DELETE_CHARGES_FAIL,
    FETCH_CHARGES_LABEL, FETCH_CHARGES_LABEL_SUCCESS, FETCH_CHARGES_LABEL_FAIL,
    FETCH_YEARANDMONTH, FETCH_YEARANDMONTH_SUCCESS, FETCH_YEARANDMONTH_FAIL,
    CHARGES_STATISTICS, CHARGES_STATISTICS_SUCCESS, CHARGES_STATISTICS_FAIL
} from '../actions/ChargeAction.js'
import {initChargeTableState} from '../constants/structure.default'
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

        case ADD_CHARGES:
            return state;
        case ADD_CHARGES_SUCCESS:
            return fromJS(state).set('msg', '').toJS();
        case ADD_CHARGES_FAIL: {
            let msg = formatMsg(action.payload)
            return fromJS(state).set('msg', msg).toJS();
        }

        case DELETE_CHARGES:
            return state;
        case DELETE_CHARGES_SUCCESS:
            return fromJS(state).set('msg', '').toJS();
        case DELETE_CHARGES_FAIL: {
            let msg = formatMsg(action.payload)
            return fromJS(state).set('msg', msg).toJS();
        }

        case FETCH_CHARGES_LABEL:
            return state;
        case FETCH_CHARGES_LABEL_SUCCESS:
            return fromJS(state).set('labels', action.payload.items).set('msg', '').toJS();
        case FETCH_CHARGES_LABEL_FAIL: {
            let msg = formatMsg(action.payload)
            return fromJS(state).set('msg', msg).toJS();
        }

        case FETCH_YEARANDMONTH:
            return state;
        case FETCH_YEARANDMONTH_SUCCESS:
            return fromJS(state).set('yearAndMonthes', action.payload).set('msg', '').toJS();
        case FETCH_YEARANDMONTH_FAIL: {
            let msg = formatMsg(action.payload)
            return fromJS(state).set('msg', msg).toJS();
        }

        case CHARGES_STATISTICS:
            return state;
        case CHARGES_STATISTICS_SUCCESS:
            return state;
        case CHARGES_STATISTICS_FAIL: {
            let msg = formatMsg(action.payload)
            return fromJS(state).set('msg', msg).toJS();
        }

        default:
            return state;
    }
    return state
};
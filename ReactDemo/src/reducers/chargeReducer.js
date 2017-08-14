import {fromJS} from 'immutable';
import {
    FETCH_CHARGES,
    FETCH_CHARGES_SUCCESS,
    FETCH_CHARGES_FAIL,
    ADD_CHARGES,
    ADD_CHARGES_SUCCESS,
    ADD_CHARGES_FAIL
} from '../actions/ChargeAction.js'
import {initChargeTableState} from '../constants/structure.default'

const initialState = fromJS(initChargeTableState)

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CHARGES:
            return state;
        case FETCH_CHARGES_SUCCESS:
            return fromJS(state).set('data', action.payload).toJS();
        case FETCH_CHARGES_FAIL:
            return state;

        case ADD_CHARGES:
            return state;
        case ADD_CHARGES_SUCCESS:
            return state;
        case ADD_CHARGES_FAIL:
            return state;

        default:
            return state;
    }
    return state
};
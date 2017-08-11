import {fromJS} from 'immutable';
import {FETCH_CHAERGES} from '../actions/ChargeAction.js'
import {initChargeTableState} from '../constants/structure.default'

const initialState = fromJS(initChargeTableState)

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CHAERGES:
            return fromJS(state).set('data', action.payload).toJS();
        default:
            return state;
    }
    return state
};
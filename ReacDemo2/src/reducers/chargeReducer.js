import {fromJS} from 'immutable';
import {FETCH_CHAERGES} from '../actions/ChargeAction.js'
import {initChargeTableState} from '../constants/structure.default'

const initialState = fromJS(initChargeTableState)

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
    return state
};
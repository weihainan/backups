import {fromJS} from 'immutable';
import * as actionTypes from '../actions/AppleAction.js'

const initialState = {
    isPicking: false,
    apples: []
};

export default (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.FETCH_APPLES:
            return state;
        case actionTypes.FETCH_APPLES_SUCCESS:
            return fromJS(state).set('apples', action.payload).toJS();
        case actionTypes.FETCH_APPLES_FAIL:
            return state;

        case actionTypes.PICK_APPLE:
            return fromJS(state).set('isPicking', true).toJS();
        case actionTypes.PICK_APPLE_SUCCESS:
            return fromJS(state).set('isPicking', false).toJS();
        case actionTypes.PICK_APPLE_FAIL:
            return fromJS(state).set('isPicking', false).toJS();

        case actionTypes.EAT_APPLE:
            return state;
        case actionTypes.EAT_APPLE_SUCCESS:
            return state;
        case actionTypes.EAT_APPLE_FAIL:
            return state;

        default:
            return state;
    }

};

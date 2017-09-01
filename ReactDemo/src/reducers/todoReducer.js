import {fromJS} from 'immutable';
import * as actionTypes from '../actions/TodoAction'
import {initTodoState} from '../constants/structure.default'
import formatMsg from '../utils/errorMsgFormat'

const initialState = fromJS(initTodoState)

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TODOS_SUCCESS:
            return fromJS(state).set('msg', '').set('data', action.payload).toJS();

        case actionTypes.ADD_TODO_FAILURE:
        case actionTypes.FETCH_TODOS_FAILURE:
        case actionTypes.DELETE_TODO_FAILURE:
        case actionTypes.COMPLETE_TODO_FAILURE:
            let msg = formatMsg(action.payload)
            return fromJS(state).set('msg', msg).toJS();
    }
    return state
}

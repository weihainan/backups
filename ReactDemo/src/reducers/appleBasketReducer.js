import {fromJS} from 'immutable';
import {BEGIN_PICK_APPLE, DONE_PICK_APPLE, FAIL_PICK_APPLE, EAT_APPLE} from '../actions/AppleAction'

const initialState = {
    isPicking: false,
    newAppleId: 0,
    apples: []
};

export default (state = initialState, action) => {

    switch (action.type) {

        case BEGIN_PICK_APPLE:

            /** 将isPicking设置true */
            return fromJS(state).set('isPicking', true).toJS();

        case DONE_PICK_APPLE:
            let newApple = {
                id: state.newAppleId,
                weight: action.payload,
                isEaten: false
            };

            /** 在apples中新增一个newApple， 将newAppleId增加1， 将isPicking设为false*/
            return fromJS(state).update('apples', list => list.push(newApple))
                .set('newAppleId', state.newAppleId + 1)
                .set('isPicking', false)
                .toJS();

        case FAIL_PICK_APPLE:

            /** 将isPicking设置false */
            return fromJS(state).set('isPicking', false).toJS();

        case EAT_APPLE:

            /** 将id对应索引值的数组的isEaten设为true,表示已吃*/
            return fromJS(state).setIn(['apples', action.payload, 'isEaten'], true).toJS();

        default:
            return state;
    }

};

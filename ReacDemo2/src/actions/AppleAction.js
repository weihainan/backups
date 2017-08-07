import AppleService from '../services/AppleService'

export const FETCH_APPLES = 'FETCH_APPLES';
export const FETCH_APPLES_SUCCESS = 'FETCH_APPLES_SUCCESS';
export const FETCH_APPLES_FAIL = 'FETCH_APPLES_FAIL';

export const PICK_APPLE = 'PICK_APPLE';
export const PICK_APPLE_SUCCESS = 'PICK_APPLE_SUCCESS';
export const PICK_APPLE_FAIL = 'PICK_APPLE_FAIL';

export const EAT_APPLE = 'EAT_APPLE';
export const EAT_APPLE_SUCCESS = 'EAT_APPLE_SUCCESS';
export const EAT_APPLE_FAIL = 'EAT_APPLE_FAIL';

let actions = {

    init: ()=> {
        return function (dispatch, getState) {
            AppleService.getApples().then(value => {
                dispatch(actions[FETCH_APPLES_SUCCESS](!value ? [] : value));
            });
        }
    },

    eatApple: (id)=> {
        return function (dispatch, getState) {
            AppleService.eat(id).then(value => {
                AppleService.getApples().then(value => {
                    dispatch(actions[FETCH_APPLES_SUCCESS](!value ? [] : value));
                });
            });
        }
    },

    pickApple: ()=> {
        return function (dispatch, getState) {
            /** 如果正在摘苹果，则结束这个thunk, 不执行摘苹果 */
            if (getState().appleBasket.isPicking) {
                return;
            }
            /** 通知开始摘苹果 */
            dispatch(actions[PICK_APPLE]());
            AppleService.pickApple().then(res => {
                dispatch(actions[PICK_APPLE_SUCCESS]());
                AppleService.getApples().then(value => {
                    dispatch(actions[FETCH_APPLES_SUCCESS](!value ? [] : value));
                });
            }).catch(e => {
                dispatch(actions[PICK_APPLE_FAIL](e.message));
            });
        }
    },

    [FETCH_APPLES_SUCCESS]: (list)=>({
        type: FETCH_APPLES_SUCCESS,
        payload: list
    }),

    [PICK_APPLE]: ()=> ({
        type: PICK_APPLE,
    }),
    [PICK_APPLE_SUCCESS]: ()=> ({
        type: PICK_APPLE_SUCCESS,
    }),
    [PICK_APPLE_FAIL]: ()=> ({
        type: PICK_APPLE_FAIL,
    }),
};

export default actions;
import adminService from '../services/AdminService'
import {setItem} from '../utils/localstorageUtils';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

let actions = {
    doLogin: (body)=> {
        return function (dispatch, getState) {
            dispatch(actions[LOGIN]());
            adminService.login(body).then(value => {
                setItem('admin', value);
                dispatch(actions[LOGIN_SUCCESS]());
            }).catch(e => {
                dispatch(actions[LOGIN_FAIL](e.message));
            });
        }
    },

    [LOGIN]: ()=>({
        type: LOGIN,
    }),
    [LOGIN_SUCCESS]: ()=>({
        type: LOGIN_SUCCESS,
    }),
    [LOGIN_FAIL]: (message)=>({
        type: LOGIN_FAIL,
        payload: message
    }),
}

export default actions;
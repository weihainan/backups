export const LOGIN_ADMIN = 'LOGIN_ADMIN';
export const LOGIN_ADMIN_SUCCESS = 'LOGIN_ADMIN_SUCCESS';
export const LOGIN_ADMIN_FAILURE = 'LOGIN_ADMIN_FAILURE';


export const loginAction = (admin)=>({
    type: LOGIN_ADMIN,
    payload: admin
})

export const loginSuccessAction = (admin)=>({
    type: LOGIN_ADMIN_SUCCESS,
    payload: admin
})

export const loginFailureAction = (message)=>({
    type: LOGIN_ADMIN_FAILURE,
    payload: message
})

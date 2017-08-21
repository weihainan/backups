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


export const VALID_TOKEN = 'VALID_TOKEN';
export const VALID_TOKEN_SUCCESS = 'VALID_TOKEN_SUCCESS';
export const VALID_TOKEN_FAILURE = 'VALID_TOKEN_FAILURE';


export const valideToken = (token)=>({
    type: VALID_TOKEN,
    payload: token
})

export const valideTokenSuccess = (value)=>({
    type: VALID_TOKEN_SUCCESS,
    payload: value
})

export const valideTokenFail = (message)=>({
    type: VALID_TOKEN_FAILURE,
    payload: message
})

export const initAdminLoginState = {
    logining: false,
    isLoggedIn: false,
    errorMsg: '',
}


export const initApplesState = {
    isPicking: false,
    apples: []
}


export const initialState = {
    appleBasket: initApplesState,
    adminState: initAdminLoginState
}
export const initAdminLoginState = {
    logining: false,
    isLoggedIn: false,
    errorMsg: '',
}


export const initApplesState = {
    apples: []
}

export const initChargeTableState = {
    data: {
        items: [],
        total: 0
    },
    msg:''
}


export const initialState = {
    appleBasket: initApplesState,
    adminState: initAdminLoginState,
    chargeTableState: initChargeTableState,
}
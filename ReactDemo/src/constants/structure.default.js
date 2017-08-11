export const initAdminLoginState = {
    logining: false,
    isLoggedIn: false,
    errorMsg: '',
}


export const initApplesState = {
    isPicking: false,
    apples: []
}

export const initChargeTableState = {
    data: {
        items: [],
        total: 0
    }
}


export const initialState = {
    appleBasket: initApplesState,
    adminState: initAdminLoginState,
    chargeTableState: initChargeTableState,
}
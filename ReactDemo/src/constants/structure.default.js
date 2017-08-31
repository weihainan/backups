export const initAdminLoginState = {
    logining: false,
    isLoggedIn: false,
    errorMsg: '',
    expired: false
}


export const initApplesState = {
    apples: [],
    msg: '',
}

export const initChargeTableState = {
    data: {
        items: [],
        total: 0
    },
    labels: [],
    msg: '',
    yearAndMonthes: [],
    statistics: null,
}

export const initTodoState = {
    data: {
        items: [],
        total: 0
    },
    msg: '',
}

export const initialState = {
    appleBasketState: initApplesState,
    adminState: initAdminLoginState,
    chargeTableState: initChargeTableState,
    todoState: initTodoState,
}

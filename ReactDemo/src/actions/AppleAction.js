export const FETCH_APPLES = 'FETCH_APPLES';
export const FETCH_APPLES_SUCCESS = 'FETCH_APPLES_SUCCESS';
export const FETCH_APPLES_FAIL = 'FETCH_APPLES_FAIL';

export const fetchApples =()=>({
    type: FETCH_APPLES
})

export const fetchApplesSuccess = (list)=>({
    type: FETCH_APPLES_SUCCESS,
    payload: list
})

export const fetchApplesFail = (msg)=>({
    type: FETCH_APPLES_FAIL,
    payload: msg
})


export const PICK_APPLE = 'PICK_APPLE';
export const PICK_APPLE_SUCCESS = 'PICK_APPLE_SUCCESS';
export const PICK_APPLE_FAIL = 'PICK_APPLE_FAIL';

export const pickApple =()=>({
    type: PICK_APPLE
})

export const pickAppleSuccess = (apple)=>({
    type: PICK_APPLE_SUCCESS,
    payload: apple
})

export const pickAppleFail = (msg)=>({
    type: PICK_APPLE_FAIL,
    payload: msg
})


export const EAT_APPLE = 'EAT_APPLE';
export const EAT_APPLE_SUCCESS = 'EAT_APPLE_SUCCESS';
export const EAT_APPLE_FAIL = 'EAT_APPLE_FAIL';


export const eatApple =(id)=>({
    type: EAT_APPLE  ,
    payload: id
})

export const eatAppleSuccess = (apple)=>({
    type: EAT_APPLE_SUCCESS,
    payload: apple
})

export const eatAppleFail = (msg)=>({
    type: EAT_APPLE_FAIL,
    payload: msg
})
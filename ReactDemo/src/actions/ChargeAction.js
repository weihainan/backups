export const FETCH_CHARGES = 'FETCH_CHARGES';
export const FETCH_CHARGES_SUCCESS = 'FETCH_CHARGES_SUCCESS';
export const FETCH_CHARGES_FAIL = 'FETCH_CHARGES_FAIL';

export const fetchCharges = (value)=> ({
    type: FETCH_CHARGES,
    payload: value
})

export const fetchChargesSuccess = (list)=> ({
    type: FETCH_CHARGES_SUCCESS,
    payload: list
})

export const fetchChargesFail = (msg)=> ({
    type: FETCH_CHARGES_FAIL,
    payload: msg
})


export const ADD_CHARGES = 'ADD_CHARGES';
export const ADD_CHARGES_SUCCESS = 'ADD_CHARGES_SUCCESS';
export const ADD_CHARGES_FAIL = 'ADD_CHARGES_FAIL';


export const addCharges = (value)=> ({
    type: FETCH_CHARGES,
    payload: value
})

export const addChargesSuccess = (value)=> ({
    type: FETCH_CHARGES_SUCCESS,
    payload: value
})


export const addChargesFail = (msg)=> ({
    type: FETCH_CHARGES_FAIL,
    payload: msg
})
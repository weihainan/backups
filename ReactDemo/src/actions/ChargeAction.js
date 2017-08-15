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
    type: ADD_CHARGES,
    payload: value
})

export const addChargesSuccess = (value)=> ({
    type: ADD_CHARGES_SUCCESS,
    payload: value
})

export const addChargesFail = (msg)=> ({
    type: ADD_CHARGES_FAIL,
    payload: msg
})


export const DELETE_CHARGES = 'DELETE_CHARGES';
export const DELETE_CHARGES_SUCCESS = 'DELETE_CHARGES_SUCCESS';
export const DELETE_CHARGES_FAIL = 'DELETE_CHARGES_FAIL';

export const deleteCharges = (id)=> ({
    type: DELETE_CHARGES,
    payload: id
})

export const deleteChargesSuccess = (value)=> ({
    type: DELETE_CHARGES_SUCCESS,
    payload: value
})

export const deleteChargesFail = (msg)=> ({
    type: DELETE_CHARGES_FAIL,
    payload: msg
})


export const ADD_CHARGES_LABEL = 'ADD_CHARGES_LABEL';
export const ADD_CHARGES_LABEL_SUCCESS = 'ADD_CHARGES_LABEL_SUCCESS';
export const ADD_CHARGES_LABEL_FAIL = 'ADD_CHARGES_LABEL_FAIL';

export const addChargesLabel = (value)=> ({
    type: ADD_CHARGES_LABEL,
    payload: value
})

export const addChargesLabelSuccess = (value)=> ({
    type: ADD_CHARGES_LABEL_SUCCESS,
    payload: value
})

export const addChargesLabelFail = (msg)=> ({
    type: ADD_CHARGES_LABEL_FAIL,
    payload: msg
})


export const DELETE_CHARGES_LABEL = 'DELETE_CHARGES_LABEL';
export const DELETE_CHARGES_LABEL_SUCCESS = 'DELETE_CHARGES_LABEL_SUCCESS';
export const DELETE_CHARGES_LABEL_FAIL = 'DELETE_CHARGES_LABEL_FAIL';

export const deleteChargesLabel = (id)=> ({
    type: DELETE_CHARGES_LABEL,
    payload: id
})

export const deleteChargesLabelSuccess = (value)=> ({
    type: DELETE_CHARGES_LABEL_SUCCESS,
    payload: value
})

export const deleteChargesLabelFail = (msg)=> ({
    type: DELETE_CHARGES_LABEL_FAIL,
    payload: msg
})


export const FETCH_CHARGES_LABEL = 'FETCH_CHARGES_LABEL';
export const FETCH_CHARGES_LABEL_SUCCESS = 'FETCH_CHARGES_LABEL_SUCCESS';
export const FETCH_CHARGES_LABEL_FAIL = 'FETCH_CHARGES_LABEL_FAIL';

export const fetchChargesLabel = (params)=> ({
    type: FETCH_CHARGES_LABEL,
    payload: params
})

export const fetchChargesLabelSuccess = (value)=> ({
    type: FETCH_CHARGES_LABEL_SUCCESS,
    payload: value
})

export const fetchChargesLabelFail = (msg)=> ({
    type: FETCH_CHARGES_LABEL_FAIL,
    payload: msg
})


export const FETCH_YEARANDMONTH = 'FETCH_YEARANDMONTH';
export const FETCH_YEARANDMONTH_SUCCESS = 'FETCH_YEARANDMONTH_SUCCESS';
export const FETCH_YEARANDMONTH_FAIL = 'FETCH_YEARANDMONTH_FAIL';

export const fetchYearAndMonthLabel = (params)=> ({
    type: FETCH_YEARANDMONTH,
    payload: params
})

export const fetchYearAndMonthLabelSuccess = (value)=> ({
    type: FETCH_YEARANDMONTH_SUCCESS,
    payload: value
})

export const fetchYearAndMonthLabelFail = (msg)=> ({
    type: FETCH_YEARANDMONTH_FAIL,
    payload: msg
})
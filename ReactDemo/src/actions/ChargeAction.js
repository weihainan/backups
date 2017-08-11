import ChargeService from '../services/ChargeService'

export const FETCH_CHAERGES = 'FETCH_CHAERGES';

export const chargeTableActions = {
    getCharges: (page = 0, size = 20)=> {
        let body = {
            page: page,
            size: size,
        }
        return function (dispatch, getState) {
            ChargeService.getCharges(body).then(value => {
                dispatch(chargeTableActions[FETCH_CHAERGES](!value ? {items: [], total: 0} : value));
            });
        }
    },

    [FETCH_CHAERGES]: (value)=> ({
        type: FETCH_CHAERGES,
        payload: value
    }),
};
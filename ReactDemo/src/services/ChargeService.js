import BaseService from './baseService.js'

export default new class ChargeService extends BaseService {

    getCharges(body) {
        let endPoint = `personal/charges/list`;
        return super.ufRequest({endpoint: endPoint, body: body, method: 'post', withAuthToken: true});
    }

    addCharge(body) {
        let endPoint = `personal/charges`;
        return super.ufRequest({endpoint: endPoint, body: body, method: 'post', withAuthToken: true});
    }

    deleteCharge(id) {
        let endPoint = `personal/charges/${id}`;
        return super.ufRequest({endpoint: endPoint, body: {}, method: 'delete', withAuthToken: true});
    }

    yearAndMonth() {
        let endPoint = `personal/charges/year_month`;
        return super.ufRequest({endpoint: endPoint, body: null, method: 'get', withAuthToken: true});
    }
}
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

    addLabel(body) {
        let endPoint = `personal/charge_labels`;
        return super.ufRequest({endpoint: endPoint, body: null, method: 'post', withAuthToken: true});
    }

    deleteLabel(id) {
        let endPoint = `personal/charge_labels/${id}`;
        return super.ufRequest({endpoint: endPoint, body: {}, method: 'delete', withAuthToken: true});
    }

    getLabels(body) {
        let endPoint = `personal/charge_labels`;
        return super.ufRequest({endpoint: endPoint, body: body, method: 'get', withAuthToken: false});
    }
}
import BaseService from './baseService.js'

export default new class ChargeService extends BaseService {

    getCharges(body) {
        let endPoint = `apples`;
        return super.ufRequest({endpoint: endPoint, body: body, method: 'get', withAuthToken: true});
    }

    addCharge(body) {
        let endPoint = `apples`;
        return super.ufRequest({endpoint: endPoint, body: body, method: 'get', withAuthToken: true});
    }

}
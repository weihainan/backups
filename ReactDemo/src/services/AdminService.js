import BaseService from './baseService.js'

export default new class AdminService extends BaseService {
    valid(token) {
        let endPoint = `personal/admins/valid/${token}`;
        return super.ufRequest({endpoint: endPoint, body: null, method: 'get', withAuthToken: false});
    }
}
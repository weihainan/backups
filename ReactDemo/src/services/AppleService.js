import BaseService from './baseService.js'

export default new class AppleService extends BaseService {

    getApples() {
        let endPoint = `apples`;
        return super.ufRequest({endpoint: endPoint, body: null, method: 'get', withAuthToken: true});
    }

    eat(id) {
        let endPoint = `apples/${id}`;
        return super.ufRequest({endpoint: endPoint, body: {}, method: 'post', withAuthToken: true});
    }

    pickApple() {
        let endPoint = `apples`;
        return super.ufRequest({endpoint: endPoint, body: {}, method: 'post', withAuthToken: true});
    }

}
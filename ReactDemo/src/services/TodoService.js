import BaseService from './baseService.js'

export default new class TodoService extends BaseService {
    add(body) {
        let endPoint = `personal/assignments`;
        return super.ufRequest({endpoint: endPoint, body: body, method: 'post', withAuthToken: true});
    }

    list(params) {
        let endPoint = `personal/assignments`;
        return super.ufRequest({endpoint: endPoint, body: params, method: 'get', withAuthToken: true});
    }

    complete(id) {
        let endPoint = `personal/assignments/${id}`;
        return super.ufRequest({endpoint: endPoint, body: {}, method: 'put', withAuthToken: true});
    }

    delete(id) {
        let endPoint = `personal/assignments/${id}`;
        return super.ufRequest({endpoint: endPoint, body: {}, method: 'delete', withAuthToken: true});
    }
}

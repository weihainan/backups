/**
 * Created by Administrator on 2015/12/7.
 */
import CONFIG from '../constants/config'
import auth from './auth'
import fetch from 'isomorphic-fetch'
import {camelizeKeys, decamelizeKeys} from 'humps'

export default class {

    request({apiUrl, body, method = 'get', withAuthToken = true}) {
        const _method = method.toLowerCase()
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        };

        if (withAuthToken) {
            headers['Authorization'] = auth();
        }

        let settings = {
            method: _method,
            headers
        };

        if (!['get', 'head'].includes(_method) && body) {
            // console.log(JSON.stringify(decamelizeKeys(body)))
            // settings['body'] = JSON.stringify(decamelizeKeys(body))
            settings['body'] = JSON.stringify(body)
        }

        if (_method === 'get' && body) {
            let dataStr = '';
            Object.keys(body).forEach(key => {
                dataStr += key + '=' + body[key] + '&';
            })
            if (dataStr !== '') {
                dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
                apiUrl = apiUrl + '?' + dataStr;
            }
        }

        return this.direct(apiUrl, settings, headers)
    }

    direct(apiUrl, settings, headers) {
        return fetch(apiUrl, settings).then(response => {
            let json = response.json();
            return json.then(json => {
                return {json, response}
            }).then(({json, response}) => {
                if (!response.ok) {
                    return Promise.reject(json)
                }
                // console.log(JSON.stringify(camelizeKeys(json)))
                // return camelizeKeys(json);
                return json;
            }).catch(e => {
                if (response.ok) {
                    return {}
                } else {
                    return Promise.reject(e)
                }
            })
        })
    }

    ufRequest({endpoint, body, method = 'get', withAuthToken = true}) {
        let apiUrl = `${CONFIG.api_protocol}://${CONFIG.uf.host}/${CONFIG.uf.version}/${endpoint}`
        return this.request({apiUrl, body, method, withAuthToken})
    }
}

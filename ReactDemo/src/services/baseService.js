import {Schema, arrayOf, normalize} from 'normalizr'
import {camelizeKeys} from 'humps'
import fetch from 'isomorphic-fetch'
import auth from './auth'


export default class {

    request({apiUrl, body, method = 'get', withAuthToken = false}) {
        const _method = method.toLowerCase()

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        }

        if (withAuthToken) {
            headers['Authorization'] = auth();
            console.log(auth())
        }

        let settings = {
            method: _method,
            headers: headers
        }

        if (!['get', 'head'].includes(_method) && body) {
            settings['body'] = JSON.stringify(body)
        }


        if (_method === 'get') {
            let dataStr = ''; //数据拼接字符串
            Object.keys(body).forEach(key => {
                dataStr += key + '=' + body[key] + '&';
            })

            if (dataStr !== '') {
                dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
                apiUrl = apiUrl + '?' + dataStr;
            }
        }

        return fetch(apiUrl, settings).then(response => {
            let json = response.json()
            return json.then(json => {
                return {json, response}
            }).then(({json, response}) => {
                if (!response.ok) {
                    return Promise.reject(json)
                }
                return camelizeKeys(json)
            }).catch(e => {
                if (response.ok) {
                    return {}
                } else {
                    return Promise.reject(e)
                }
            })
        })
    }
}

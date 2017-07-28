/**
 * Created by hjx on 12/14/2015.
 */
import {Observable} from 'rx-lite'
import {UNDEFINED, FUNCTION, BOOLEAN, NUMBER} from '../constants/types.js'

export const ASSEMBLED_REQUESTS = Symbol('assembled request')
export const FILTER = Symbol('filter')
export const LINK_REQUESTS_MODE = Symbol('link requests')
export const ZIP_REQUESTS_MODE = Symbol('zip requests')
export const SINGLE_REQUEST_MODE = Symbol('single request')
export const LINK_INDETERMINATE_REQUESTS_MODE = Symbol('link indeterminate requests')
export const ZIP_INDETERMINATE_REQUESTS_MODE = Symbol('zip indeterminate requests')
export const TRANSFORMER_MODE = Symbol('dynamically change flow')

export function assemble(request) {
    return {
        [ASSEMBLED_REQUESTS]: request
    }
}

export function link(...requests) {
    if (requests.length == 1 && typeof requests[0] === 'function') {
        return {
            assembleMode: LINK_INDETERMINATE_REQUESTS_MODE,
            getRequests: requests[0]
        }
    }
    return {
        assembleMode: LINK_REQUESTS_MODE,
        requests: requests
    }
}

export function zip(...requests) {
    if (requests.length == 1 && typeof requests[0] === FUNCTION) {
        return {
            assembleMode: ZIP_INDETERMINATE_REQUESTS_MODE,
            getRequests: requests[0]
        }
    }
    return {
        assembleMode: ZIP_REQUESTS_MODE,
        requests: requests
    }
}

const THROW_EXCEPTION_DEFAULT = false
const FILTER_MAP = {}

let SYNFLAG = false

function singleRequest(action, next, lastResponse = null, lastError = null) {
    const {
        assembleMode, actionTypes, inMap, service, outMap, modifyActionResponse, modifyActionError, //successActionPayload,
        onSuccess, onFailure, throwException
    } = action
    if (assembleMode !== SINGLE_REQUEST_MODE) {
        throw new Error('Expect a single request.')
    }
    if (typeof service !== FUNCTION) {
        throw new Error('Expect a function as service.')
    }
    if (!Array.isArray(actionTypes) || actionTypes.length !== 3) {
        throw new Error('Expect an array of three action types.')
    }
    const throwExcep = (typeof throwException === BOOLEAN) ? throwException : THROW_EXCEPTION_DEFAULT
    const [ requestType, successType, failureType ] = actionTypes

    let observable = Observable.just({lastResponse, lastError}).delay(0).doOnNext(() => {
        if (requestType != null) {
            next({type: requestType})
        }
    }).delay(0).map(({lastResponse, lastError}) => {
        let r = inMap ? inMap(lastResponse) : lastResponse
        return {lastResponse: r, lastError}
    }).delay(0).flatMap(({lastResponse, lastError}) => {
        return Observable.fromPromise(service(lastResponse, lastError).then(
            response => {
                return response
            },
            error => {
                throw error
            }
        ))
    }).delay(0).doOnNext((response) => {
        if (onSuccess) {
            onSuccess(response)
        }
        if (successType != null) {
            let payload = modifyActionResponse ? modifyActionResponse(response) : response
            next({type: successType, response: payload})
        }
    }).delay(0).map((response) => {
        let lastResponse = outMap ? outMap(response) : response
        return {lastResponse, lastError: null}
    }).delay(0).doOnError((err) => {
        let failureAction = 'UNIFIED_EXCEPTION_HANDLING'
        next({type: failureAction, err})
        if (onFailure) {
            onFailure(err)
        }
        if (failureType != null) {
            let errMsg = err.message || failureType
            let error = modifyActionError ? modifyActionError(errMsg) : errMsg
            next({type: failureType, error})
        }
    })

    if (!throwExcep) {
        observable = observable.catch((err) => {
            let e = err == null ? new Error('error: ' + failureType) : err
            return Observable.just({lastResponse: null, lastError: e})
        })
    }

    return observable
}

function linkRequest(requests, next, lastResponse = null, lastError = null) {
    return requests.reduce(function (preVal, curVal, index, array) {
        return preVal.delay(0).flatMap(({lastResponse, lastError}) => {
            let observable = doRequest(curVal, next, lastResponse, lastError)
            return observable
        })
    }, Observable.just({lastResponse, lastError}))
}

function zipRequest(requests, zip, next, lastResponse = null, lastError = null) {
    if (requests == null || requests.length == 0) {
        return Observable.just({lastResponse, lastError})
    }
    let observables = requests.map((request) => {
        return doRequest(request, next, lastResponse, lastError)
    })
    return Observable.zip(...observables, (...results) => {
        let ret = results.reduce((pre, cur) => {
            return {
                lastResponse: pre.lastResponse.concat(cur.lastResponse),
                lastError: pre.lastError.concat(cur.lastError)
            }
        }, {lastResponse: [], lastError: []})
        if (typeof zip === FUNCTION) {
            ret = {lastResponse: zip(ret.lastResponse, ret.lastError), lastError: null}
        }
        return ret
    })
}

function doRequest(action, next, lastResponse = null, lastError = null) {
    if (action == null) {
        return Observable.just({lastResponse: null, lastError: null})
    }
    let assembleMode = action.assembleMode
    let requests
    let zip
    switch (assembleMode) {
        case TRANSFORMER_MODE:
            // 通过结果动态定义结构
            let newAction = action.transform(lastResponse, lastError)
            return doRequest(newAction, next, lastResponse, lastError)
        case LINK_REQUESTS_MODE:
            requests = action.requests
            return linkRequest(requests, next, lastResponse, lastError)
        case LINK_INDETERMINATE_REQUESTS_MODE:
            requests = action.getRequests(lastResponse, lastError)
            return linkRequest(requests, next, lastResponse, lastError)
        case ZIP_REQUESTS_MODE:
            requests = action.requests
            zip = action.zip
            return zipRequest(requests, zip, next, lastResponse, lastError)
        case ZIP_INDETERMINATE_REQUESTS_MODE:
            requests = action.getRequests(lastResponse, lastError)
            zip = action.zip
            return zipRequest(requests, zip, next, lastResponse, lastError)
        case SINGLE_REQUEST_MODE:
            return singleRequest(action, next, lastResponse, lastError)
        default :
            return Observable.just({lastResponse: null, lastError: null})
    }
}

function stringifyParam(param) {
    return JSON.stringify(param ? param : {})
}

function filter(action) {
    const filterConfig = action[FILTER]
    if (typeof filterConfig === UNDEFINED) {
        return true
    }
    const {symbol, param, timeInterval} = filterConfig
    if (!symbol) {
        throw new Error('a symbol is required to filter requests')
    }
    let timeStamp = new Date().getTime()
    let paramstr = stringifyParam(param)
    let interval = (typeof timeInterval === NUMBER) ? timeInterval : 1000
    if (typeof FILTER_MAP[symbol] === UNDEFINED) {
        FILTER_MAP[symbol] = {}
    }
    if (typeof FILTER_MAP[symbol][paramstr] === UNDEFINED ||
        timeStamp - FILTER_MAP[symbol][paramstr] > interval) {
        FILTER_MAP[symbol][paramstr] = timeStamp
        return true
    }

    return false
}

function clearRequestTime(action) {
    const filterConfig = action[FILTER]
    if (typeof filterConfig === UNDEFINED) {
        return
    }
    const {symbol, param} = filterConfig
    if (!symbol) {
        return
    }
    let paramstr = stringifyParam(param)
    if (typeof FILTER_MAP[symbol] != UNDEFINED &&
        typeof FILTER_MAP[symbol][paramstr] != UNDEFINED) {
        delete FILTER_MAP[symbol][paramstr]
    }
}


let current = next => action => {
    if (typeof action[ASSEMBLED_REQUESTS] === UNDEFINED) {
        return next(action)
    } else if (SYNFLAG) {
        return wait2(() => current(next)(action))
    } else {
        return noWait(next)(action)
    }
}

// can't wait any longer
let noWait = next => action => {
    let synchronized = action[ASSEMBLED_REQUESTS]['synchronized'] === true
    if (synchronized) SYNFLAG = true
    Observable.just(action).delay(0).filter((action) => {
        let pass = filter(action)
        if (!pass && typeof action[FILTER].onDiscard === FUNCTION) {
            action[FILTER].onDiscard()
        }
        return pass
    }).delay(0).map((action) => {
        return action[ASSEMBLED_REQUESTS]
    }).delay(0).flatMap((request) => {
        return doRequest(request, next)
    }).subscribe(
        (x) => {
            console.log('final result: ' + x)
        },
        (e) => {
            console.log('final error: ' + e)
            clearRequestTime(action)
            if (synchronized) SYNFLAG = false
        },
        () => {
            if (synchronized) SYNFLAG = false
            console.log('completed')
        }
    )
}

export default  store => current

export function wait2(callback, interval = 20, max = 3000) {
    if (max < interval) max = interval
    let i = Math.floor(max / interval)

    function* generator(i) {
        for (; i > 0; i--) {
            let x = yield i
            if (x == 0) {
                return 'done'
            }
        }
        return 'timeout'
    }

    //http://stackoverflow.com/questions/951021/what-do-i-do-if-i-want-a-javascript-version-of-sleep
    function resume(i, generator) {
        setTimeout(() => {
            let result = generator.next(i)
            if (result.done) {
                callback()
                //console.log('goes on with service ... ')
            } else {
                if (SYNFLAG) {
                    resume(result.value, generator)
                } else {
                    resume(0, generator)
                }
            }
        }, interval)
    }

    let gen = generator(i)
    let result = gen.next()
    if (result.done) {
        callback()
    } else {
        resume(result.value, gen)
    }
}

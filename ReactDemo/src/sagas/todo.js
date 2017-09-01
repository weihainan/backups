import {select, put, call} from 'redux-saga/effects';
import * as actionTypes from '../actions/TodoAction.js'
import todoService from '../services/TodoService'

export function* addTodo(todo) {
    try {
        let response = yield call([todoService, todoService.add], todo)
        yield put(actionTypes.addTodoSuccess(response))
    } catch (err) {
        yield put(actionTypes.addTodoFail(err.message))
    }
}

export function* deleteTodo(id) {
    try {
        let response = yield call([todoService, todoService.delete], id)
        yield put(actionTypes.deleteTodoSuccess(response))
        yield put(actionTypes.fetchTodoList({page: 1, size: 200}))
    } catch (err) {
        yield put(actionTypes.deleteTodoFail(err.message))
    }
}

export function* completeTodo(id) {
    try {
        let response = yield call([todoService, todoService.complete], id)
        yield put(actionTypes.completeTodoSuccess(response))
        yield put(actionTypes.fetchTodoList({page: 1, size: 200}))
    } catch (err) {
        yield put(actionTypes.completeTodoFail(err.message))
    }
}

export function* fetchTodos(params) {
    try {
        let response = yield call([todoService, todoService.list], params)
        yield put(actionTypes.fetchTodoListSuccess(response))
    } catch (err) {
        yield put(actionTypes.fetchTodoListFail(err.message))
    }
}

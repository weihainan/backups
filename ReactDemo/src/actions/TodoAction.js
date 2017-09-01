export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST'
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS'
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE'

export const fetchTodoList = (params) => ({
    type: FETCH_TODOS_REQUEST,
    payload: params
})

export const fetchTodoListSuccess = (result) => ({
    type: FETCH_TODOS_SUCCESS,
    payload: result
})

export const fetchTodoListFail = (msg) => ({
    type: FETCH_TODOS_FAILURE,
    payload: msg
})


export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST'
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE'

export const addTodo = (todo) => ({
    type: ADD_TODO_REQUEST,
    payload: todo
})

export const addTodoSuccess = (result) => ({
    type: ADD_TODO_SUCCESS,
    payload: result
})

export const addTodoFail = (msg) => ({
    type: ADD_TODO_FAILURE,
    payload: msg
})

export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST'
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'
export const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE'

export const deleteTodo = (id) => ({
    type: DELETE_TODO_REQUEST,
    payload: id
})

export const deleteTodoSuccess = (result) => ({
    type: DELETE_TODO_SUCCESS,
    payload: result
})

export const deleteTodoFail = (msg) => ({
    type: DELETE_TODO_FAILURE,
    payload: msg
})


export const COMPLETE_TODO_REQUEST = 'COMPLETE_TODO_REQUEST'
export const COMPLETE_TODO_SUCCESS = 'COMPLETE_TODO_SUCCESS'
export const COMPLETE_TODO_FAILURE = 'COMPLETE_TODO_FAILURE'

export const completeTodo = (id) => ({
    type: COMPLETE_TODO_REQUEST,
    payload: id
})

export const completeTodoSuccess = (result) => ({
    type: COMPLETE_TODO_SUCCESS,
    payload: result
})

export const completeTodoFail = (msg) => ({
    type: COMPLETE_TODO_FAILURE,
    payload: msg
})
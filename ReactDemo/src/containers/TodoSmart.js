import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {addTodo, deleteTodo, completeTodo, fetchTodoList} from '../actions/TodoAction'
import Todo from '../components/todo/Todo'

const mapStateToProps = state => ({todoState: state.todoState});

const mapDispatchToProps = dispatch => ({
    addAction: bindActionCreators(addTodo, dispatch),
    deleteAction: bindActionCreators(deleteTodo, dispatch),
    completeAction: bindActionCreators(completeTodo, dispatch),
    fetchAction: bindActionCreators(fetchTodoList, dispatch),
});

let TodoSmart = connect(mapStateToProps, mapDispatchToProps)(Todo);
export default TodoSmart;
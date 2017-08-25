import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Todo from '../components/todo/Todo'

const mapStateToProps = state => ({chargeState: state.chargeTableState});

const mapDispatchToProps = dispatch => ({});

let TodoSmart = connect(mapStateToProps, mapDispatchToProps)(Todo);
export default TodoSmart;
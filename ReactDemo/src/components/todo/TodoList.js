import React from 'react'
import TodoItem from './TodoItem'

import NoDataTip from '../common/noDataTip'

export default class TodoList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                {this.getBody()}
            </div>
        )
    }

    getBody() {
        let todoItems = [];
        this.props.data.items.map(el=> {
            todoItems.push(<TodoItem value={el}/>);
        })
        if (todoItems.length == 0) {
            return <NoDataTip msg='还没有待办事务...'/>;
        } else {
            return todoItems;
        }
    }
}
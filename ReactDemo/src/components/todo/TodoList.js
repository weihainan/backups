import React from 'react'
import TodoItem from './TodoItem'


const value1 = {
    completed: true,
    content: 'contentcontentcontent'
}

const value = {
    completed: false,
    content: 'contentcontentcontent'
}

export default class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
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
                <div>
                    <TodoItem value={value1}/>
                    <TodoItem value={value1}/>
                    <TodoItem value={value}/>
                </div>
                <div>
                    加载更多
                </div>
            </div>
        )
    }
}
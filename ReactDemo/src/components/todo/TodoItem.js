import React from 'react'
import './css/TodoItems.css'

import {Button} from 'element-react';

export default class TodoItem extends React.Component {

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

        let item = this.props.value;
        let completedValue = item.completed ? 'completed' : 'unComplete';
        let button = null;
        if (item.completed) {
            button = <Button type="text"> 删除 </Button>
        } else {
            button = <Button type="text"> 完成 </Button>
        }

        return (
            <div className={`item ${completedValue}`}>
                <span className="itemValue">{item.content}</span>
                {button}
            </div>
        )
    }
}
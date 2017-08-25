import React from 'react'

import TodoList from './TodoList'
import {Message, MessageBox, Button, Table, Dialog, Input, Form} from 'element-react';

class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todoContent: '',
        };
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
                <div className="top">
                    待办事务
                </div>
                <div className="operation-div">
                    <Input placeholder="待办事务" onChange={this.onChange.bind(this)}
                           append={
                               <Button type="primary" onClick={this.add.bind(this)}>添加</Button>}
                    ></Input>
                </div>

                <div>
                    <TodoList/>
                </div>

            </div>
        );
    }

    add() {
        console.log("add ...")
    }

    onChange(value) {
        if (value) {
            this.setState({
                todoContent: value
            })
        }
    }
}

export default Todo;
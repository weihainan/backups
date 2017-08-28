import React from 'react'

import TodoList from './TodoList'
import {Message, MessageBox, Button, Table, Dialog, Input, Form} from 'element-react';

class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todoContent: '',
            pagination: {
                page: 1,
                size: 20,
            }
        };
    }

    componentWillMount() {
        this.props.fetchAction(this.state.pagination);
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
                    <Input placeholder="待办事务" value={this.state.todoContent} onChange={this.onChange.bind(this)}
                           append={
                               <Button type="primary" onClick={this.add.bind(this)}>添加</Button>}
                    ></Input>
                </div>

                <div>
                    <TodoList data={this.props.todoState.data}/>
                </div>

            </div>
        );
    }

    add() {
        if (this.state.todoContent) {
            this.props.addAction({
                content: this.state.todoContent
            });
            this.setState({
                todoContent: ''
            });
            setInterval((()=> {
                this.props.fetchAction(this.state.pagination);
            }).bind(this), 300)
        }
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
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
                size: 200,
            }
        };
    }

    componentWillMount() {
        this.props.fetchAction(this.state.pagination);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.todoState.msg) {
            Message({
                message: nextProps.todoState.msg,
                type: 'warning',
                duration: 2000,
            });
        }
    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentWillUnmount() {

    }

    refresh() {
        this.props.fetchAction(this.state.pagination);
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
                           style={{width:'95%'}}
                    ></Input>
                    <span style={{width: '10px', display: 'inline-block'}}></span>
                    <Button type="primary" onClick={this.refresh.bind(this)}>刷新</Button>
                </div>

                <div>
                    <TodoList
                        data={this.props.todoState.data}
                        delete={this.props.deleteAction}
                        complete={this.props.completeAction}
                    />
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
            setTimeout((()=> {
                this.props.fetchAction(this.state.pagination);
            }).bind(this), 600)
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
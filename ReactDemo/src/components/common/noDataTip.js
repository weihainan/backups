import React, { Component, PropTypes } from 'react'
import Router from 'react-router'
import './noDataTip.css'

export default class noDataTip extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div className='container'>
                <i className='icon-no-data'></i>
                {this.props.msg}
            </div>
        )
    }
}

noDataTip.propTypes = {
    msg: React.PropTypes.string
}

noDataTip.displayName = 'NoDataTip'

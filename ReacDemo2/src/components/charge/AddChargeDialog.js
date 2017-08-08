import React from 'react'
import {Modal} from 'antd';

class AddChargeDialog extends React.Component {

    render() {
        const {visible, handleOk, handleCancel} = this.props;
        return (
            <Modal title="新账目"
                   visible={visible}
                   onOk={handleOk}
                   onCancel={handleCancel}
            >
                <p>1111</p>
            </Modal>
        );
    }
}


AddChargeDialog.propTypes = {
    visible: React.PropTypes.bool.isRequired,
    handleOk: React.PropTypes.func.isRequired,
    handleCancel: React.PropTypes.func.isRequired,
}

export default AddChargeDialog
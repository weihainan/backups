import React from 'react'
import {Modal} from 'antd';

import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
const FormItem = Form.Item;

class AddChargeDialog extends React.Component {

    handleClickOk() {
        let {handleOk} = this.props;
        handleOk(null);
    }

    render() {
        let {visible, handleCancel} = this.props;

        return (

            <Modal title="新账目"
                   visible={visible}
                   onOk={this.handleClickOk.bind(this)}
                   onCancel={handleCancel}
            >
                <div>
                    <Form>
                        <FormItem label="Website">
                            <Input />
                        </FormItem>

                        <FormItem label="Website">
                            <Input />
                        </FormItem>

                        <FormItem label="Website">
                            <Input />
                        </FormItem>
                    </Form>
                </div>
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
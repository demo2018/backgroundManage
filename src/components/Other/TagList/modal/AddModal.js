import { Form, Row, Input, Modal, Radio } from 'antd';
import styles from './AddModal.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOk = this.handleOk.bind(this);
  }
  handleOk() {
    const { onOK, onAdds, form, selecteRecord } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err && !selecteRecord.id) {
        onAdds(values);
      }
      if (!err && selecteRecord.id) {
        onOK(values, selecteRecord.id);
      }
    });
  }
  render() {
    const { form, onCancel, selecteRecord } = this.props;
    const { getFieldDecorator } = form;
    const modalOpts = {
      title: selecteRecord.id ? '编辑banner' : '新增banner',
      visible: true,
      maskClosable: false,
      onOk: this.handleOk,
      onCancel,
    };

    return (
      <Modal {...modalOpts} className={styles.addModal}>
        <Form layout="inline">
          <Row>
            <FormItem label="名称" >
              {getFieldDecorator('name', {
                initialValue: selecteRecord.name,
                rules: [{
                  required: true, message: '该字段不能为空',
                }],
              })(
                <Input />
                )}
            </FormItem>
            <FormItem label="状态" >
              {getFieldDecorator('status', {
                initialValue: selecteRecord.status,
                rules: [{
                  required: true, message: '该字段不能为空',
                }],
              })(
                <RadioGroup>
                  <Radio value={1}>启用</Radio>
                  <Radio value={0}>禁用</Radio>
                </RadioGroup>
                )}
            </FormItem>
          </Row>
        </Form>
      </Modal>
    );
  }
}


export default Form.create()(AddModal);

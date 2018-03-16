import { Form, Row, Input, Modal, Radio } from 'antd';
import styles from './AddModal.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
// 页面参数初始化
class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOk = this.handleOk.bind(this);
  }
  // 触发保存
  handleOk() {
    const { onOK, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onOK(values);
      }
    });
  }
  // 页面渲染
  render() {
    const { form, onCancel, selecteRecord } = this.props;
    const { getFieldDecorator } = form;

    const modalOpts = {
      title: selecteRecord.id ? '编辑折扣' : '新增折扣',
      visible: true,
      maskClosable: false,
      onOk: this.handleOk,
      onCancel,
    };

    return (
      <Modal {...modalOpts} className={styles.addModal}>
        <Form layout="inline">
          <Row>
            <FormItem label="折扣额度" >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '该字段不能为空',
                }],
              })(
                <Input />
                )}
            </FormItem>
            <FormItem label="折扣状态" >
              {getFieldDecorator('status', {
                rules: [{
                  required: true, message: '该字段不能为空',
                }],
              })(
                <RadioGroup>
                  <Radio value={1}>启用</Radio>
                  <Radio value={2}>禁用</Radio>
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

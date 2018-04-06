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
  // 触发提交 判断是新增还是修改
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
  // 页面渲染
  render() {
    const { form, onCancel, selecteRecord } = this.props;
    const { getFieldDecorator } = form;

    const modalOpts = {
      title: selecteRecord.id ? '编辑标签类型' : '新增标签类型',
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
            <FormItem label="排序" >
              {getFieldDecorator('rank', {
                initialValue: selecteRecord.rank || 0,
              })(
                <Input placeholder="请输入排序序号" />
                )}
            </FormItem>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddModal);

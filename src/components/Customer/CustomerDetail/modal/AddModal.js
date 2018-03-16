import { Form, Input, Modal, Select, Radio } from 'antd';
import { relationStatus } from 'configs/constants';
import styles from './addModal.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

// 页面参数初始化
class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOk = this.handleOk.bind(this);
  }
  handleOk() {
    const { onOK, onOKs, form, id, selectRecord } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err && !selectRecord.id) {
        onOK(values, id);
      }
      if (!err && selectRecord.id) {
        onOKs(values, selectRecord.id, selectRecord.relationId);
      }
    });
  }
  // 页面渲染
  render() {
    const { form, onCancel, selectRecord } = this.props;
    const { getFieldDecorator } = form;
    const modalOpts = {
      title: '添加关系成员',
      visible: true,
      maskClosable: false,
      onOk: this.handleOk,
      onCancel,
    };
    return (
      <Modal {...modalOpts} className={styles.addModal}>
        <Form layout="inline" >
          <FormItem label="姓名">
            {getFieldDecorator('realName', {
              initialValue: selectRecord.realName,
              rules: [{ required: true, message: '请输入关系成员姓名！', }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="关系">
            {getFieldDecorator('relation', {
              initialValue: `${selectRecord.relation}`,
              rules: [
                { required: true, message: '请选择与您的关系！', }
              ]
            })(
              <Select>
                {relationStatus.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
              </Select>
            )}
          </FormItem>
          <FormItem label="性别">
            {getFieldDecorator('gender', {
              initialValue: selectRecord.gender,
              rules: [
                { required: true, message: '请选择性别！', }
              ]
            })(<RadioGroup >
              <Radio value={1}>男</Radio>
              <Radio value={0}>女</Radio>
            </RadioGroup>)}
          </FormItem>
          <FormItem label="年龄">
            {getFieldDecorator('age', {
              initialValue: selectRecord.age,
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="手机号码">
            {getFieldDecorator('phone', {
              initialValue: selectRecord.phone,
            })(
              <Input />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddModal);

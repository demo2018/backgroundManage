import { Form, Row, Input, Modal, Select } from 'antd';
import styles from './AddModal.less';

const FormItem = Form.Item;
const Option = Select.Option;

const formatSelectValue = (value) => {
  if (value || value === 0) {
    return `${value}`;
  }
};
// 页面参数初始化
class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOk = this.handleOk.bind(this);
  }
  // 触发确定提交
  handleOk() {
    const { onOK, onAdds, form, selecteRecord } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err && !selecteRecord.id) {
        onAdds({ ...values, roleIds: [values.roleIds] });
      }
      if (!err && selecteRecord.id) {
        onOK({ ...values, roleIds: [values.roleIds] }, selecteRecord.id);
      }
    });
  }
  // 页面渲染
  render() {
    const { form, onCancel, selecteRecord, roleList } = this.props;
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
            <FormItem label="姓名" >
              {getFieldDecorator('realName', {
                initialValue: selecteRecord.realName,
                rules: [{
                  required: true, message: '姓名不能为空！',
                }],
              })(
                <Input />
                )}
            </FormItem>
            <FormItem label="手机号码" >
              {getFieldDecorator('phone', {
                initialValue: selecteRecord.phone,
                rules: [{
                  required: true, message: '手机号码不能为空！',
                }],
              })(
                <Input />
                )}
            </FormItem>
            <FormItem label="账号名称" >
              {getFieldDecorator('username', {
                initialValue: selecteRecord.username,
                rules: [{
                  required: true, message: '账号不能为空！',
                }],
              })(
                <Input />
                )}
            </FormItem>
            <FormItem label="密码" >
              {getFieldDecorator('password', {
                initialValue: selecteRecord.password,
                rules: [{
                  required: true, message: '密码不能为空！',
                }],
              })(
                <Input />
                )}
            </FormItem>
            <FormItem label="所属角色" >
              {getFieldDecorator('roleIds', {
                initialValue: formatSelectValue(selecteRecord.roleIds),
                rules: [{
                  required: true, message: '角色不能为空！',
                }],
              })(
                <Select placeholder="请选择" >
                  {roleList.map(({ id, name }) => {
                    return <Option key={id} value={`${id}`}>{name}</Option>;
                  })}
                </Select>
              )}
            </FormItem>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddModal);

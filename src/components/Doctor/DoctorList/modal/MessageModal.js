import { Form, Radio, Row, Modal } from 'antd';
import styles from './messageModal.less';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

// 页面参数初始化
class MessageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOk = this.handleOk.bind(this);
  }
  // 监听确认按钮
  handleOk() {
    const { onOK } = this.props;
    const values = this.state;
    onOK(values);
  }
  // 监听页面value值变更事件
  handleChange(key, value) {
    if (value.target) {
      value = value.target.value;
    }
    this.setState({ [key]: value });
  }
  // 页面渲染
  render() {
    const { onCancel } = this.props;
    const modalOpts = {
      title: '选择提醒模板 ',
      visible: true,
      maskClosable: false,
      onOk: this.handleOk,
      onCancel,
    };
    return (
      <Modal {...modalOpts} >
        <Form layout={'inline'} className={styles.messageModal}>
          <Row>
            <FormItem label="短信模板">
              <RadioGroup
                onChange={(value) => { this.handleChange('template', value); }}
                value={this.state.template}
              >
                <Radio value={1}>生日祝福</Radio>
                <Radio value={2}>元旦祝福</Radio>
                <Radio value={3}>端午祝福</Radio>
              </RadioGroup>
            </FormItem>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default MessageModal;

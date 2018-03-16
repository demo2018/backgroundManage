import { Form, Tag, Row, Checkbox, Modal } from 'antd';
import styles from './VisitModal.less';
const { CheckableTag } = Tag;

class CheckBoxTag extends React.Component {
  state = { checked: false };
  handleChange = (checked) => {
    this.setState({ checked });
  }
  render() {
    return <CheckableTag className="checkBoxTag" {...this.props} checked={this.state.checked} onChange={this.handleChange} />;
  }
}

class GoodsModifyLogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleOk() {
    const { onOK } = this.props;
    const values = this.state;
    onOK(values);
  }
  handleChange(key, value) {
    if (value.target) {
      value = value.target.value;
    }
    this.setState({ [key]: value });
  }
  render() {
    const search = this.state;
    const { onCancel } = this.props;
    const modalOpts = {
      title: '患者好评',
      width: 550,
      visible: true,
      maskClosable: false,
      onOk: () => { this.handleOk(); },
      onCancel,
    };
    return (
      <Modal {...modalOpts} className={styles.visitModal}>
        <Form >
          <Row>
            <CheckBoxTag>医生很专业，有耐心</CheckBoxTag>
            <CheckBoxTag>客户经理nice</CheckBoxTag>
            <CheckBoxTag>诊所高端大气上档次</CheckBoxTag>
            <CheckBoxTag>极致体验，完美经历</CheckBoxTag>
          </Row>
          <Row><span>提出表扬！</span></Row>
          <Row>
            <Checkbox
              onChange={this.onChange}
            > 分享到朋友圈
            </Checkbox>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default GoodsModifyLogs;

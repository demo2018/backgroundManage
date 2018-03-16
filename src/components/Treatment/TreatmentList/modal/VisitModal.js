import { Form, Button, Row, Input, Modal, Select } from 'antd';
import { treatmentStatus } from 'configs/constants';
import { formatName } from 'utils/common';
import styles from './AssessModal.less';
const { TextArea } = Input;

const FormItem = Form.Item;
const Option = Select.Option;

class AssessModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOk = this.handleOk.bind(this);
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
    const { onCancel, selecteRecord } = this.props;
    const modalOpts = {
      title: '患者评价',
      visible: true,
      maskClosable: false,
      onOk: this.handleOk,
      onCancel,
    };
    return (
      <Modal {...modalOpts} >
        <Form layout={'inline'} className={styles.assessModal}>
          <Row>
            <div className="ant-form-item">
              <div className="ant-form-item-label"><label >客户姓名</label></div>
              <span className="ant-form-item-control-wrapper">{formatName('张三', 15709470147)}</span>
            </div>

            <FormItem label="随访方式">
              <Select value={search.creator1} onChange={(value) => { this.handleChange('creator1', value); }} placeholder="请选择" >
                {treatmentStatus.map(({ label, value }) => (<Option key={value} value={value}>{label}</Option>))}
              </Select>
            </FormItem>
            <FormItem label="客户经理">
              <Select value={search.creator4} onChange={(value) => { this.handleChange('creator4', value); }} placeholder="请选择" >
                {treatmentStatus.map(({ label, value }) => (<Option key={value} value={value}>{label}</Option>))}
              </Select>
            </FormItem>
            <FormItem label="随访记录" className="textAreaWraper">
              <TextArea onChange={(value) => { this.handleChange('creator5', value); }} />
            </FormItem>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default AssessModal;

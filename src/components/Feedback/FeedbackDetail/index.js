import { Form, Button, Row, Input, Select, DatePicker } from 'antd';
import { appointmentStatus, treatmentType } from 'configs/constants';
import styles from './feedbackDetail.less';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class FeedbackDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.feedbackDetail;
  }
  componentWillReceiveProps(nextProps) {
    if ('feedbackDetail' in nextProps && nextProps.feedbackDetail !== this.props.feedbackDetail) {
      this.setState({ ...nextProps.feedbackDetail });
    }
  }
  handleSearch() {
    const { onSearch } = this.props;
    const values = this.state;
    onSearch({ ...values, pn: 1 });
  }
  handleReset() {
    const { onReset } = this.props;
    onReset && onReset();
  }
  handleChange(key, value) {
    if (value.target) {
      value = value.target.value;
    }
    this.setState({ [key]: value });
  }
  render() {
    const search = this.state;
    return (
      <div className={styles.feedbackDetail}>
        <h3 className="title"> 新建预约 </h3>
        <Form layout="inline">
          <FormItem label="就诊人姓名">
            <Input value={search.name} onChange={(value) => { this.handleChange('name', value); }} placeholder="请输入" />
          </FormItem>
          <FormItem label="预约人姓名">
            <Input value={search.appointmentName} onChange={(value) => { this.handleChange('appointmentName', value); }} placeholder="选填" />
          </FormItem>
          <FormItem label="预约项目">
            <Select value={search.appointmentItem} onChange={(value) => { this.handleChange('appointmentItem', value); }} placeholder="请选择" >
              {appointmentStatus.map(({ label, value }) => (<Option key={value} value={value}>{label}</Option>))}
            </Select>
          </FormItem>
          <FormItem label="初/复诊">
            <Select value={search.type} onChange={(value) => { this.handleChange('type', value); }} placeholder="请选择" >
              {treatmentType.map(({ label, value }) => (<Option key={value} value={value}>{label}</Option>))}
            </Select>
          </FormItem>
          <FormItem label="医生">
            <Input value={search.doctorName} onChange={(value) => { this.handleChange('doctorName', value); }} placeholder="请输入" />
          </FormItem>
          <FormItem label="就诊时间">
            <DatePicker value={search.clinicTime} onChange={(value) => { this.handleChange('clinicTime', value); }} />
          </FormItem>

          <FormItem label="诊所名称">
            <Input value={search.clinicName} onChange={(value) => { this.handleChange('clinicName', value); }} placeholder="请输入" />
          </FormItem>

          <FormItem label="预约状态">
            <Select value={search.appointmentStatus} onChange={(value) => { this.handleChange('appointmentStatus', value); }} placeholder="请选择" >
              {appointmentStatus.map(({ label, value }) => (<Option key={value} value={value}>{label}</Option>))}
            </Select>
          </FormItem>
          <FormItem label="备注">
            <TextArea value={search.remark} onChange={(value) => { this.handleChange('remark', value); }} placeholder="请输入" />
          </FormItem>

          <div className="btnGroup">
            <Button type="primary" onClick={() => { this.handleSearch(); }}>保存</Button>
            <Button onClick={() => { this.handleReset(); }} type="danger" ghost>删除</Button>
          </div>
        </Form>
      </div>
    );
  }
}
export default Form.create()(FeedbackDetail);

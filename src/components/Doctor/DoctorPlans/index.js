import { Form, Button, Input, Select, DatePicker, Radio, Modal } from 'antd';
import styles from './doctorPlans.less';
import { toString } from 'utils/common';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class DoctorPlans extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.details;
  }
  componentWillReceiveProps(nextProps) {
    if ('details' in nextProps && nextProps.details !== this.props.details) {
      this.setState({ ...nextProps.details });
    }
  }
  // 触发提交 判断是新增还是修改
  handleSave() {
    const { form, toPlans } = this.props;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.date) {
          const { date } = values;
          toPlans({ ...values, date: date ? toString(date, 'YYYY-MM-DD') : undefined, interval: 15 });
        } else {
          Modal.warning({
            title: '抱歉！',
            content: '请选择出诊日期！',
          });
        }
      }
    });
  }
  render() {
    const { form, details, hospitalList } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.doctorPlans}>
        <h3 className="title"> 出诊安排 </h3>
        <Form layout="inline">
          <FormItem label="医生姓名">
            {getFieldDecorator('doctorId', {
              initialValue: `${details.id}`,
              rules: [{ required: true, whitespace: true, message: '不能为空' }]
            })(
              <Select placeholder="医生姓名将自动填写" disabled>
                <Option key={details.id} value={`${details.id}`}>{details.realName}</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="手机号码">
            {getFieldDecorator('phone', {
              initialValue: details.phone,
              rules: [{ required: true, whitespace: true, message: '不能为空' }]
            })(
              <Input placeholder="选填" disabled />
            )}
          </FormItem>
          <FormItem label="诊所选择">
            {getFieldDecorator('hospitalId', {
              initialValue: details.hospitalId,
              rules: [{ required: true, whitespace: true, message: '不能为空' }]
            })(
              <Select placeholder="请选择" >
                {hospitalList.map(({ id, name }) => (<Option key={id} value={`${id}`}>{name}</Option>))}
              </Select>
            )}
          </FormItem>
          <FormItem label="出诊安排">
            {getFieldDecorator('date', {
              initialValue: details.date,
            })(
              <DatePicker />
            )}
          </FormItem>
          <FormItem label="初诊">
            {getFieldDecorator('startTime', {
              initialValue: details.startTime,
              rules: [{ required: true, whitespace: true, message: '不能为空' }]
            })(
              <Select placeholder="初诊时间">
                <Option value="9:00">9:00</Option>
                <Option value="9:15">9:15</Option>
                <Option value="9:30">9:30</Option>
                <Option value="9:45">9:45</Option>
                <Option value="10:00">10:00</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="终诊">
            {getFieldDecorator('endTime', {
              initialValue: details.endTime,
              rules: [{ required: true, whitespace: true, message: '不能为空' }]
            })(
              <Select placeholder="终诊时间">
                <Option value="12:00">12:00</Option>
                <Option value="12:15">12:15</Option>
                <Option value="12:30">12:30</Option>
                <Option value="17:00">17:00</Option>
                <Option value="18:00">18:00</Option>
              </Select>
            )}
          </FormItem>
          {/* <FormItem label="时间间隔">
            {getFieldDecorator('interval', {
              initialValue: details.interval,
              rules: [{ required: true, whitespace: true, message: '不能为空' }]
            })(
              <Select placeholder="时间间隔">
                <Option value="15">15分钟</Option>
                <Option value="30">30分钟</Option>
                <Option value="45">45分钟</Option>
                <Option value="60">60分钟</Option>
                <Option value="90">90分钟</Option>
              </Select>
            )}
          </FormItem> */}
          <FormItem label="是否约满">
            {getFieldDecorator('status', {
              initialValue: 0,
            })(
              <RadioGroup>
                <Radio value={0}>否</Radio>
                <Radio value={1}>是</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <div className="btnGroup">
            <Button type="primary" onClick={() => { this.handleSave(); }}>保存</Button>
            <Button onClick={() => { this.handleReset(); }} type="danger" ghost>删除</Button>
          </div>
        </Form>
      </div>
    );
  }
}
export default Form.create()(DoctorPlans);

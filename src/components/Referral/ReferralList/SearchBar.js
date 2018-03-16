import { Form, Button, Row, Input, Select, DatePicker } from 'antd';
import { doctorStatus } from 'configs/constants';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.search;
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if ('search' in nextProps && nextProps.search !== this.props.search) {
      this.setState({ ...nextProps.search });
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
      <div>
        <div className="searchBar">
          <Form layout="inline">
            <Row>
              <FormItem label="用户名">
                <Input value={search.WeChatName} onChange={(value) => { this.handleChange('realName', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="姓名">
                <Input value={search.realName} onChange={(value) => { this.handleChange('phone', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="手机号码">
                <Input value={search.phone} onChange={(value) => { this.handleChange('recommendName', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="医生姓名">
                <Input value={search.doctorName} onChange={(value) => { this.handleChange('doctorId', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="日期">
                <RangePicker value={search.addDate} onChange={(value) => { this.handleChange('addDate', value); }} />
              </FormItem>
              <FormItem label="状态">
                <Select value={search.status} onChange={(value) => { this.handleChange('status', value); }} placeholder="请选择" >
                  {doctorStatus.map(({ label, value }) => (<Option key={value} value={value}>{label}</Option>))}
                </Select>
              </FormItem>
              <FormItem label="奖励">
                <Select value={search.status} onChange={(value) => { this.handleChange('status', value); }} placeholder="请选择" >
                  {doctorStatus.map(({ label, value }) => (<Option key={value} value={value}>{label}</Option>))}
                </Select>
                <Select value={search.status} onChange={(value) => { this.handleChange('status', value); }} placeholder="请选择" >
                  {doctorStatus.map(({ label, value }) => (<Option key={value} value={value}>{label}</Option>))}
                </Select>
              </FormItem>
              <div className="btnGroup">
                <Button type="primary" onClick={() => { this.handleSearch(); }}>查询</Button>
                <Button onClick={() => { this.handleReset(); }} style={{ border: '1px solid #4f95ff', color: '#4f95ff' }}>重置</Button>
              </div>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}
export default Form.create()(SearchBar);

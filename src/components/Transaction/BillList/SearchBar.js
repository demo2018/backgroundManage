import { Form, Button, Row, Input, Select, DatePicker } from 'antd';
import { treatmentStatus } from 'configs/constants';
import { formatDate, getDateRangeValue } from 'utils/common';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
// 处理起止时间格式
const getStateBySearch = (search = {}) => {
  const { startTime, endTime } = search;
  return {
    ...search,
    createTime: getDateRangeValue(startTime, endTime),
  };
};
// 搜索框初始化
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = getStateBySearch(props.search);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if ('search' in nextProps && nextProps.search !== this.props.search) {
      this.setState({ ...getStateBySearch(nextProps.search) });
    }
  }
  // 触发搜索事件
  handleSearch() {
    const { onSearch } = this.props;
    const values = this.state;
    values.startTime = formatDate(values.createTime[0]);
    values.endTime = formatDate(values.createTime[1]);
    delete values.createTime;
    onSearch({ ...values, pn: 1 });
  }
  // 触发重置事件
  handleReset() {
    const { onReset } = this.props;
    onReset && onReset();
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
    const search = this.state;
    return (
      <div className="searchBar">
        <Form layout="inline">
          <Row>
            <FormItem label="账单编号">
              <Input value={search.billId} onChange={(value) => { this.handleChange('billId', value); }} placeholder="请输入" />
            </FormItem>
            <FormItem label="客户姓名">
              <Input value={search.patientName} onChange={(value) => { this.handleChange('patientName', value); }} placeholder="请输入" />
            </FormItem>
            <FormItem label="手机号码">
              <Input value={search.phone} onChange={(value) => { this.handleChange('phone', value); }} placeholder="请输入" />
            </FormItem>
            <FormItem label="医生姓名">
              <Input value={search.doctorName} onChange={(value) => { this.handleChange('doctorName', value); }} placeholder="请输入" />
            </FormItem>
            <FormItem label="诊所名称">
              <Input value={search.hospitalName} onChange={(value) => { this.handleChange('hospitalName', value); }} placeholder="请输入" />
            </FormItem>
            <FormItem label="日期">
              <RangePicker value={search.createTime} onChange={(value) => { this.handleChange('createTime', value); }} />
            </FormItem>
            <FormItem label="按项目">
              <Select value={`${search.itemName}`} onChange={(value) => { this.handleChange('itemName', value); }} placeholder="请选择" >
                <Option value="">全部</Option>
                {treatmentStatus.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
              </Select>
            </FormItem>
            <FormItem label="按状态">
              <Select value={`${search.status}`} onChange={(value) => { this.handleChange('status', value); }} placeholder="请选择" >
                <Option value="">全部</Option>
                {treatmentStatus.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
              </Select>
            </FormItem>
            <FormItem label="支付方式">
              <Select value={`${search.payType}`} onChange={(value) => { this.handleChange('payType', value); }} placeholder="请选择" >
                <Option value="">全部</Option>
                {treatmentStatus.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
              </Select>
            </FormItem>
            <FormItem label="优惠情况">
              <Select value={`${search.isOnSale}`} onChange={(value) => { this.handleChange('isOnSale', value); }} placeholder="请选择" >
                <Option value="">全部</Option>
                {treatmentStatus.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
              </Select>
            </FormItem>
            <div className="btnGroup">
              <Button type="primary" onClick={() => { this.handleSearch(); }}>查询</Button>
              <Button onClick={() => { this.handleReset(); }} style={{ border: '1px solid #4f95ff', color: '#4f95ff' }}>重置</Button>
            </div>
          </Row>
        </Form>
      </div>
    );
  }
}
export default Form.create()(SearchBar);

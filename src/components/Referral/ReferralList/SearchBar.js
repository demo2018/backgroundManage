import { Form, Button, Row, Input, Select, DatePicker } from 'antd';
import { referralStatus, rebateNum, rebateType } from 'configs/constants';
import { formatDate, getDateRangeValue } from 'utils/common';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
// 处理起止时间格式
const getStateBySearch = (search = {}) => {
  const { startDate, endDate } = search;
  return {
    ...search,
    date: getDateRangeValue(startDate, endDate),
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
    values.startDate = formatDate(values.date[0]);
    values.endDate = formatDate(values.date[1]);
    delete values.date;
    if (values.number == 0 && values.number != '') {
      onSearch({ ...values, pn: 1, startNum: 0, endNum: 50 });
    } else if (values.number == 1) {
      onSearch({ ...values, pn: 1, startNum: 50, endNum: 100 });
    } else if (values.number == 2) {
      onSearch({ ...values, pn: 1, startNum: 100, endNum: 200 });
    } else if (values.number == 3) {
      onSearch({ ...values, pn: 1, startNum: 200, endNum: 500 });
    } else if (values.number == 4) {
      onSearch({ ...values, pn: 1, startNum: 500, endNum: 500000 });
    } else {
      onSearch({ ...values, pn: 1, startNum: '', endNum: '' });
    }
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
      <div>
        <div className="searchBar">
          <Form layout="inline">
            <Row>
              <FormItem label="姓名">
                <Input value={search.customerName} onChange={(value) => { this.handleChange('customerName', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="手机号码">
                <Input value={search.phone} onChange={(value) => { this.handleChange('phone', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="医生姓名">
                <Input value={search.doctorName} onChange={(value) => { this.handleChange('doctorName', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="日期">
                <RangePicker value={search.date} onChange={(value) => { this.handleChange('date', value); }} />
              </FormItem>
              <FormItem label="状态">
                <Select value={`${search.status}`} onChange={(value) => { this.handleChange('status', value); }} placeholder="请选择" >
                  <Option value="">全部</Option>
                  {referralStatus.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
                </Select>
              </FormItem>
              <FormItem label="奖励">
                <Select value={`${search.type}`} onChange={(value) => { this.handleChange('type', value); }} placeholder="请选择" >
                  <Option value="">全部</Option>
                  {rebateType.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
                </Select>
                <Select value={`${search.number}`} onChange={(value) => { this.handleChange('number', value); }} placeholder="请选择" >
                  <Option value="">全部</Option>
                  {rebateNum.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
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

import { Form, Button, Row, Input, Select, DatePicker } from 'antd';
import { genderType, sendStatus } from 'configs/constants';
import { formatDate, getDateRangeValue } from 'utils/common';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
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
      <div>
        <div className="searchBar">
          <Form layout="inline">
            <Row>
              <FormItem label="初筛报告ID">
                <Input value={search.id} onChange={(value) => { this.handleChange('id', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="姓名">
                <Input value={search.name} onChange={(value) => { this.handleChange('name', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="手机号">
                <Input value={search.phone} onChange={(value) => { this.handleChange('phone', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="性别">
                <Select value={`${search.gender}`} onChange={(value) => { this.handleChange('gender', value); }} placeholder="请选择" >
                  <Option value="">全部</Option>
                  {genderType.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
                </Select>
              </FormItem>
              <FormItem label="状态">
                <Select value={`${search.isSend}`} onChange={(value) => { this.handleChange('isSend', value); }} placeholder="请选择" >
                  <Option value="">全部</Option>
                  {sendStatus.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
                </Select>
              </FormItem>
              <FormItem label="机构名称">
                <Input value={search.orgName} onChange={(value) => { this.handleChange('orgName', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="日期">
                <RangePicker value={search.date} onChange={(value) => { this.handleChange('date', value); }} />
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

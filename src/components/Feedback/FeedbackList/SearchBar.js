import { Form, Button, Row, Input, Select, DatePicker } from 'antd';
import { formatDate, getDateRangeValue } from 'utils/common';
import { feedbackStatus, sourceStatus } from 'configs/constants';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
// 处理起止时间格式
const getStateBySearch = (search = {}) => {
  const { startTime, endTime } = search;
  return {
    ...search,
    date: getDateRangeValue(startTime, endTime),
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
    values.startTime = formatDate(values.date[0]);
    values.endTime = formatDate(values.date[1]);
    delete values.date;
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
              <FormItem label="姓名">
                <Input value={search.name} onChange={(value) => { this.handleChange('name', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="手机号码">
                <Input value={search.phone} onChange={(value) => { this.handleChange('phone', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="日期">
                <RangePicker value={search.date} onChange={(value) => { this.handleChange('date', value); }} />
              </FormItem>
              <FormItem label="状态">
                <Select value={`${search.status}`} onChange={(value) => { this.handleChange('status', value); }} placeholder="请选择" >
                  <Option value="">全部</Option>
                  {feedbackStatus.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
                </Select>
              </FormItem>
              <FormItem label="来源">
                <Select value={`${search.source}`} onChange={(value) => { this.handleChange('source', value); }} placeholder="请选择" >
                  <Option value="">全部</Option>
                  {sourceStatus.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
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

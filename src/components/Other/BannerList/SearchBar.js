import { Form, Button, Row, Select, Input, DatePicker } from 'antd';
import { formatDate, getDateRangeValue } from 'utils/common';
import { itemStatus } from 'configs/constants';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
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
            <FormItem label="名称">
              <Input value={search.name} onChange={(value) => { this.handleChange('name', value); }} placeholder="请输入" />
            </FormItem>
            <FormItem label="状态">
              <Select value={`${search.status}`} onChange={(value) => { this.handleChange('status', value); }} placeholder="请选择" >
                <Option value="">全部</Option>
                {itemStatus.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
              </Select>
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
    );
  }
}

export default Form.create()(SearchBar);

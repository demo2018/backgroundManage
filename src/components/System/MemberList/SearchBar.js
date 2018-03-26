import { Form, Button, Row, Input, Select, DatePicker } from 'antd';
import { formatDate, getDateRangeValue } from 'utils/common';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

// 处理起止时间格式
const getStateBySearch = (search = {}) => {
  const { startTime, endTime } = search;
  return {
    ...search,
    time: getDateRangeValue(startTime, endTime),
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
    values.startTime = formatDate(values.time[0]);
    values.endTime = formatDate(values.time[1]);
    delete values.time;
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
    const { roleList } = this.props;
    const search = this.state;
    return (
      <div className="searchBar">
        <Form layout="inline">
          <Row>
            <FormItem label="姓名">
              <Input value={search.realName} onChange={(value) => { this.handleChange('realName', value); }} placeholder="请输入" />
            </FormItem>
            <FormItem label="手机号码">
              <Input value={search.phone} onChange={(value) => { this.handleChange('phone', value); }} placeholder="请输入" />
            </FormItem>
            <FormItem label="角色">
              <Select value={`${search.roleIds}`} onChange={(value) => { this.handleChange('roleIds', value); }} placeholder="请选择" >
                <Option value="">全部</Option>
                {roleList.map(({ id, name }) => (<Option key={id} value={`${id}`}>{name}</Option>))}
              </Select>
            </FormItem>
            <FormItem label="就诊时间">
              <RangePicker value={search.time} onChange={(value) => { this.handleChange('time', value); }} />
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

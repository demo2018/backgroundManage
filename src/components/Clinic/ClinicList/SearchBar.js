import { Form, Button, Row, Input, Select, DatePicker, Cascader } from 'antd';
import { isShow } from 'configs/constants';
import { formatDate, getDateRangeValue } from 'utils/common';
import sitelist from 'utils/sitelist.js';

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
              <FormItem label="诊所名称">
                <Input value={search.name} onChange={(value) => { this.handleChange('name', value); }} placeholder="请输入诊所名称" />
              </FormItem>
              <FormItem label="区域">
                <Cascader value={search.site} options={sitelist} onChange={(value) => { this.handleChange('site', value); }} placeholder="请选择区域" changeOnSelect />
              </FormItem>
              <FormItem label="诊所负责人">
                <Input value={search.leader} onChange={(value) => { this.handleChange('leader', value); }} placeholder="请输入负责人" />
              </FormItem>
              <FormItem label="诊所电话">
                <Input value={search.telephone} onChange={(value) => { this.handleChange('telephone', value); }} placeholder="请输入诊所电话" />
              </FormItem>
              <FormItem label="日期">
                <RangePicker value={search.date} onChange={(value) => { this.handleChange('date', value); }} />
              </FormItem>
              <FormItem label="是否启用">
                <Select value={`${search.isEnable}`} onChange={(value) => { this.handleChange('isEnable', value); }} placeholder="请选择" >
                  <Option value="">全部</Option>
                  {isShow.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
                </Select>
              </FormItem>
              <FormItem label="薄荷对接人">
                <Input value={search.boheJoin} onChange={(value) => { this.handleChange('boheJoin', value); }} placeholder="请输入薄荷对接人" />
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

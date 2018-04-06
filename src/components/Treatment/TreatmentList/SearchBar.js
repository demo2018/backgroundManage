import { Form, Button, Row, Input, Select, DatePicker } from 'antd';
import { treatmentStatus, treatmentType, ageType } from 'configs/constants';
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
    if (values.age == 0 && values.age != '') {
      onSearch({ ...values, pn: 1, startAge: 0, endAge: 5 });
    } else if (values.age == 1) {
      onSearch({ ...values, pn: 1, startAge: 6, endAge: 14 });
    } else if (values.age == 2) {
      onSearch({ ...values, pn: 1, startAge: 15, endAge: 30 });
    } else if (values.age == 3) {
      onSearch({ ...values, pn: 1, startAge: 30, endAge: 60 });
    } else if (values.age == 4) {
      onSearch({ ...values, pn: 1, startAge: 60, endAge: 150 });
    } else {
      onSearch({ ...values, pn: 1, startAge: '', endAge: '' });
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
    const { itemList } = this.props;
    const search = this.state;
    return (
      <div>
        <div className="searchBar">
          <Form layout="inline">
            <Row>
              <FormItem label="就诊人姓名">
                <Input value={search.customerName} onChange={(value) => { this.handleChange('customerName', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="手机号码">
                <Input value={search.phone} onChange={(value) => { this.handleChange('phone', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="就诊项目">
                <Select value={`${search.itemClassId}`} onChange={(value) => { this.handleChange('itemClassId', value); }} placeholder="请选择" >
                  <Option value="">全部</Option>
                  {itemList.map(({ id, className }) => (<Option key={id} value={`${id}`}>{className}</Option>))}
                </Select>
              </FormItem>
              <FormItem label="医生">
                <Input value={search.doctorName} onChange={(value) => { this.handleChange('doctorName', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="机构名称">
                <Input value={search.customerOrg} onChange={(value) => { this.handleChange('customerOrg', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="诊所名称">
                <Input value={search.hospitalName} onChange={(value) => { this.handleChange('hospitalName', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="就诊状态">
                <Select value={`${search.status}`} onChange={(value) => { this.handleChange('status', value); }} placeholder="请选择" >
                  <Option value="">全部</Option>
                  {treatmentStatus.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
                </Select>
              </FormItem>
              <FormItem label="就诊时间">
                <RangePicker value={search.time} onChange={(value) => { this.handleChange('time', value); }} />
              </FormItem>
              <FormItem label="年龄阶段">
                <Select value={`${search.age}`} onChange={(value) => { this.handleChange('age', value); }} placeholder="请选择" >
                  <Option value="">全部</Option>
                  {ageType.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
                </Select>
              </FormItem>
              <FormItem label="初/复诊">
                <Select value={`${search.type}`} onChange={(value) => { this.handleChange('type', value); }} placeholder="请选择" >
                  <Option value="">全部</Option>
                  {treatmentType.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
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

import { Form, Button, Row, Input, Select, DatePicker } from 'antd';
import { doctorStatus, doctorSource } from 'configs/constants';
import { formatDate, getDateRangeValue } from 'utils/common';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

const getStateBySearch = (search = {}) => {
  const { createStartTime, createEndTime } = search;
  return {
    ...search,
    addDate: getDateRangeValue(createStartTime, createEndTime),
  };
};

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
  handleSearch() {
    const { onSearch } = this.props;
    const values = this.state;
    values.createStartTime = formatDate(values.addDate[0]);
    values.createEndTime = formatDate(values.addDate[1]);
    delete values.addDate;
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
                <Input value={search.realName} onChange={(value) => { this.handleChange('realName', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="手机号码">
                <Input value={search.phone} onChange={(value) => { this.handleChange('phone', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="邀请人">
                <Input value={search.recommendName} onChange={(value) => { this.handleChange('recommendName', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="医生ID">
                <Input value={search.id} onChange={(value) => { this.handleChange('id', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="来源">
                <Select value={search.source} onChange={(value) => { this.handleChange('source', value); }} placeholder="请选择" >
                  <Option value="">全部</Option>
                  {doctorSource.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
                </Select>
              </FormItem>
              <FormItem label="执业医院">
                <Input value={search.hospitalName} onChange={(value) => { this.handleChange('hospitalName', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="擅长项目">
                <Input value={search.adept} onChange={(value) => { this.handleChange('adept', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="状态">
                <Select value={search.status} onChange={(value) => { this.handleChange('status', value); }} placeholder="请选择" >
                  <Option value="">全部</Option>
                  {doctorStatus.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
                </Select>
              </FormItem>
              <FormItem label="入驻日期">
                <RangePicker value={search.addDate} onChange={(value) => { this.handleChange('addDate', value); }} />
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

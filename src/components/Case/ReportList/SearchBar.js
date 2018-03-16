import { Form, Button, Row, Input, Select, DatePicker } from 'antd';
import { treatmentStatus, treatmentType } from 'configs/constants';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

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
  handleChange(key) {
    return (value) => {
      if (value.target) {
        value = value.target.value;
      }
      this.setState({ [key]: value });
    };
  }
  render() {
    const search = this.state;
    return (
      <div>
        <div className="searchBar">
          <Form layout="inline">
            <Row>
              <FormItem label="初筛报告ID">
                <Input value={search.name1} onChange={this.handleChange('name1')} placeholder="请输入" />
              </FormItem>
              <FormItem label="姓名">
                <Input value={search.name2} onChange={this.handleChange('name2')} placeholder="请输入" />
              </FormItem>
              <FormItem label="手机号">
                <Input value={search.name3} onChange={this.handleChange('name3')} placeholder="请输入" />
              </FormItem>
              <FormItem label="性别">
                <Select value={search.treatmentStatus1} onChange={this.handleChange('treatmentStatus1')} placeholder="请选择" >
                  {treatmentStatus.map(({ label, value }) => (<Option key={value} value={value}>{label}</Option>))}
                </Select>
              </FormItem>
              <FormItem label="日期">
                <RangePicker value={search.treatmentStatus2} onChange={this.handleChange('treatmentStatus2')} />
              </FormItem>
              <FormItem label="机构名称">
                <Select value={search.treatmentStatus3} onChange={this.handleChange('treatmentStatus3')} placeholder="请选择" >
                  {treatmentStatus.map(({ label, value }) => (<Option key={value} value={value}>{label}</Option>))}
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

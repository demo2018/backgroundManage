import { Form, Button, Row, Select } from 'antd';
import { itemStatus } from 'configs/constants';

const FormItem = Form.Item;
const Option = Select.Option;

// 搜索框初始化
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
  // 触发搜索事件
  handleSearch() {
    const { onSearch } = this.props;
    const values = this.state;
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
            <FormItem label="折扣状态">
              <Select value={`${search.status}`} onChange={(value) => { this.handleChange('status', value); }} placeholder="请选择" >
                <Option value="">全部</Option>
                {itemStatus.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
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

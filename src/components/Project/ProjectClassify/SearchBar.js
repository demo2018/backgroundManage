import { Form, Button, Row, Input, Select, Tabs } from 'antd';
import { itemStatus } from 'configs/constants';

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

const tabs = [
  {
    label: '医生端',
    value: '0',
  },
  {
    label: '患者端',
    value: '1'
  },
];
// 搜索框初始化
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.search;
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
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
  // 监听tab切换事件
  handleTabChange(tabKey) {
    this.props.onTabChange(tabKey);
  }
  // 页面渲染
  render() {
    const search = this.state;
    const { tabKey } = this.props;
    return (
      <div>
        <Tabs activeKey={tabKey} onChange={this.handleTabChange}>
          {
            tabs.map(({ label, value }) => {
              return <TabPane tab={label} key={value} />;
            })
          }
        </Tabs>
        <div className="searchBar">
          <Form layout="inline">
            <Row>
              <FormItem label="分类名称">
                <Input value={search.name} onChange={(value) => { this.handleChange('name', value); }} placeholder="请输入" />
              </FormItem>
              <FormItem label="状态">
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
      </div>
    );
  }
}
export default Form.create()(SearchBar);

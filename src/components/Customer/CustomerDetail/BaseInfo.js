import moment from 'moment';
import { Form, Input, Select, DatePicker } from 'antd';
import { genderType, sourceStatus } from 'configs/constants';
import { toString } from 'utils/common';
const FormItem = Form.Item;
const Option = Select.Option;

// 格式化时间格式
const getStateByDetails = (details = {}) => {
  const { birthday } = details;
  return {
    ...details,
    birthday: birthday ? moment(birthday) : null, // 日期组件只支持传入moment对象
  };
};

// 格式化时间格式
const getDetailByStates = (details = {}) => {
  const { birthday } = details;
  return {
    ...details,
    birthday: birthday ? toString(birthday, 'YYYY-MM-DD') : undefined, // 日期组件只支持传入moment对象
  };
};

// 页面参数初始化
class BaseInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = getStateByDetails(props.details);
  }
  componentWillReceiveProps(nextProps) {
    if ('details' in nextProps && nextProps.details !== this.props.details) {
      this.setState({ ...getStateByDetails(nextProps.details) });
    }
  }
  // 监听页面value值变更事件
  handleChange(key, value) {
    if (value.target) {
      value = value.target.value;
    }
    this.setState({ [key]: value }, () => {
      this.handleTriggerChange();
    });
  }
  // 更新页面参数
  handleTriggerChange() {
    const details = this.state;
    this.props.onChange(getDetailByStates(details));
  }
  // 页面渲染
  render() {
    const search = this.state || {};
    return (
      <div className="searchBar">
        <h3 className="title">基本信息</h3>
        <Form layout="inline">
          <div>
            <div className="searchWrap">
              <FormItem label="用户头像" className="avatars">
                <img src={search.icon} alt="" />
              </FormItem>
              <FormItem label="用户名">
                <Input value={search.nickName} onChange={(value) => { this.handleChange('nickName', value); }} placeholder="选填" />
              </FormItem>
            </div>
            <div className="searchWrap">
              <FormItem label="姓名" className="firstLine">
                <Input value={search.realName} onChange={(value) => { this.handleChange('realName', value); }} placeholder="选填" />
              </FormItem>
              <FormItem label="性别">
                {/* 下拉组件只支持字符串类型，需要手动将数字类型转换为字符串类型 */}
                <Select value={`${search.gender}`} onChange={(value) => { this.handleChange('gender', value); }} placeholder="请选择" >
                  {genderType.map(({ label, value }) => (<Option key={`${value}`} value={`${value}`}>{label}</Option>))}
                </Select>
              </FormItem>
            </div>
            <div className="searchWrap">
              <FormItem label="年龄" className="firstLine">
                <Input value={search.age} onChange={(value) => { this.handleChange('age', value); }} placeholder="选填" />
              </FormItem>
              <FormItem label="出生日期">
                <DatePicker value={search.birthday} onChange={(value) => { this.handleChange('birthday', value); }} />
              </FormItem>
            </div>
          </div>

          <FormItem label="来源">
            <Select value={`${search.source}`} onChange={(value) => { this.handleChange('source', value); }} placeholder="请选择" >
              {sourceStatus.map(({ label, value }) => (<Option key={`${value}`} value={`${value}`}>{label}</Option>))}
            </Select>
          </FormItem>
          <FormItem label="手机号码">
            <Input value={search.phone} onChange={(value) => { this.handleChange('phone', value); }} placeholder="选填" />
          </FormItem>
          <FormItem label="机构名称">
            <Input value={search.org} onChange={(value) => { this.handleChange('org', value); }} placeholder="选填" />
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default Form.create()(BaseInfo);

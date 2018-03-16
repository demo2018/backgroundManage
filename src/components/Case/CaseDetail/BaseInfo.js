import { Form, Input, Select, DatePicker } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class BaseInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="baseInfo part">
        <div className="title"><h3>基本信息</h3></div>
        <div className="content">
          <Form layout="inline">
            <FormItem label="姓名">
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '该字段不能为空',
                }],
              })(
                <Input />
                )}
            </FormItem>
            <FormItem label="就诊时间">
              {getFieldDecorator('phone222', {
                rules: [{
                  required: true, message: '该字段不能为空',
                }],
              })(
                <DatePicker />
                )}
            </FormItem>

            <FormItem label="医生">
              {getFieldDecorator('organization', {
              })(
                <Select >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
                )}
            </FormItem>

            <FormItem label="机构名称" >
              {getFieldDecorator('organization2', {
              })(
                <Select >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
                )}
            </FormItem>
            <FormItem label="诊断项目" >
              {getFieldDecorator('organization2', {
              })(
                <Select >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
                )}
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

export default BaseInfo;

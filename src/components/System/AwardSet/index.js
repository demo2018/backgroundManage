import { Form, Button, Input, Radio } from 'antd';
import styles from './awardSet.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class AwardSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.details;
  }
  componentWillReceiveProps(nextProps) {
    if ('details' in nextProps && nextProps.details !== this.props.details) {
      this.setState({ ...nextProps.details });
    }
  }
  // 触发提交 判断是新增还是修改
  handleSave() {
    const { form } = this.props;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((err, values) => {
      if (!err) {

      }
    });
  }
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.awardSet}>
        <h3 className="title"> 奖励设置 </h3>
        <Form layout="inline">
          <FormItem label="转诊患者奖励">
            {getFieldDecorator('way', {
              initialValue: 0,
            })(
              <RadioGroup>
                <Radio value={0}>现金</Radio>
                <Radio value={1}>薄荷币</Radio>
                <Input placeholder="元/人" />
              </RadioGroup>
            )}
          </FormItem>
          <FormItem label="邀请医生奖励">
            {getFieldDecorator('rule', {
              initialValue: 0,
            })(
              <RadioGroup>
                <Radio value={0}>现金</Radio>
                <Radio value={1}>薄荷币</Radio>
                <Input placeholder="元/人" />
              </RadioGroup>
              )}
          </FormItem>
          <div className="btnGroup">
            <Button type="primary" onClick={() => { this.handleSave(); }}>保存</Button>
            <Button onClick={() => { this.handleReset(); }} type="danger" ghost>删除</Button>
          </div>
        </Form>
      </div>
    );
  }
}
export default Form.create()(AwardSet);

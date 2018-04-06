import { Form, Button, Input, Radio } from 'antd';
import styles from './awardSet.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
// 页面参数初始化
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
    const { form, toSet } = this.props;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        toSet(values);
      }
    });
  }
  // 页面渲染
  render() {
    const { form, details } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.awardSet}>
        <h3 className="title"> 奖励设置 </h3>
        <Form layout="inline">
          <div className="awardSet">
            <FormItem label="转诊患者奖励">
              {getFieldDecorator('treatmentAward', {
                initialValue: details.treatmentAward,
              })(
                <RadioGroup>
                  <Radio value={0}>现金</Radio>
                  <Radio value={1}>薄荷币</Radio>
                </RadioGroup>
                )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('treatmentNum', {
                initialValue: details.treatmentNum,
              })(
                <Input placeholder="元/人" />
                )}
            </FormItem>
          </div>
          <div className="awardSet">
            <FormItem label="邀请医生奖励">
              {getFieldDecorator('inviteAward', {
                initialValue: details.inviteAward,
              })(
                <RadioGroup>
                  <Radio value={0}>现金</Radio>
                  <Radio value={1}>薄荷币</Radio>
                </RadioGroup>
                )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('inviteNum', {
                initialValue: details.inviteNum,
              })(
                <Input placeholder="元/人" />
                )}
            </FormItem>
          </div>
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

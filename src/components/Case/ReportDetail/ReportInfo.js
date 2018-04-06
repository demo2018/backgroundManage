import { Form, Row, Input, Radio, Checkbox } from 'antd';
import ToothInfo from './ToothInfo.js';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const RadioButton = Radio.Button;
const CheckboxGroup = Checkbox.Group;


class BaseInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const toothInforProps = {
      form
    };
    return (
      <div className="reportInfo part">
        <div className="head">
          <h3>初筛报告</h3>
        </div>
        <div className="content">
          <Form layout="inline">
            <Row>
              <FormItem label="牙周情况">
                {getFieldDecorator('name1111')(
                  <RadioGroup>
                    <Radio value={1}>早期</Radio>
                    <Radio value={2}>中期</Radio>
                    <Radio value={3}>晚期</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="牙列情况">
                {getFieldDecorator('phone2221222')(
                  <RadioGroup>
                    <Radio value={1}>牙齿不齐</Radio>
                    <Radio value={2}>基本整齐</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Row>

          </Form>

          <ToothInfo {...toothInforProps} />

          <div className="subPart">
            <div className="subTitle">
              <h3>主诉：</h3>
            </div>
            <div className="subContent">
              <TextArea />
            </div>
          </div>

          <div className="subPart">
            <div className="subTitle">
              <h3>现病史：</h3>
            </div>
            <div className="subContent">
              <TextArea />
            </div>
          </div>


          <div className="subPart">
            <div className="subTitle">
              <h3>初步印象：</h3>
            </div>
            <div className="subContent partBorder">
              <div className="contenTitle">牙位：<a>请选择牙位</a></div>
              <TextArea />
            </div>
          </div>

          <div className="subPart">
            <div className="subTitle">
              <h3>建议：<a className="addScheme">+添加治疗方案</a></h3>
            </div>
            <div className="subContent partBorder">
              <div className="contenTitle">牙位：<a>请选择牙位</a></div>
              <TextArea />
            </div>
          </div>


        </div>
      </div>
    );
  }
}

export default BaseInfo;

import { Form, Row, Checkbox, Input } from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const CheckboxGroup = Checkbox.Group;

const checkboxOptions = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange1' },
  { label: 'Orange', value: 'Orange2' },
  { label: 'Orange', value: 'Orange3' },
];

class BodyReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className="bodyReport">
        <Form layout="inline" >
          <div className="content">
            <Row>
              <FormItem label="疾病史">
                {getFieldDecorator('name1')(
                  <CheckboxGroup options={checkboxOptions} />
                )}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="身体状态">
                {getFieldDecorator('name2')(
                  <CheckboxGroup options={checkboxOptions} />
                )}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="鼻咽部疾病">
                {getFieldDecorator('name3')(
                  <CheckboxGroup options={checkboxOptions} />
                )}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="不良习惯">
                {getFieldDecorator('name4')(
                  <CheckboxGroup options={checkboxOptions} />
                )}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="不良习惯起止时间">
                {getFieldDecorator('name5')(
                  <CheckboxGroup options={checkboxOptions} />
                )}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="喂养">
                {getFieldDecorator('name6')(
                  <CheckboxGroup options={checkboxOptions} />
                )}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="家族史">
                {getFieldDecorator('name7')(
                  <CheckboxGroup options={checkboxOptions} />
                )}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="因素机制">
                {getFieldDecorator('name8')(
                  <CheckboxGroup options={checkboxOptions} />
                )}
              </FormItem>
            </Row>
          </div>
          <div className="content" style={{ borderTop: '1px solid #dedede' }}>
            <Row>
              <FormItem label="药敏史">
                {getFieldDecorator('name21')(
                  <CheckboxGroup options={checkboxOptions} />
                )}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="长期服用药物">
                {getFieldDecorator('name22')(
                  <TextArea />
                )}
              </FormItem>
            </Row>
          </div>
        </Form>
      </div>

    );
  }
}

export default BodyReport;

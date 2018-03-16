import { Radio, Checkbox } from 'antd';
import ToothPicker from 'components/Common/ToothPicker';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const checkboxOptions = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange1' },
  { label: 'Orange', value: 'Orange2' },
  { label: 'Orange', value: 'Orange3' },
  { label: 'Orange', value: 'Orange4' },
  { label: 'Orange', value: 'Orange5' },
  { label: 'Orange', value: 'Orange6' },
  { label: 'Orange', value: 'Orange7' },
  { label: 'Orange', value: 'Orange8' },
  { label: 'Orange', value: 'Orange9' },
  { label: 'Orange', value: 'Orange10' },
];

class ToothInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave() {
    const { form } = this.props;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  }
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className="toothInfo subPart">
        <div className="subTitle">
          <h3>牙位情况：</h3>
        </div>
        <div className="subContent partBorder">
          <div className="toothPickerWrapper">
            {getFieldDecorator('toothPicker')(
              <ToothPicker />
            )}
          </div>
          <div className="toothInfoWrapper">
            <div className="toothType">
              <RadioGroup defaultValue="a">
                <RadioButton value="a">成人牙位图</RadioButton>
                <RadioButton value="b">混合牙位图</RadioButton>
                <RadioButton value="c">幼儿牙位图</RadioButton>
              </RadioGroup>
            </div>
            <div>
              <h3>请选择左边的牙齿,进行添加</h3>
              <CheckboxGroup options={checkboxOptions} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToothInfo;

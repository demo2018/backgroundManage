import { Radio, Button, Checkbox, Modal } from 'antd';
import { adultSymptoms, childSymptoms, mixSymptoms } from 'configs/constants';
import ToothPicker from 'components/Common/ToothPicker';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const CheckboxGroup = Checkbox.Group;

// 组合症状
const symptomTypes = {
  a: adultSymptoms,
  b: childSymptoms,
  c: mixSymptoms,
};

class ToothReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toothType: 'a',
      seletedTooths: [],
      seletedSymptoms: [],
    };
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleToothChange = this.handleToothChange.bind(this);
    this.handleSymptomChange = this.handleSymptomChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleTypeChange(e) {
    this.setState({
      toothType: e.target.value,
      seletedTooths: [],
      seletedSymptoms: [],
      selectedSymptomTooths: {},
    });
  }
  handleToothChange(seletedTooths) {
    this.setState({ seletedTooths });
  }
  handleSymptomChange(checkedValues) {
    this.setState({
      seletedSymptoms: checkedValues,
    });
  }
  handleAdd() {
    const { seletedTooths, seletedSymptoms, selectedSymptomTooths = {} } = this.state;
    if (!seletedTooths.length || !seletedSymptoms.length) {
      Modal.warning({
        title: '操作提示',
        content: '请选择牙齿与症状',
      });
      return false;
    }
    seletedTooths.forEach((tooth) => {
      const newSymptomTooths = (selectedSymptomTooths[tooth] || []).concat(seletedSymptoms);
      selectedSymptomTooths[tooth] = [...new Set(newSymptomTooths)];
    });
    this.setState({
      selectedSymptomTooths,
      seletedTooths: [],
      seletedSymptoms: [],
    });
  }
  handleSave() {
    const { selectedSymptomTooths = {} } = this.state;
    console.log('牙齿数据', selectedSymptomTooths);
  }
  renderSymptomTooths() {
    const { selectedSymptomTooths = {} } = this.state;

    const symptomTooths = {};
    Object.keys(selectedSymptomTooths).forEach((tooth) => {
      const symptoms = selectedSymptomTooths[tooth] || [];
      symptoms.forEach((symptom) => {
        if (!symptomTooths[symptom]) {
          symptomTooths[symptom] = [];
        }
        symptomTooths[symptom].push(tooth);
      });
    });

    return Object.keys(symptomTooths).map((key, index) => {
      const tooths = (symptomTooths[key] || []).join(',');
      return (<div key={index} className="filedItem">
        <span className="filedName">{tooths}</span>
        <span className="filedValue">{key}</span>
      </div>);
    });
  }
  render() {
    const { toothType, seletedTooths, seletedSymptoms, selectedSymptomTooths = {} } = this.state;
    const toothPickerProps = {
      toothType,
      choosed: Object.keys(selectedSymptomTooths),
      value: seletedTooths,
      onChange: this.handleToothChange
    };
    return (
      <div className="toothInfo subPart">
        <div className="toothType">
          <RadioGroup value={toothType} onChange={this.handleTypeChange}>
            <RadioButton value="a">成人牙位图</RadioButton>
            <RadioButton value="b">混合牙位图</RadioButton>
            <RadioButton value="c">幼儿牙位图</RadioButton>
          </RadioGroup>
        </div>
        <div className="subContent">
          <div className="toothPickerWrapper">
            <ToothPicker {...toothPickerProps} />
          </div>
          <div className="toothInfoWrapper">
            <div>
              <h3>请选择左边的牙齿,进行添加</h3>
              <CheckboxGroup value={seletedSymptoms} onChange={this.handleSymptomChange} options={symptomTypes[toothType]} />
              <div>
                <Button onClick={this.handleAdd} type="primary">新增牙位</Button>
              </div>
            </div>
            <div>
              <h3>已选中牙位症状</h3>
              <div className="toothSelected">
                {this.renderSymptomTooths()}
              </div>
              <div>
                <Button onClick={this.handleSave} type="primary">保存信息</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToothReport;

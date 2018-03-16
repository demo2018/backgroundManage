import { Form, Row, Input, Radio, Checkbox } from 'antd';

const TextArea = Input.TextArea;


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

class BaseInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seletedTooth: [],
    };
    this.handleChangeTooth = this.handleChangeTooth.bind(this);
  }
  handleChangeTooth(seletedTooth) {
    this.setState({ seletedTooth });
  }
  render() {
    const { seletedTooth } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const toothPickerProps = {
      value: seletedTooth,
      onchange: this.handleChangeTooth
    };
    return (
      <div className="diagnoseInfo part">
        <div className="content">

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
              <h3>既往史：</h3>
            </div>
            <div className="subContent">
              <TextArea />
            </div>
          </div>

          <div className="subPart">
            <div className="subTitle">
              <h3>检查</h3>
            </div>
            <div className="subContent partBorder">
              <div className="contenTitle">
                <p>
                  <span className="filedItem">
                    <span className="filedName">项目</span>
                    <span className="filedValue">补牙</span>
                  </span>
                  <span className="filedItem">
                    <span className="filedName">诊断分类</span>
                    <span className="filedValue">补牙</span>
                  </span>
                  <span>诊断分类:牙龈炎慢性龈炎</span>
                </p>
                <label > 牙位：<a>请选择牙位</a></label>
              </div>
              <TextArea />
            </div>
          </div>

          <div className="subPart">
            <div className="subTitle">
              <h3>诊断：</h3>
            </div>
            <div className="subContent partBorder">
              <div className="contenTitle">牙位：<a>请选择牙位</a></div>
              <TextArea />
            </div>
          </div>

          <div className="subPart">
            <div className="subTitle">
              <h3>处置：</h3>
            </div>
            <div className="subContent partBorder">
              <div className="contenTitle">
                <p>
                  <span className="filedItem">
                    <span className="filedName">项目</span>
                    <span className="filedValue">补牙</span>
                  </span>
                  <span className="filedItem">
                    <span className="filedName">诊断分类</span>
                    <span className="filedValue">牙龈炎慢性龈炎</span>
                  </span>
                  <span>诊断分类:牙龈炎慢性龈炎</span>
                </p>
              </div>
              <TextArea />
            </div>
          </div>

          <div className="subPart">
            <div className="subTitle">
              <h3>医嘱：</h3>
            </div>
            <div className="subContent partBorder">
              <TextArea />
            </div>
          </div>
        </div >
      </div >
    );
  }
}

export default BaseInfo;

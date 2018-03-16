import { Input } from 'antd';
const { TextArea } = Input;

class FirstTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyDetail: {},
      departDetail: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('entModalVisible' in nextProps) {
      this.setState({ entModalVisible: nextProps.entModalVisible });
      if (!nextProps.entModalVisible) {
        this.setState({ companyDetail: {} });
      }
    }
  }
  render() {
    return (
        <div className="templateItem">
          <div className="templateTitle">
            <span>急性根尖牙周炎</span>
            <a>保存</a>
          </div>
          <div className="content">
              <div className="part">
                <h3 className="subTitle">复诊：</h3>
                <TextArea />
              </div>
              <div className="part">
                <h3 className="subTitle">检查：</h3>
                <TextArea />
              </div>
              <div className="part">
                <h3 className="subTitle">治疗：</h3>
                <TextArea />
              </div>
              <div className="part">
                <h3 className="subTitle">医嘱：</h3>
                <TextArea />
              </div>
          </div>
        </div>
    );
  }
}

export default FirstTemplate;

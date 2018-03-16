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
                <h3 className="subTitle">主诉：</h3>
                <TextArea />
              </div>
              <div className="part">
                <h3 className="subTitle">现病史：</h3>
                <TextArea />
              </div>
              <div className="part">
                <h3 className="subTitle">既往史：</h3>
                <p>无需添加</p>
              </div>
              <div className="part">
                <h3 className="subTitle">检查：</h3>
                <TextArea />
              </div>
              <div className="part">
                <h3 className="subTitle">诊断：</h3>
                <p>无需添加</p>
              </div>
              <div className="part">
                <h3 className="subTitle">治疗：</h3>
                <TextArea />
              </div>
          </div>
        </div>
    );
  }
}

export default FirstTemplate;

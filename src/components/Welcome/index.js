import { Row, Col } from 'antd';
import styles from './index.less';
import cookie from 'js-cookie';

const weekZn = {
  0: ' 一',
  1: ' 二',
  2: ' 三',
  3: ' 四',
  4: ' 五',
  5: ' 六',
  6: ' 日',
};

const getTime = () => {
  const now = new Date(); //  获取当前时间
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const week = now.getDay();
  let nowtime = now.toLocaleTimeString();
  return (
    <p>{year}年{month}月{day}日 星期{weekZn[week]} {nowtime}</p>
  );
};

// 页面参数初始化
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      modalVisible: false,
      time: getTime(),
    };
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: getTime() });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  // 页面渲染
  render() {
    const { time } = this.state;
    return (
      <div className={styles.Welcome}>
        <div className="welcomeHead">
          欢迎，{cookie.get('username')}!{time}
        </div>
        <div className="separatedLine">统计数据</div>
        <div className="gutter">
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">
                <p>今日新增注册 <span className="startCount">28</span> <span className="new">+3</span></p>
                <p>总注册量 2357</p>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">
                <p>今日新增预约 <span className="startCount">28</span> <span className="new">+3</span></p>
                <p>总预约人次 2357</p>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box">
                <p>今日新入驻医生 <span className="startCount">28</span> <span className="new">+3</span></p>
                <p>总入驻医生 2357</p>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="gutter-box last">
                <p>今日新增流水 <span className="startCount">28</span> <span className="new">+3</span></p>
                <p>本月流水 2357</p>
              </div>
            </Col>
          </Row>
        </div>
        <div className="tip">*注：绿色数字为同比昨日新增数据</div>
      </div>
    );
  }
}

export default Welcome;

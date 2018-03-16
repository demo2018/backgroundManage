import { Row, Timeline } from 'antd';
import styles from './doctorProgress.less';

class CustomerDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.doctorProgress}>
        <div className="part">
          <div className="title"><h3>医生信息</h3></div>
          <div className="baseInfo">
            <div className="imgWraper">
              <img src="" alt="" />
            </div>
            <div className="filedsWraper">
              <Row>
                <div className="filedItem">
                  <span className="filedName">医生姓名</span>
                  <span className="filedValue">张晴（邀请ID：45940）</span>
                </div>
                <div className="filedItem">
                  <span className="filedName">状态</span>
                  <span className="filedValue">已认证</span>
                </div>
              </Row>
              <Row>
                <div className="filedItem">
                  <span className="filedName">手机号码</span>
                  <span className="filedValue">18004025391</span>
                </div>
              </Row>
              <Row>
                <div className="filedItem">
                  <span className="filedName">邀请医生</span>
                  <span className="filedValue">刘静</span>
                </div>
              </Row>
            </div>
          </div>
        </div>
        <div className="part">
          <div className="title"><h3>邀请记录</h3></div>
          <div className="auditLogs">
            <Timeline>
              <Timeline.Item>
                <p>已获得邀请链接</p>
                <p>2017-03-08 10：52</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>已获得邀请链接</p>
                <p>2017-03-08 10：52</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>已获得邀请链接</p>
                <p>2017-03-08 10：52</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>已获得邀请链接</p>
                <p>2017-03-08 10：52</p>
              </Timeline.Item>
            </Timeline>
          </div>
        </div>
      </div >
    );
  }
}

export default CustomerDetail;

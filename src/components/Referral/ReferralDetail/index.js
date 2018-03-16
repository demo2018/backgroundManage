import { Row, Timeline } from 'antd';
import styles from './referralDetail.less';

class ReferralDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.referralDetail}>
        <div className="part">
          <div className="title"><h3>医生信息</h3></div>
          <div className="baseInfo">
            <div className="imgWraper">
              <img src="" alt="" />
            </div>
            <div className="filedsWraper">
              <Row>
                <div className="filedItem">
                  <span className="filedName">姓名</span>
                  <span className="filedValue">张晴（转诊ID：45940）</span>
                </div>
                <div className="filedItem">
                  <span className="filedName">状态</span>
                  <span className="filedValue">转诊成功-已支付</span>
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
                  <span className="filedName">转诊医生</span>
                  <span className="filedValue">张曦</span>
                </div>
              </Row>
            </div>
          </div>
        </div>
        <div className="part">
          <div className="title"><h3>转诊记录</h3></div>
          <div className="auditLogs">
            <Timeline>
              <Timeline.Item>
                <p>已完成扫描张曦医生二维码</p>
                <p>2017-03-08 10：52</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>咨询中</p>
                <p>2017-03-08 10：52</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>已注册成为薄荷牙医会员</p>
                <p>2017-03-08 10：52</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>已预约南哲医生，2017年3月5日治疗拔牙项目</p>
                <p>2017-03-08 10：52</p>
              </Timeline.Item>
            </Timeline>
          </div>
        </div>
      </div >
    );
  }
}

export default ReferralDetail;

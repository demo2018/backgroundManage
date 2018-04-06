import { Row, Timeline } from 'antd';
import { referralStatus } from 'configs/constants';
import { toString, getServer } from 'utils/common';
import styles from './referralDetail.less';
// 页面参数初始化
class ReferralDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // 页面渲染
  render() {
    const { details } = this.props;
    const { disease } = getServer();

    const status = referralStatus.map(({ value, label }) => {
      return value == details.status ? label : null;
    });

    const loglist = (details.logs || []).map(({ id, content, createTime }) => {
      if (id == details.logs[0].id) {
        return <Timeline.Item key={id}><p>{content}</p><p>{toString(createTime, 'YYYY-MM-DD HH:mm')}</p></Timeline.Item>;
      } else {
        return <Timeline.Item key={id} color="#e9e9e9"><p>{content}</p><p>{toString(createTime, 'YYYY-MM-DD HH:mm')}</p></Timeline.Item>;
      }
    });

    return (
      <div className={styles.referralDetail}>
        <div className="part">
          <div className="head"><h3>医生信息</h3></div>
          <div className="baseInfo">
            <div className="imgWraper">
              <img src={`${disease}/bhyy/core/image/${details.doctorIcon}`} alt="" />
            </div>
            <div className="filedsWraper">
              <Row>
                <div className="filedItem">
                  <span className="filedName">姓名</span>
                  <span className="filedValue">{details.customerName}（转诊ID：{details.id}）</span>
                </div>
                <div className="filedItem">
                  <span className="filedName">状态</span>
                  <span className="filedValue">{status}</span>
                </div>
              </Row>
              <Row>
                <div className="filedItem">
                  <span className="filedName">手机号码</span>
                  <span className="filedValue">{details.customerPhone}</span>
                </div>
              </Row>
              <Row>
                <div className="filedItem">
                  <span className="filedName">转诊医生</span>
                  <span className="filedValue">{details.doctorName}</span>
                </div>
              </Row>
            </div>
          </div>
        </div>
        <div className="part">
          <div className="head"><h3>转诊记录</h3></div>
          <div className="auditLogs">
            <Timeline>
              {loglist}
            </Timeline>
          </div>
        </div>
      </div >
    );
  }
}

export default ReferralDetail;

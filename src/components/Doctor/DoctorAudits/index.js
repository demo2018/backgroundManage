import { Row, Form, Input, Select, Button, Tag } from 'antd';
import styles from './doctorAudit.less';

const FormItem = Form.Item;
const Option = Select.Option;

class CustomerDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleAudit = this.handleAudit.bind(this);
  }
  handleAudit() {
    const { form, toAudit, details } = this.props;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((err, values) => {
      if (!err && details.id) {
        toAudit(values, details.id);
      }
    });
  }
  render() {
    const { form, details, goback } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.doctorDetail}>
        <div className="baseInfo part">
          <div className="title">
            <h3>基本信息</h3>
          </div>
          <div className="content">
            <div className="imgWraper">
              <img className="doctorImg" src="{details.icon}" alt="" />
              <h4>医生头像</h4>
            </div>
            <div className="filedsWraper">
              <Form layout="inline">
                <Row>
                  <div className="filedItem">
                    <span className="filedName">姓名</span>
                    <span className="filedValue">{details.realName}</span>
                  </div>
                  <div className="filedItem">
                    <span className="filedName">手机号码</span>
                    <span className="filedValue">{details.phone}</span>
                  </div>
                </Row>
                <Row>
                  <div className="filedItem">
                    <span className="filedName">性别</span>
                    <span className="filedValue">{details.gender == 1 ? '男' : '女'}</span>
                  </div>
                  <div className="filedItem">
                    <span className="filedName">学历</span>
                    <span className="filedValue">{details.education}</span>
                  </div>
                </Row>
                <Row>
                  <div className="filedItem">
                    <span className="filedName">出生日期</span>
                    <span className="filedValue">{details.birthday}</span>
                  </div>
                  <div className="filedItem">
                    <span className="filedName">年龄</span>
                    <span className="filedValue">{details.age}</span>
                  </div>
                </Row>
                <Row>
                  <div className="filedItem">
                    <span className="filedName">第一执业机构</span>
                    <span className="filedValue">{details.age}</span>
                  </div>
                  <div className="filedItem">
                    <span className="filedName">职称</span>
                    <span className="filedValue">{details.title}</span>
                  </div>
                </Row>
                <Row>
                  <div className="filedItem">
                    <span className="filedName">执业年限</span>
                    <span className="filedValue">{details.workYear}年</span>
                  </div>
                  <div className="filedItem">
                    <span className="filedName">擅长领域</span>
                    <span className="filedValue">{details.adept}</span>
                  </div>
                </Row>
                <Row>
                  <div className="filedItem">
                    <span className="filedName">科室</span>
                    <span className="filedValue">
                      <Tag>内科</Tag>
                      <Tag>种植科</Tag>
                      <Tag>正畸科</Tag>
                      <Tag>修复科</Tag>
                    </span>
                  </div>
                </Row>
                <Row>
                  <div className="filedItem">
                    <span className="filedName">服务项目</span>
                    <span className="filedValue">
                      <Tag>内科</Tag>
                      <Tag>种植科</Tag>
                      <Tag>正畸科</Tag>
                      <Tag>修复科</Tag>
                    </span>
                  </div>
                </Row>
                <Row className="textArea">
                  <div className="filedItem">
                    <span className="filedName">简介</span>
                    <span className="filedValue">{details.intro}</span>
                  </div>
                </Row>
                <Row>
                  <div className="filedItem">
                    <span className="filedName">邀请人</span>
                    <span className="filedValue">{details.recommendId}</span>
                  </div>
                </Row>
              </Form>
            </div>
          </div>
        </div>
        <div className="auditInfo part">
          <div className="title"><h3>认证信息</h3></div>
          <div className="content">
            <div className="imgWraper">
              <img className="doctorImg" src="" alt="" />
              <h4>身份证</h4>
            </div>
            <div className="imgWraper">
              <img className="doctorImg" src="" alt="" />
              <h4>执业资格证</h4>
            </div>
            <div className="imgWraper">
              <img className="doctorImg" src="" alt="" />
              <h4>医师资格证</h4>
            </div>
          </div>
        </div>
        <div className="audit part">
          <Form layout="inline">
            <FormItem
              label="审核结果"
            >
              {getFieldDecorator('status', {
                initialValue: `${details.status}`,
                rules: [{
                  required: true, message: '请确定审核结果！',
                }],
              })(
                <Select >
                  <Option value="0">待审核</Option>
                  <Option value="1">审核成功</Option>
                  <Option value="2">审核失败</Option>
                </Select>
                )}
            </FormItem>
            <FormItem label="原因" >
              {getFieldDecorator('failureReason', {
                initialValue: details.failureReason,
                rules: [{
                  required: true, message: '请说明原因！',
                }],
              })(
                <Input />
                )}
            </FormItem>
          </Form>
          <div className="btnGroup">
            <Button type="primary" onClick={this.handleAudit}>保存</Button>
            <Button onClick={goback}>取消</Button>
          </div>
        </div>
      </div >
    );
  }
}

export default Form.create()(CustomerDetail);

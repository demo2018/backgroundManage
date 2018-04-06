import { Row, Form, Input, Select, Button, Tag, Modal } from 'antd';
import { getServer, formatDate } from 'utils/common';
import styles from './doctorAudit.less';

const FormItem = Form.Item;
const Option = Select.Option;
const formatSelectValue = (value) => {
  if (value || value === 0) {
    return `${value}`;
  }
};
class DoctorAudits extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previewVisible: false,
      previewImage: '',
      visible: false,
    };
    this.handleAudit = this.handleAudit.bind(this);
    this.handleDoctorChange = this.handleDoctorChange.bind(this);
  }
  // 渲染擅长项目
  getAdepts() {
    const { details, adeptList } = this.props;
    const adeptslist = adeptList
      .filter(({ id }) => {
        return details.adepts && details.adepts.includes(`${id}`);
      })
      .map(({ name }) => {
        return name;
      });
    return adeptslist.map((index) => {
      return <Tag key={index}>{index}</Tag>;
    });
  }
  // 渲染服务项目
  getItems() {
    const { details, itemLists } = this.props;
    const itemslist = itemLists
      .filter(({ id }) => {
        return details.serviceItems && details.serviceItems.includes(`${id}`);
      })
      .map(({ className }) => {
        return className;
      });
    return itemslist.map((index) => {
      return <Tag key={index}>{index}</Tag>;
    });
  }
  // 触发提交审核
  handleAudit() {
    const { form, toAudit, details } = this.props;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((err, values) => {
      if (!err && details.id) {
        toAudit(values, details.id);
      }
    });
  }
  // 触发关闭预览
  handleCancel = () => this.setState({ previewVisible: false })
  // 点击预览图片
  handlePreview = (file) => {
    const { disease } = getServer();
    this.setState({
      previewImage: `${disease}/bhyy/core/image/${file}`,
      previewVisible: true,
    });
  }
  //  选择审核失败时显示必填项：失败原因
  handleDoctorChange(value) {
    if (value == 2) {
      this.setState({ visible: true });
    } else {
      this.setState({ visible: false });
    }
  }
  // 处理图片地址
  renderImage(imageUrlKey) {
    const { details } = this.props;
    const { disease } = getServer();
    return details[imageUrlKey] ? <img src={`${disease}/bhyy/core/image/${details[imageUrlKey]}`} alt="" onClick={() => this.handlePreview(details[imageUrlKey])} /> : <img src="" alt="" />;
  }
  // 渲染页面
  render() {
    const { form, details, goback } = this.props;
    const { previewVisible, previewImage, visible } = this.state;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.doctorAudit}>
        <div className="baseInfo part">
          <div className="head">
            <h3>基本信息</h3>
          </div>
          <div className="content">
            <div className="imgWraper">
              {this.renderImage('icon')}
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
                    <span className="filedValue">{formatDate(details.birthday)}</span>
                  </div>
                  <div className="filedItem">
                    <span className="filedName">年龄</span>
                    <span className="filedValue">{details.age}</span>
                  </div>
                </Row>
                <Row>
                  <div className="filedItem">
                    <span className="filedName">第一执业机构</span>
                    <span className="filedValue">{details.hospitalName}</span>
                  </div>
                  {/* <div className="filedItem">
                    <span className="filedName">职称</span>
                    <span className="filedValue">{details.title}</span>
                  </div> */}
                  <div className="filedItem">
                    <span className="filedName">执业年限</span>
                    <span className="filedValue">{details.workYear}年</span>
                  </div>
                </Row>
                <Row>
                  <div className="filedItem">
                    <span className="filedName">擅长领域</span>
                    <span className="filedValue">
                      {this.getAdepts()}
                    </span>
                  </div>
                </Row>
                <Row>
                  <div className="filedItem">
                    <span className="filedName">科室</span>
                    <span className="filedValue">
                      {(details.departments || [])
                        .map((index) => {
                          return (<Tag
                            key={index}
                          > {index}
                          </Tag>);
                        })}
                    </span>
                  </div>
                </Row>
                <Row>
                  <div className="filedItem">
                    <span className="filedName">服务项目</span>
                    <span className="filedValue">
                      {this.getItems()}
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
          <div className="head"><h3>认证信息</h3></div>
          <div className="content">
            <div className="imgWraper">
              {this.renderImage('idIcon')}
              <h4>身份证正面照</h4>
            </div>
            <div className="imgWraper">
              {this.renderImage('jobIcon1')}
              <h4>执业资格证(第1页)</h4>
            </div>
            <div className="imgWraper">
              {this.renderImage('jobIcon2')}
              <h4>执业资格证(第2页)</h4>
            </div>
            <div className="imgWraper">
              {this.renderImage('doctorIcon')}
              <h4>医师资格证</h4>
            </div>
          </div>
        </div>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <div className="audit part">
          <Form layout="inline">
            <FormItem label="审核结果" >
              {getFieldDecorator('status', {
                initialValue: formatSelectValue(details.status),
                rules: [{
                  required: true, message: '请确定审核结果！',
                }],
              })(
                <Select placeholder="请选择" onChange={this.handleDoctorChange}>
                  <Option value="4">待审核</Option>
                  <Option value="1">审核成功</Option>
                  <Option value="2">审核失败</Option>
                </Select>
              )}
            </FormItem>
            {
              visible
                ? <FormItem label="原因" >
                  {getFieldDecorator('failureReason', {
                    initialValue: details.failureReason,
                    rules: [{
                      required: true, message: '请说明原因！',
                    }],
                  })(
                    <Input placeholder="请输入原因" />
                    )}
                </FormItem>
                : null
            }
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

export default Form.create()(DoctorAudits);

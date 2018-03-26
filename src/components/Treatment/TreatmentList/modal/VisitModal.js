import { Form, Row, Input, Modal, Select } from 'antd';
import { visitType } from 'configs/constants';
import { formatName, toString } from 'utils/common';
import styles from './visitModal.less';
import cookie from 'js-cookie';

const FormItem = Form.Item;
const Option = Select.Option;

const formatSelectValue = (value) => {
  if (value || value === 0) {
    return `${value}`;
  }
};
// 页面初始化
class VisitModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepVisible: false,  // 随访记录状态
    };
    this.handleOk = this.handleOk.bind(this);
  }
  // 触发保存事件 判断是新增 还是修改
  handleOk() {
    const { onOK, onEdit, form, selecteRecord } = this.props;
    const { visitInfo = {} } = this.state;
    form.validateFieldsAndScroll((err, values) => {
      if (!err && !visitInfo.id) {
        onOK({ ...values, appointId: selecteRecord.id, customerId: selecteRecord.customerId });
      }
      if (!err && visitInfo.id) {
        onEdit({ ...values, appointId: selecteRecord.id, customerId: selecteRecord.customerId }, visitInfo.id);
      }
    });
  }
  // 监听页面value值变更事件
  handleChange(key, value) {
    const { visitInfo } = this.state;
    if (value.target) {
      value = value.target.value;
    }
    this.setState({ visitInfo: { ...visitInfo, [key]: value } });
  }
  // 触发随访记录显示隐藏
  showSteps = () => {
    this.setState({ stepVisible: !this.state.stepVisible });
  }
  // 触发随访编辑 替换相关数据
  editVisit(info) {
    this.setState({ visitInfo: { id: info.id, type: info.type, managerId: info.managerId, content: info.content } });
  }
  // 随访列表
  renderVisit(visitList) {
    const { delVisit } = this.props;
    if (visitList != null) {
      return (
        visitList.map(({ id, type, managerName, content, createTime }, index) => (
          <div key={`${id}`}>
            <div className="visitStep">
              <div>
                <div className="ant-form-item-label"><label >随访记录</label></div>
                <span className="ant-form-item-control-wrapper">{content}</span>
              </div>
              <div>
                <div className="ant-form-item-label"><label >随访方式</label></div>
                <span className="ant-form-item-control-wrapper">{type == 1 ? '微信' : '电话'}</span>
              </div>
              <div>
                <div className="ant-form-item-label"><label >客户经理</label></div>
                <span className="ant-form-item-control-wrapper">{managerName}</span>
                <div className="onStep"><a onClick={() => { this.editVisit(visitList[index]); }}>编辑</a> <a className="delete" onClick={() => { delVisit(id); }}>删除</a> </div>
              </div>
            </div>
            <div className="stepTime">{createTime ? toString(createTime) : null}</div>
          </div>))
      );
    } else {
      return (
        <div className="visitStep noVisit">暂无随访记录！</div>
      );
    }
  }
  // 页面渲染
  render() {
    const { stepVisible, visitInfo = {} } = this.state;
    const { onCancel, selecteRecord, visitList, managerList, form } = this.props;
    const { getFieldDecorator } = form;
    const modalOpts = {
      title: '患者随访',
      visible: true,
      maskClosable: false,
      onOk: this.handleOk,
      onCancel,
    };
    return (
      <Modal {...modalOpts}>
        <div className={styles.visitModal}>
          <Form layout={'inline'}>
            <Row>
              <div className="ant-form-item">
                <div className="ant-form-item-label"><label >客户姓名</label></div>
                <span className="ant-form-item-control-wrapper">{formatName(selecteRecord.customerName, selecteRecord.phone)}</span>
              </div>
              <FormItem label="随访方式">
                {getFieldDecorator('type', {
                  initialValue: formatSelectValue(visitInfo.type),
                  rules: [{ required: true, whitespace: true, message: '随访方式不能为空！' }]
                })(
                  <Select onChange={(value) => { this.handleChange('type', value); }} placeholder="请选择" >
                    {visitType.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
                  </Select>
                )}
              </FormItem>
              <FormItem label="客户经理">
                {getFieldDecorator('managerId', {
                  initialValue: formatSelectValue(visitInfo.managerId ? visitInfo.managerId : cookie.get('userid')),
                  rules: [{ required: true, whitespace: true, message: '客户经理不能为空！' }]
                })(
                  <Select onChange={(value) => { this.handleChange('managerId', value); }} placeholder="请选择" disabled>
                    {(managerList || []).map(({ id, realName }) => (<Option key={id} value={`${id}`}>{realName}</Option>))}
                  </Select>
                )}
              </FormItem>
              <FormItem label="随访记录" className="textAreaWraper">
                {getFieldDecorator('content', {
                  initialValue: visitInfo.content,
                  rules: [{ required: true, whitespace: true, message: '随访记录不能为空！' }]
                })(
                  <Input type="textarea" onChange={(value) => { this.handleChange('content', value); }} placeholder="请输入" />
                )}
              </FormItem>
              <p className="viewSteps" onClick={this.showSteps}>点击查看随访记录</p>
            </Row>
          </Form>
        </div>
        <div className={styles.visit}>
          {stepVisible && this.renderVisit(visitList)}
        </div>
      </Modal>
    );
  }
}

export default Form.create()(VisitModal);

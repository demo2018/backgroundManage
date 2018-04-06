import { Form, Row, Input, Modal, Select } from 'antd';
import { followType } from 'configs/constants';
import { formatName, toString } from 'utils/common';
import styles from './followModal.less';
import cookie from 'js-cookie';

const FormItem = Form.Item;
const Option = Select.Option;

const formatSelectValue = (value) => {
  if (value || value === 0) {
    return `${value}`;
  }
};
// 页面初始化
class FollowModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepVisible: false,  // 跟进记录状态
    };
    this.handleOk = this.handleOk.bind(this);
  }
  // 触发保存事件 判断是新增 还是修改
  handleOk() {
    const { onOK, onEdit, form, selecteRecord } = this.props;
    const { followInfo = {} } = this.state;
    form.validateFieldsAndScroll((err, values) => {
      if (!err && !followInfo.id) {
        onOK({ ...values, opinionId: selecteRecord.id });
      }
      // if (!err && followInfo.id) {
      //   onEdit({ ...values, opinionId: selecteRecord.id }, followInfo.id);
      // }
    });
  }
  // 监听页面value值变更事件
  handleChange(key, value) {
    const { followInfo } = this.state;
    if (value.target) {
      value = value.target.value;
    }
    this.setState({ followInfo: { ...followInfo, [key]: value } });
  }
  // 触发跟进记录显示隐藏
  showSteps = () => {
    this.setState({ stepVisible: !this.state.stepVisible });
  }
  // // 触发跟进编辑 替换相关数据
  // editFollow(info) {
  //   this.setState({ followInfo: { id: info.id, type: info.type, managerId: info.managerId, content: info.content } });
  // }
  // 跟进列表
  renderFollow(followList) {
    const { delFollow } = this.props;
    if (followList != null) {
      return (
        followList.map(({ id, type, managerName, content, createTime }, index) => (
          <div key={`${id}`}>
            <div className="followStep">
              <div>
                <div className="ant-form-item-label"><label >跟进记录</label></div>
                <span className="ant-form-item-control-wrapper">{content}</span>
              </div>
              <div>
                <div className="ant-form-item-label"><label >跟进方式</label></div>
                <span className="ant-form-item-control-wrapper">{type == 1 ? '微信' : '电话'}</span>
              </div>
              <div>
                <div className="ant-form-item-label"><label >客户经理</label></div>
                <span className="ant-form-item-control-wrapper">{managerName}</span>
                <div className="onStep">
                  {/* <a onClick={() => { this.editFollow(followList[index]); }}>编辑</a> */}
                  <a className="delete" onClick={() => { delFollow(id); }}>删除</a>
                </div>
              </div>
            </div>
            <div className="stepTime">{createTime ? toString(createTime) : null}</div>
          </div>))
      );
    } else {
      return (
        <div className="followStep noFollow">暂无跟进记录！</div>
      );
    }
  }
  // 页面渲染
  render() {
    const { stepVisible, followInfo = {} } = this.state;
    const { onCancel, selecteRecord, followList, managerList, form } = this.props;
    const { getFieldDecorator } = form;

    const modalOpts = {
      title: '意见反馈跟进',
      visible: true,
      maskClosable: false,
      onOk: this.handleOk,
      onCancel,
    };

    return (
      <Modal {...modalOpts}>
        <div className={styles.followModal}>
          <Form layout={'inline'}>
            <Row>
              <div className="ant-form-item">
                <div className="ant-form-item-label"><label >客户姓名</label></div>
                <span className="ant-form-item-control-wrapper">{formatName(selecteRecord.customerName, selecteRecord.phone)}</span>
              </div>
              <FormItem label="跟进方式">
                {getFieldDecorator('type', {
                  initialValue: formatSelectValue(followInfo.type),
                  rules: [{ required: true, whitespace: true, message: '跟进方式不能为空！' }]
                })(
                  <Select onChange={(value) => { this.handleChange('type', value); }} placeholder="请选择" >
                    {followType.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
                  </Select>
                )}
              </FormItem>
              <FormItem label="客户经理">
                {getFieldDecorator('managerId', {
                  initialValue: formatSelectValue(followInfo.managerId ? followInfo.managerId : cookie.get('userid')),
                  rules: [{ required: true, whitespace: true, message: '客户经理不能为空！' }]
                })(
                  <Select onChange={(value) => { this.handleChange('managerId', value); }} placeholder="请选择" disabled>
                    {(managerList || []).map(({ id, realName }) => (<Option key={id} value={`${id}`}>{realName}</Option>))}
                  </Select>
                )}
              </FormItem>
              <FormItem label="跟进记录" className="textAreaWraper">
                {getFieldDecorator('content', {
                  initialValue: followInfo.content,
                  rules: [{ required: true, whitespace: true, message: '跟进记录不能为空！' }]
                })(
                  <Input type="textarea" onChange={(value) => { this.handleChange('content', value); }} placeholder="请输入" />
                )}
              </FormItem>
              <p className="viewSteps" onClick={this.showSteps}>点击查看跟进记录</p>
            </Row>
          </Form>
        </div>
        <div className={styles.follow}>
          {stepVisible && this.renderFollow(followList)}
        </div>
      </Modal>
    );
  }
}

export default Form.create()(FollowModal);

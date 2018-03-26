import React, { PropTypes } from 'react';
import { Row, Form, Input, Button, Col, Icon } from 'antd';
import './index.less';

const FormItem = Form.Item;

const LoginTheme = {
  normal: 'normal',
  simple: 'center-frame',
  elegant: 'without-frame',
  single: 'outer-frame',
  ample: 'frame'
};
const loginWithFrameThemes = ['simple', 'single'];

function getInputPropsMap(theme) {
  const iconPosition = loginWithFrameThemes.includes(theme) ? 'suffix' : 'prefix';
  const username = {};
  const password = {};
  const phoneNum = {};
  const message = {};
  if (theme !== 'normal') {
    username[iconPosition] = <Icon type="user" />;
    password[iconPosition] = <Icon type="lock" />;
    phoneNum[iconPosition] = <Icon type="mobile" />;
    message[iconPosition] = <Icon type="mail" />;
  }
  return { username, password, phoneNum, message };
}

function getFormItemPropsMap(theme) {
  const username = {};
  const password = {};
  const phoneNum = {};
  const message = {};
  if (theme === 'single') {
    username.label = '用户名';
    password.label = '密码';
    phoneNum.label = '手机号';
    message.label = '手机号';
  }
  return { username, password, phoneNum, message };
}


/**
 * 登陆组件
 *
 * @props siteName 站点名称
 * @props handleLogin 登陆
 * @props handleSendMessage 发送短信
 * @props loading 加载状态
 * @props countNum 倒计时基数
 * @props type 展示登录页面 默认展示使用密码登录
 * @props content 密码输入框和登录按钮之间的内容
 */

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: -1
    };
  }

  handleOk() {
    const { form: { validateFields }, handleLogin, onLogin } = this.props;
    validateFields((errors, values) => {
      if (errors) {
        return;
      }
      onLogin ? onLogin(values) : handleLogin(values);
    });
  }

  handleKeyDownLogin(e) {
    const evt = e || window.event; // 获取event对象

    if (evt.keyCode === 13) {
      this.handleOk();
    }
  }

  verifyCode() {
    const { form: { validateFields }, onSendMessage } = this.props;
    validateFields(['phoneNum'], (errors, values) => {
      if (errors) {
        return;
      }
      this.setState({
        seconds: this.props.seconds
      }, () => this.startCountDown());
      onSendMessage(values);
    });
  }

  startCountDown() {
    let { seconds } = this.state;
    const countDownId = setInterval(() => {
      if (!seconds) {
        clearInterval(countDownId);
      }
      this.setState({
        seconds: --seconds,
      });
    }, 1000);
  }
  renderLoginForm() {
    const { siteName, content, loading, form, type = 'password', theme = 'NORMAL' } = this.props;

    const { countNum, seconds } = this.state;
    const { getFieldDecorator } = form;

    const inputPropsMap = getInputPropsMap(theme);
    const formItemPropsMap = getFormItemPropsMap(theme);

    return (
      <div className="h-login-form">
        <div className="h-login-logo">
          <span>{siteName}</span>
        </div>
        <form>
          {type == 'password' ?
            <div>
              <FormItem {...formItemPropsMap.username}>
                {getFieldDecorator('username', {
                  rules: [{
                    required: true,
                    message: '请填写用户名'
                  }]
                })(<Input {...inputPropsMap.username} size="large" placeholder="用户名" />)}
              </FormItem>
              <FormItem {...formItemPropsMap.password}>
                  {getFieldDecorator('password', {
                    rules: [{
                      required: true,
                      message: '请填写密码'
                    }]
                  })(<Input {...inputPropsMap.password} size="large" type="password" placeholder="密码" />)}
              </FormItem>
                {content && content(getFieldDecorator)}
            </div>
              :
            <div>
              <FormItem>
                  {getFieldDecorator('phoneNum', {
                    rules: [
                      { required: true, message: '请输入正确的手机号' },
                      { pattern: /^1\d{10}$/, message: '请输入正确的手机号' }
                    ]
                  })(
                    <Input {...inputPropsMap.phoneNum} placeholder="请输入手机号" />
                  )}
              </FormItem>
              <FormItem>
                <Row gutter={8}>
                  <Col span={14}>
                      {getFieldDecorator('identifyCode ', {
                        rules: [{
                          required: true,
                          message: '请输入短信验证码'
                        }]
                      })(
                        <Input {...inputPropsMap.message} size="large" placeholder="请输入短信验证码" />
                      )}
                  </Col>
                  <Col style={{ textAlign: 'center' }} span={10}>
                      {seconds < 0 ?
                        <Button onClick={() => this.verifyCode()} size="large">获取验证码</Button>
                        :
                        <span>{`${countNum}秒后重发`}</span>
                      }
                  </Col>
                </Row>
              </FormItem>
            </div>
            }
          <Row>
            <Button type="primary" size="large" onClick={() => this.handleOk()} loading={loading}>
                登录
            </Button>
          </Row>
        </form>
      </div>
      );
  }
  render() {
    const { theme = 'normal', siteName, title, subTitle, logoRender } = this.props;
    const themeClassName = LoginTheme[theme];

    return (
      <div className={`h-login-viewport h-login-${themeClassName}-viewport`} onKeyDown={e => this.handleKeyDownLogin(e)}>
        <div className="h-login-outer-logo">
          {logoRender ? logoRender() : (
            <div>
              <span>{siteName}</span><span className="h-login-welcome">欢迎您</span>
            </div>
          )}
        </div>
        <div className="h-login-outer-title">
          <h1>{title}</h1>
          <h2>{subTitle}</h2>
        </div>
        <div className="h-login-form-wrapper">
          {this.renderLoginForm()}
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  form: PropTypes.object,
  handleLogin: PropTypes.func,
  siteName: PropTypes.string,
  loading: PropTypes.bool,
  viewport: PropTypes.string,
  handleSendMessage: PropTypes.func,
  countNum: PropTypes.number
};

export default Form.create()(LoginForm);

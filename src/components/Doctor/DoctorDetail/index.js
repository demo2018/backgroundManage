import { Row, Form, Input, InputNumber, Select, DatePicker, Radio, Checkbox, message, Button, Upload, Icon } from 'antd';
import styles from './doctorDetail.less';
import moment from 'moment';
import { getServer, getUploadPicUrl, toString } from 'utils/common';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;

const options = [
  { label: '内科', value: '内科' },
  { label: '外科', value: '外科' },
  { label: '种植科', value: '种植科' },
  { label: '正畸科', value: '正畸科' },
  { label: '修复科', value: '修复科' },
  { label: '综合科', value: '综合科' },
  { label: '牙周科', value: '牙周科' },
  { label: '儿童口腔科', value: '儿童口腔科' },
];

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const imgTypeReg = /\/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;
// 页面参数初始化
class DoctorDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: {
        idIcon: false,
        jobIcon1: false,
        jobIcon2: false,
        doctorIcon: false,
        assistantQr: false,
        icon: false,
      },
      files: {},
      imageUrl: {
        idIcon: '',
        jobIcon1: '',
        jobIcon2: '',
        doctorIcon: '',
        assistantQr: '',
        icon: '',
      }
    };
    this.handleSave = this.handleSave.bind(this);
  }
  // 图片上传前判断
  beforeUpload(uploadName) {
    return (file) => {
      const { files: oldFiles } = this.state;
      const isImg = imgTypeReg.test(file.type);
      if (!isImg) {
        message.error('请上传图片格式文件!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('图片最大支持2M，请上传2M以下大小图片!');
      }
      this.setState({ files: { ...oldFiles, [uploadName]: file } });
      return isImg && isLt2M; // 自动上传
      // return false; // 手动上传
    };
  }
  // 触发提交 判断是新增还是修改
  handleSave() {
    const { form, addDatas, updateDatas, details } = this.props;
    const { imageUrl } = this.state;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((err, values) => {
      const { birthday } = values;
      if (!err && details.id) {
        updateDatas({
          ...values,
          birthday: birthday ? toString(birthday, 'YYYY-MM-DD') : '',
          icon: imageUrl.icon ? imageUrl.icon : details.icon,
          idIcon: imageUrl.idIcon ? imageUrl.idIcon : details.idIcon,
          jobIcon1: imageUrl.jobIcon1 ? imageUrl.jobIcon1 : details.jobIcon1,
          jobIcon2: imageUrl.jobIcon2 ? imageUrl.jobIcon2 : details.jobIcon2,
          doctorIcon: imageUrl.doctorIcon ? imageUrl.doctorIcon : details.doctorIcon,
          assistantQr: imageUrl.assistantQr ? imageUrl.assistantQr : details.assistantQr
        }, details.id);
      }
      if (!err && !details.id) {
        addDatas({
          ...values,
          birthday: birthday ? toString(birthday, 'YYYY-MM-DD') : '',
          icon: imageUrl.icon ? imageUrl.icon : details.icon,
          idIcon: imageUrl.idIcon ? imageUrl.idIcon : details.idIcon,
          jobIcon1: imageUrl.jobIcon1 ? imageUrl.jobIcon1 : details.jobIcon1,
          jobIcon2: imageUrl.jobIcon2 ? imageUrl.jobIcon2 : details.jobIcon2,
          doctorIcon: imageUrl.doctorIcon ? imageUrl.doctorIcon : details.doctorIcon,
          assistantQr: imageUrl.assistantQr ? imageUrl.assistantQr : details.assistantQr
        });
      }
    });
  }
  handleUploadChange(uploadName) {
    return (info) => {
      const { imageUrl: oldImg, loading: oldLoading } = this.state;

      // 直接上传
      if (info.file.status === 'uploading') {
        this.setState({ loading: { ...oldLoading, [uploadName]: true } });
        return;
      }

      if (info.file.status === 'done') {
        // Get this url from response in real world.
        const { file: { response: { data } } } = info;
        this.setState({
          loading: { ...oldLoading, [uploadName]: false },
          imageUrl: { ...oldImg, [uploadName]: data }
        });
      }

      // 上传前预览
      // const reader = new FileReader();
      // reader.addEventListener('load', () => {
      //   this.setState({
      //     loading: { ...oldLoading, [uploadName]: false },
      //     imageUrl: { ...oldImg, [uploadName]: reader.result }
      //   });
      // });
      // reader.readAsDataURL(info.file);
    };
  }
  renderUploadButton(uploadName) {
    const { loading } = this.state;
    return (
      <div className="uploadTip">
        <Icon type={loading[uploadName] ? 'loading' : 'plus'} />
        <div className="ant-upload-text">点击上传</div>
      </div>
    );
  }
  // 处理图片地址
  renderImage(imageUrlKey) {
    const { imageUrl } = this.state;
    const { details } = this.props;
    const { disease } = getServer();
    return details[imageUrlKey]
      ? (imageUrl[imageUrlKey]
        ? <img src={`${disease}/bhyy/core/image/${imageUrl[imageUrlKey]}`} alt="" />
        : <img src={`${disease}/bhyy/core/image/${details[imageUrlKey]}`} alt="" />)
      : (imageUrl[imageUrlKey]
        ? <img src={`${disease}/bhyy/core/image/${imageUrl[imageUrlKey]}`} alt="" />
        : this.renderUploadButton(imageUrlKey));
  }
  // 页面渲染
  render() {
    const { form, details, goback, itemoptions, adeptList } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.doctorDetail}>
        <div className="baseInfo part">
          <div className="title"><h3>基本信息</h3></div>
          <div className="content">
            <div className="imgWraper">
              <div className="uploadWrapper">
                <Upload
                  name="file"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action={getUploadPicUrl({ type: 'icon' })}
                  beforeUpload={this.beforeUpload('icon')}
                  onChange={this.handleUploadChange('icon')}
                >
                  {this.renderImage('icon')}
                </Upload>
                <h4>医生头像</h4>
              </div>
            </div>
            <div className="filedsWraper">
              <Form layout="inline">
                <Row>
                  <FormItem
                    label="姓名"
                  >
                    {getFieldDecorator('realName', {
                      initialValue: details.realName,
                      rules: [{
                        required: true, message: '请填写真实姓名！',
                      }],
                    })(
                      <Input />
                    )}
                  </FormItem>
                  <FormItem
                    label="手机号码"
                  >
                    {getFieldDecorator('phone', {
                      initialValue: details.phone,
                      rules: [{
                        required: true, message: '手机号码不能为空！',
                      }],
                    })(
                      <InputNumber />
                    )}
                  </FormItem>
                </Row>
                <Row>
                  <FormItem
                    label="性别"
                  >
                    {getFieldDecorator('gender', {
                      initialValue: details.gender,
                      rules: [{
                        required: true, message: '请选择性别！',
                      }],
                    })(
                      <RadioGroup>
                        <Radio value={1}>男</Radio>
                        <Radio value={0}>女</Radio>
                      </RadioGroup>
                    )}
                  </FormItem>
                  <FormItem
                    label="学历"
                  >
                    {getFieldDecorator('education', {
                      initialValue: `${details.education}`,
                      rules: [{
                        required: true, message: '请选择学历！',
                      }],
                    })(
                      <Select >
                        <Option value="专科">专科</Option>
                        <Option value="本科">本科</Option>
                        <Option value="研究生">研究生</Option>
                        <Option value="硕士">硕士</Option>
                        <Option value="博士">博士</Option>
                      </Select>
                    )}
                  </FormItem>
                </Row>
                <Row>
                  <FormItem
                    label="出生日期"
                  >
                    {getFieldDecorator('birthday', {
                      initialValue: details.birthday ? moment(details.birthday) : null,
                      rules: [{
                        required: true, message: '请选择出生日期！',
                      }],
                    })(
                      <DatePicker />
                    )}
                  </FormItem>
                  <FormItem
                    label="年龄"
                  >
                    {getFieldDecorator('age', {
                      initialValue: details.age,
                      rules: [{
                        required: true, message: '请填写年龄！',
                      }],
                    })(
                      <InputNumber min={0} max={150} />
                    )}
                  </FormItem>
                </Row>
                <Row>
                  <FormItem
                    label="第一执业机构"
                  >
                    {getFieldDecorator('hospitalName', {
                      initialValue: `${details.hospitalName}`,
                      rules: [{
                        required: true, message: '请填写执业机构！',
                      }],
                    })(
                      <Input />
                    )}
                  </FormItem>
                  {/* <FormItem
                    label="职称"
                  >
                    {getFieldDecorator('title', {
                      initialValue: `${details.title}`,
                      rules: [{
                        required: true, message: '请填写职称！',
                      }],
                    })(
                      <Select >
                        <Option value="无">无</Option>
                        <Option value="初级职称">初级职称</Option>
                        <Option value="中级职称">中级职称</Option>
                        <Option value="高级职称">高级职称</Option>
                      </Select>
                      )}
                  </FormItem> */}
                </Row>
                <Row>
                  <FormItem
                    label="执业年限"
                  >
                    {getFieldDecorator('workYear', {
                      initialValue: details.workYear,
                      rules: [{
                        required: true, message: '请填写执业年限！',
                      }],
                    })(
                      <InputNumber min={0} max={150} />
                    )}
                  </FormItem>
                  <FormItem
                    label="擅长领域"
                  >
                    {getFieldDecorator('adepts', {
                      initialValue: details.adepts || [],
                      rules: [{
                        required: true, message: '请选择擅长领域！',
                      }],
                    })(
                      <CheckboxGroup options={adeptList.map(({ id, name }) => ({ value: `${id}`, label: name }))} />
                  )}
                  </FormItem>
                </Row>
                <Row>
                  <FormItem
                    label="科室"
                  >
                    {getFieldDecorator('departments', {
                      initialValue: details.departments || [],
                      rules: [{
                        required: true, message: '请选择科室！',
                      }],
                    })(
                      <CheckboxGroup options={options} />
                    )}
                  </FormItem>
                </Row>
                <Row>
                  <FormItem
                    label="服务项目"
                  >
                    {getFieldDecorator('serviceItems', {
                      initialValue: details.serviceItems || [],
                      rules: [{
                        required: true, message: '请选择服务项目！',
                      }],
                    })(
                      <CheckboxGroup className="serviceProject" options={itemoptions.map(({ id, className }) => ({ value: `${id}`, label: className }))} />
                    )}
                  </FormItem>
                </Row>
                <Row className="textArea">
                  <FormItem
                    label="简介"
                  >
                    {getFieldDecorator('intro', {
                      initialValue: details.intro,
                    })(
                      <TextArea />
                    )}
                  </FormItem>
                </Row>
                <Row>
                  <FormItem
                    label="邀请人"
                  >
                    {getFieldDecorator('recommendId', {
                      initialValue: details.recommendId,
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Row>
                <Row>
                  <FormItem
                    label="前端推荐展示"
                  >
                    {getFieldDecorator('isRecommend', {
                      initialValue: details.isRecommend,
                    })(
                      <RadioGroup>
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>
                      </RadioGroup>
                    )}
                  </FormItem>
                </Row>
              </Form>
            </div>
          </div>
        </div>
        <div className="auditInfo part">
          <div className="title"><h3>认证信息</h3></div>
          <div className="content">
            <div className="uploadWrapper">
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={getUploadPicUrl({ type: 'idIcon' })}
                beforeUpload={this.beforeUpload('idIcon')}
                onChange={this.handleUploadChange('idIcon')}
              >
                {this.renderImage('idIcon')}
              </Upload>
              <h4>身份证</h4>
            </div>
            <div className="uploadWrapper">
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={getUploadPicUrl({ type: 'jobIcon1' })}
                beforeUpload={this.beforeUpload('jobIcon1')}
                onChange={this.handleUploadChange('jobIcon1')}
              >
                {this.renderImage('jobIcon1')}
              </Upload>
              <h4>执业资格证第(1)页</h4>
            </div>
            <div className="uploadWrapper">
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={getUploadPicUrl({ type: 'jobIcon2' })}
                beforeUpload={this.beforeUpload('jobIcon2')}
                onChange={this.handleUploadChange('jobIcon2')}
              >
                {this.renderImage('jobIcon2')}
              </Upload>
              <h4>执业资格证第(2)页</h4>
            </div>
            <div className="uploadWrapper">
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={getUploadPicUrl({ type: 'doctorIcon' })}
                beforeUpload={this.beforeUpload('doctorIcon')}
                onChange={this.handleUploadChange('doctorIcon')}
              >
                {this.renderImage('doctorIcon')}
              </Upload>
              <h4>医师资格证</h4>
            </div>
            <div className="uploadWrapper">
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={getUploadPicUrl({ type: 'assistantQr' })}
                beforeUpload={this.beforeUpload('assistantQr')}
                onChange={this.handleUploadChange('assistantQr')}
              >
                {this.renderImage('assistantQr')}
              </Upload>
              <h4>医生助理二维码</h4>
            </div>
          </div>
        </div>
        <div className="referrerInfo part">
          <div className="title"><h3>推荐医生</h3></div>
          <div className="content">
            <Form layout="inline">
              <Row>
                <FormItem
                  label="推荐医生1"
                >
                  {getFieldDecorator('doctor1', {
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  label="推荐医生1"
                >
                  {getFieldDecorator('doctor2', {
                  })(
                    <Input />
                  )}
                </FormItem>
              </Row>
              <Row>
                <FormItem
                  label="推荐医生3"
                >
                  {getFieldDecorator('doctor3', {
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  label="推荐医生4"
                >
                  {getFieldDecorator('doctor4', {
                  })(
                    <Input />
                  )}
                </FormItem>
              </Row>
              <Row>
                <FormItem
                  label="医生助理"
                >
                  {getFieldDecorator('doctor5', {
                  })(
                    <Input />
                  )}
                </FormItem>
              </Row>
              <Row>
                <FormItem
                  label="是否显示"
                >
                  {getFieldDecorator('isShow', {
                    initialValue: details.isShow,
                  })(
                    <RadioGroup>
                      <Radio value={1}>是</Radio>
                      <Radio value={0}>否</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Row>
            </Form>
          </div>
        </div>
        <div className="btnGroup part">
          <Button type="primary" onClick={this.handleSave}>保存</Button>
          <Button onClick={goback}>取消</Button>
        </div>
      </div >
    );
  }
}

export default Form.create()(DoctorDetail);

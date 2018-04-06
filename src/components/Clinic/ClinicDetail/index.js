import { Form, Button, Input, DatePicker, Row, Upload, Icon, message, Radio, Popconfirm, Cascader } from 'antd';
import { getServer, getUploadPicUrl, toString } from 'utils/common';
import styles from './clinicDetail.less';
import moment from 'moment';
import sitelist from 'utils/sitelist.js';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const imgTypeReg = /\/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;

// 页面参数初始化
class ClinicDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: {
        hosQualificat: false,
        eiaQualificat: false,
        img1: false,
        img2: false,
        img3: false
      },
      files: {},
      imageUrl: {
        hosQualificat: '',
        eiaQualificat: '',
        img1: '',
        img2: '',
        img3: ''
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
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        message.error('图片最大支持1M，请上传1M以下大小图片!');
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
      const { establishDate, site } = values;
      if (!err && details.id) {
        updateDatas({
          ...values,
          prov: site[0], city: site[1], area: site[2],
          establishDate: establishDate ? toString(establishDate, 'YYYY-MM-DD') : '',
          hosQualificat: imageUrl.hosQualificat ? imageUrl.hosQualificat : details.hosQualificat,
          eiaQualificat: imageUrl.eiaQualificat ? imageUrl.eiaQualificat : details.idIeiaQualificatcon,
          img1: imageUrl.img1 ? imageUrl.img1 : details.img1,
          img2: imageUrl.img2 ? imageUrl.img2 : details.img2,
          img3: imageUrl.img3 ? imageUrl.img3 : details.img3
        }, details.id);
      }
      if (!err && !details.id) {
        addDatas({
          ...values,
          prov: site[0], city: site[1], area: site[2],
          establishDate: establishDate ? toString(establishDate, 'YYYY-MM-DD') : '',
          hosQualificat: imageUrl.hosQualificat ? imageUrl.hosQualificat : details.hosQualificat,
          eiaQualificat: imageUrl.eiaQualificat ? imageUrl.eiaQualificat : details.idIeiaQualificatcon,
          img1: imageUrl.img1 ? imageUrl.img1 : details.img1,
          img2: imageUrl.img2 ? imageUrl.img2 : details.img2,
          img3: imageUrl.img3 ? imageUrl.img3 : details.img3
        }, details.id);
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
    const { form, details, onDelete, goback } = this.props;
    const { getFieldDecorator } = form;

    const popconfirmProps = {
      title: '确认删除该诊所?',
      okText: '确定',
      cancelText: '取消',
    };

    return (
      <div className={styles.clinicDetail}>
        <div className="baseInfo part">
          <div className="head"><h3>基本信息</h3></div>
          <div className="content">
            <div className="filedsWraper">
              <Form layout="inline">
                <Row>
                  <FormItem label="诊所名称" >
                    {getFieldDecorator('name', {
                      initialValue: details.name,
                      rules: [{
                        required: true, message: '请填写诊所名称！',
                      }],
                    })(
                      <Input placeholder="请输入诊所名称" />
                    )}
                  </FormItem>
                  <FormItem label="诊所品牌" >
                    {getFieldDecorator('brand', {
                      initialValue: details.brand,
                      rules: [{
                        required: true, message: '请输入诊所品牌！',
                      }],
                    })(
                      <Input placeholder="请输入诊所品牌" />
                    )}
                  </FormItem>
                </Row>
                <Row>
                  <FormItem label="所在区域" >
                    {getFieldDecorator('site', {
                      initialValue: [`${details.prov}`, `${details.city}`, `${details.area}`] || [],
                      rules: [{
                        required: true, message: '请选择区域！',
                      }],
                    })(
                      <Cascader options={sitelist} placeholder="请选择区域" />
                    )}
                  </FormItem>
                  <FormItem label="诊所电话" >
                    {getFieldDecorator('telephone', {
                      initialValue: details.telephone,
                      rules: [{
                        required: true, message: '请填写诊所电话！',
                      }],
                    })(
                      <Input placeholder="请输入诊所电话" />
                    )}
                  </FormItem>
                </Row>
                <Row>
                  <FormItem label="详细地址" >
                    {getFieldDecorator('address', {
                      initialValue: details.address,
                      rules: [{
                        required: true, message: '请填写详细地址！',
                      }],
                    })(
                      <Input placeholder="请输入详细地址" />
                    )}
                  </FormItem>
                </Row>
                <Row>
                  <FormItem label="乘车路线" >
                    {getFieldDecorator('route', {
                      initialValue: details.route,
                      rules: [{
                        required: true, message: '请填写乘车路线！',
                      }],
                    })(
                      <Input placeholder="请输入乘车路线" />
                    )}
                  </FormItem>
                </Row>
              </Form>
            </div>
          </div>
        </div>
        <div className="auditInfo part">
          <div className="head"><h3>认证信息</h3></div>
          <div className="content">
            <Form layout="inline">
              <Row>
                <FormItem label="牙椅数量" >
                  {getFieldDecorator('toothChairNum', {
                    initialValue: details.toothChairNum,
                  })(
                    <Input placeholder="请输入牙椅数量" />
                  )}
                </FormItem>
                <FormItem label="诊所负责人" >
                  {getFieldDecorator('leader', {
                    initialValue: details.leader,
                  })(
                    <Input placeholder="请输入诊所负责人" />
                  )}
                </FormItem>
                <FormItem label="诊所负责人电话" >
                  {getFieldDecorator('leaderPhone', {
                    initialValue: details.leaderPhone,
                  })(
                    <Input placeholder="请输入诊所负责人电话" />
                  )}
                </FormItem>
              </Row>
              <Row>
                <FormItem label="成立日期" >
                  {getFieldDecorator('establishDate', {
                    initialValue: details.establishDate ? moment(details.establishDate) : null,
                  })(
                    <DatePicker placeholder="请选择成立日期" />
                  )}
                </FormItem>
                <FormItem label="薄荷对接人" >
                  {getFieldDecorator('boheJoin', {
                    initialValue: details.boheJoin,
                  })(
                    <Input placeholder="请输入薄荷对接人" />
                  )}
                </FormItem>
                <FormItem label="员工数量" >
                  {getFieldDecorator('staffNum', {
                    initialValue: details.staffNum,
                  })(
                    <Input placeholder="请输入员工数量" />
                  )}
                </FormItem>
              </Row>
              <Row>
                <FormItem label="诊所账号" >
                  {getFieldDecorator('account', {
                    initialValue: details.account,
                  })(
                    <Input placeholder="请输入诊所账号" />
                  )}
                </FormItem>
                <FormItem label="诊所密码" >
                  {getFieldDecorator('password', {
                    initialValue: details.password,
                  })(
                    <Input placeholder="请输入诊所密码" />
                  )}
                </FormItem>
              </Row>
              <div className="imgWraper leftimgWraper">
                <div className="uploadWrapper">
                  <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={getUploadPicUrl({ type: 'hosQualificat' })}
                    beforeUpload={this.beforeUpload('hosQualificat')}
                    onChange={this.handleUploadChange('hosQualificat')}
                  >
                    {this.renderImage('hosQualificat')}
                  </Upload>
                  <h4>诊所资质</h4>
                </div>
              </div>
              <div className="imgWraper">
                <div className="uploadWrapper">
                  <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={getUploadPicUrl({ type: 'eiaQualificat' })}
                    beforeUpload={this.beforeUpload('eiaQualificat')}
                    onChange={this.handleUploadChange('eiaQualificat')}
                  >
                    {this.renderImage('eiaQualificat')}
                  </Upload>
                  <h4>环评资质</h4>
                </div>
              </div>
              <div className="imgWraper">
                <div className="uploadWrapper">
                  <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={getUploadPicUrl({ type: 'img1' })}
                    beforeUpload={this.beforeUpload('img1')}
                    onChange={this.handleUploadChange('img1')}
                  >
                    {this.renderImage('img1')}
                  </Upload>
                  <h4>附件1</h4>
                </div>
              </div>
              <div className="imgWraper">
                <div className="uploadWrapper">
                  <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={getUploadPicUrl({ type: 'img2' })}
                    beforeUpload={this.beforeUpload('img2')}
                    onChange={this.handleUploadChange('img2')}
                  >
                    {this.renderImage('img2')}
                  </Upload>
                  <h4>附件2</h4>
                </div>
              </div>
              <div className="imgWraper">
                <div className="uploadWrapper">
                  <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={getUploadPicUrl({ type: 'img3' })}
                    beforeUpload={this.beforeUpload('img3')}
                    onChange={this.handleUploadChange('img3')}
                  >
                    {this.renderImage('img3')}
                  </Upload>
                  <h4>附件3</h4>
                </div>
              </div>
              <Row>
                <FormItem
                  label="是否启用"
                >
                  {getFieldDecorator('isEnable', {
                    initialValue: details.isEnable,
                  })(
                    <RadioGroup>
                      <Radio value={1}>是</Radio>
                      <Radio value={0}>否</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Row>
              <Row>
                <FormItem label="排序" >
                  {getFieldDecorator('rank', {
                    initialValue: details.rank || 0,
                  })(
                    <Input placeholder="请输入排序序号" />
                  )}
                </FormItem>
              </Row>
            </Form>
          </div>
        </div>
        <div className="btnGroup">
          <Button type="primary" onClick={this.handleSave}>保存</Button>
          {details.id ?
            <Popconfirm {...popconfirmProps} onConfirm={() => { onDelete(details.id); }}><Button type="danger" ghost>删除</Button></Popconfirm>
            :
            <Button onClick={goback}>取消</Button>
          }
        </div>
      </div>
    );
  }
}

export default Form.create()(ClinicDetail);

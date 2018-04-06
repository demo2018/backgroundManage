import { Row, Form, Input, InputNumber, Select, message, Button, Upload, Icon } from 'antd';
import styles from './projectDetail.less';
import { getServer, getUploadPicUrl } from 'utils/common';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;

const imgTypeReg = /\/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;
// 页面参数初始化
class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: {
        icon: false,
      },
      files: {},
      imageUrl: {
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
      if (!err && details.id) {
        updateDatas({
          ...values,
          icon: imageUrl.icon ? imageUrl.icon : details.icon
        }, details.id);
      }
      if (!err && !details.id) {
        addDatas({
          ...values,
          icon: imageUrl.icon ? imageUrl.icon : details.icon
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

      // // 上传前预览
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
    const { form, toList, details, doctorClassList, patientClassList } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.projectDetail}>
        <div className="baseInfo part">
          <div className="head"><h3>基本信息</h3></div>
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
                <h4>项目图标</h4>
              </div>
            </div>
            <div className="filedsWraper">
              <Form layout="inline">
                <Row>
                  <FormItem label="项目名称" >
                    {getFieldDecorator('name', {
                      initialValue: details.name,
                      rules: [{
                        required: true, message: '该字段不能为空',
                      }],
                    })(
                      <Input placeholder="请输入" />
                    )}
                  </FormItem>
                </Row>
                <Row>
                  <FormItem label="单位" >
                    {getFieldDecorator('unit', {
                      initialValue: details.unit,
                      rules: [{
                        required: true, message: '该字段不能为空',
                      }],
                    })(
                      <Input placeholder="请输入" />
                    )}
                  </FormItem>
                </Row>
                <Row>
                  <FormItem label="价格" >
                    {getFieldDecorator('price', {
                      initialValue: details.price,
                      rules: [{
                        required: true, message: '该字段不能为空',
                      }],
                    })(
                      <InputNumber placeholder="请输入" />
                    )}
                  </FormItem>
                </Row>
                <Row>
                  <FormItem label="医生端类别" >
                    {getFieldDecorator('doctorClass', {
                      initialValue: details.doctorClass,
                    })(
                      <Select placeholder="请选择" >
                        {doctorClassList.map(({ id, className }) => (<Option key={id} value={`${id}`}>{className}</Option>))}
                      </Select>
                    )}
                  </FormItem>
                </Row>
                <Row>
                  <FormItem label="患者端类别" >
                    {getFieldDecorator('patientClass', {
                      initialValue: details.patientClass,
                    })(
                      <Select placeholder="请选择" >
                        {patientClassList.map(({ id, className }) => (<Option key={id} value={`${id}`}>{className}</Option>))}
                      </Select>
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
                <Row>
                  <FormItem label="相关链接标题" >
                    {getFieldDecorator('linkTitle', {
                      initialValue: details.linkTitle,
                    })(
                      <Input className="longInput" />
                    )}
                  </FormItem>
                </Row>
                <Row>
                  <FormItem label="相关链接(可选)" >
                    {getFieldDecorator('link', {
                      initialValue: details.link,
                    })(
                      <Input className="longInput" />
                    )}
                  </FormItem>
                </Row>
                <Row className="textArea">
                  <FormItem label="简介(可选)" >
                    {getFieldDecorator('intro', {
                      initialValue: details.intro,
                    })(
                      <TextArea />
                    )}
                  </FormItem>
                </Row>
              </Form>
            </div>
          </div>
        </div>
        <div className="btnGroup part">
          <Button type="primary" onClick={this.handleSave}>保存</Button>
          <Button onClick={toList}>取消</Button>
        </div>
      </div >
    );
  }
}

export default Form.create()(ProjectDetail);

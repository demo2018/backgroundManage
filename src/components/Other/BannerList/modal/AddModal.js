import { Form, Row, Input, Modal, Radio, Upload, Icon, message } from 'antd';
import styles from './AddModal.less';
import { getServer, getUploadPicUrl } from 'utils/common';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const imgTypeReg = /\/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;
// 页面参数初始化
class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: {
        image: false,
      },
      files: {},
      imageUrl: {
        image: '',
      }
    };
    this.handleOk = this.handleOk.bind(this);
  }
  // 图片上传前判断
  beforeUpload(uploadName) {
    return (file) => {
      const { files: oldFiles } = this.state;
      const isImg = imgTypeReg.test(file.type);
      if (!isImg) {
        message.error('请上传图片格式文件!');
      }
      const isLt2M = file.size / 1024 <= 500;
      if (!isLt2M) {
        message.error('图片最大支持500kb，请上传500kb以下大小图片!');
      }
      this.setState({ files: { ...oldFiles, [uploadName]: file } });
      return isImg && isLt2M; // 自动上传
      // return false; // 手动上传
    };
  }
  // 触发提交 判断是新增还是修改
  handleOk() {
    const { onOK, onAdds, form, selecteRecord } = this.props;
    const { imageUrl } = this.state;
    form.validateFieldsAndScroll((err, values) => {
      if (!err && !selecteRecord.id) {
        onAdds({ ...values, image: imageUrl.image ? imageUrl.image : selecteRecord.image });
      }
      if (!err && selecteRecord.id) {
        onOK({ ...values, image: imageUrl.image ? imageUrl.image : selecteRecord.image }, selecteRecord.id);
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
    const { selecteRecord } = this.props;
    const { disease } = getServer();
    return selecteRecord[imageUrlKey]
      ? (imageUrl[imageUrlKey]
        ? <img src={`${disease}/bhyy/core/image/${imageUrl[imageUrlKey]}`} alt="" />
        : <img src={`${disease}/bhyy/core/image/${selecteRecord[imageUrlKey]}`} alt="" />)
      : (imageUrl[imageUrlKey]
        ? <img src={`${disease}/bhyy/core/image/${imageUrl[imageUrlKey]}`} alt="" />
        : this.renderUploadButton(imageUrlKey));
  }
  // 页面渲染
  render() {
    const { form, onCancel, selecteRecord } = this.props;
    const { getFieldDecorator } = form;

    const modalOpts = {
      title: selecteRecord.id ? '编辑banner' : '新增banner',
      visible: true,
      maskClosable: false,
      onOk: this.handleOk,
      onCancel,
    };

    return (
      <Modal {...modalOpts} className={styles.addModal}>
        <Form layout="inline">
          <Row>
            <FormItem label="名称" >
              {getFieldDecorator('name', {
                initialValue: selecteRecord.name,
                rules: [{
                  required: true, message: '该字段不能为空',
                }],
              })(
                <Input />
                )}
            </FormItem>
            <FormItem label="图片" className="imgUpload">
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={getUploadPicUrl({ type: 'image' })}
                beforeUpload={this.beforeUpload('image')}
                onChange={this.handleUploadChange('image')}
              >
                {this.renderImage('image')}
              </Upload>
              <div className="infors">
                <p>支持的文件名：.jpg.png</p>
                <p>图片尺寸：750px*420px</p>
                <p>图片大小：小于500k</p>
              </div>
            </FormItem>
            <FormItem label="链接" >
              {getFieldDecorator('link', {
                initialValue: selecteRecord.link,
              })(
                <Input />
                )}
            </FormItem>
            <FormItem label="状态" >
              {getFieldDecorator('status', {
                initialValue: selecteRecord.status,
                rules: [{
                  required: true, message: '该字段不能为空',
                }],
              })(
                <RadioGroup>
                  <Radio value={1}>启用</Radio>
                  <Radio value={0}>禁用</Radio>
                </RadioGroup>
                )}
            </FormItem>
            <FormItem label="排序" >
              {getFieldDecorator('rank', {
                initialValue: selecteRecord.rank || 0,
              })(
                <Input placeholder="请输入排序序号" />
                )}
            </FormItem>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddModal);

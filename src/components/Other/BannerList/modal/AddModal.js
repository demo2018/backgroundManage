import { Form, Row, Input, Modal, Radio, Upload, Button, Icon, message } from 'antd';
import styles from './AddModal.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.handleOk = this.handleOk.bind(this);
  }
  handleOk() {
    const { onOK, onAdds, form, selecteRecord } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err && !selecteRecord.id) {
        onAdds(values);
      }
      if (!err && selecteRecord.id) {
        onOK(values, selecteRecord.id);
      }
    });
  }
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }
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
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
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
            <FormItem label="标题" className="imgUpload">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="//jsonplaceholder.typicode.com/posts/"    //  上传地址
                onChange={this.handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
              </Upload>
              <p>支持扩展名：.png.jpg...</p>
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
          </Row>
        </Form>
      </Modal>
    );
  }
}


export default Form.create()(AddModal);

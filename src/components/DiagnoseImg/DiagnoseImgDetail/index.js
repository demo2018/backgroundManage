import { Form, Row, Button, DatePicker, message, Input, Icon, Upload, Modal } from 'antd';
import styles from './index.less';
const FormItem = Form.Item;

const imgTypeReg = /\/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;
const imgMaxSize = 1024 * 1024 * 2;

class CustomerDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      files: [],
      fileList: [],
    };
    this.handleSave = this.handleSave.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSave() {
    const { form } = this.props;
    const { fileList } = this.state;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log({ ...values, fileList });
      }
    });
  }
  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleCancel() {
    this.setState({ previewVisible: false });
  }
  beforeUpload(pictureFile) {
    const { files } = this.state;
    const fileTypeStatus = imgTypeReg.test(pictureFile.type);
    const fileSizeStatus = pictureFile.size < imgMaxSize;
    if (!fileTypeStatus) {
      message.error('请选择图片文件!');
      return false;
    }
    if (!fileSizeStatus) {
      message.error('文件最大为 2MB!');
      return false;
    }
    // this.setState({ files: [...files, pictureFile] });
  }
  handleChange({ fileList }) {
    this.setState({ fileList });
  }

  renderUploadButton() {
    return (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">请选择</div>
      </div>
    );
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { form, toList } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.caseDetail}>
        <div className="baseInfo part">
          <div className="title"><h3>基本信息</h3></div>
          <div className="content">
            <Form layout="inline">
              <Row>
                <FormItem label="姓名">
                  {getFieldDecorator('name', {
                    rules: [{
                      required: true, message: '该字段不能为空',
                    }],
                  })(
                    <Input />
                    )}
                </FormItem>
              </Row>
              <Row>
                <FormItem label="拍摄日期">
                  {getFieldDecorator('phone222', {
                    rules: [{
                      required: true, message: '该字段不能为空',
                    }],
                  })(
                    <DatePicker />
                    )}
                </FormItem>
              </Row>
            </Form>
          </div>
        </div>

        <div className="imagesInfo part">
          <div className="title"><h3>图片影像</h3></div>
          <div className="content">
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
              fileList={fileList}
              beforeUpload={this.beforeUpload}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 3 ? null : this.renderUploadButton()}
            </Upload>
          </div>
        </div>

        <div className="btnGroup part">
          <Button type="primary" onClick={this.handleSave}>保存</Button>
          <Button onClick={toList}>取消</Button>
        </div>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div >
    );
  }
}

export default Form.create()(CustomerDetail);

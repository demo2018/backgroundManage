import { Form, Row, Button, DatePicker, message, Select, Icon, Upload, Modal } from 'antd';
import styles from './index.less';
import moment from 'moment';
import { getServer, getUploadPicUrl, toString } from 'utils/common';

const FormItem = Form.Item;
const Option = Select.Option;
let appointTimer = null;

const imgTypeReg = /\/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;
const imgMaxSize = 1024 * 1024 * 2;

const formatSelectValue = (value) => {
  if (value || value === 0) {
    return `${value}`;
  }
};
// 页面参数初始化
class CustomerDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      files: [],
      fileList: [],
      list: [],  //  上传的图片ID
    };
    this.handleSave = this.handleSave.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchAppoint = this.handleSearchAppoint.bind(this);
  }

  handleSave() {
    const { form, details, onAdd, onEdit } = this.props;
    const { list } = this.state;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((err, values) => {
      if (!err && details.id) {
        onEdit({ ...values, path: list, filmTime: values.filmTime ? toString(values.filmTime, 'YYYY-MM-DD') : '' }, details.id);
      }
      if (!err && !details.id) {
        onAdd({ ...values, path: list, filmTime: values.filmTime ? toString(values.filmTime, 'YYYY-MM-DD') : '' });
      }
    });
  }
  // 查询就诊ID
  handleSearchAppoint(appointName = '') {
    const { getAppointList } = this.props;
    const newAppointName = appointName.replace(/(^\s*)|(\s*$)/g, '');
    if (appointTimer) {
      clearTimeout(appointTimer);
      appointTimer = null;
    }
    if (appointName !== '') {
      appointTimer = setTimeout(() => {
        getAppointList({ appointId: newAppointName });
      }, 500);
    }
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
    // const { files } = this.state;
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
    const listProps = [];
    this.setState({ fileList });
    //  push需上传的图片ID
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i] && fileList[i].response) {
        listProps.push(fileList[i].response.data);
      }
    }
    this.setState({ list: listProps });
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
    const { form, toList, details, appointList } = this.props;
    const { getFieldDecorator } = form;

    // 就诊ID列表
    const appointOptions = appointList.map(({ id, appointId, patientName, doctorName }) => {
      return <Option key={`${id}`} value={`${id}`}>{appointId} (医生：{doctorName} | 就诊人：{patientName})</Option>;
    });

    return (
      <div className={styles.caseDetail}>
        <div className="baseInfo part">
          <div className="head"><h3>基本信息</h3></div>
          <div className="content">
            <Form layout="inline">
              <Row>
                <FormItem label="就诊ID">
                  {getFieldDecorator('appointId', {
                    initialValue: formatSelectValue(details.appointId),
                    rules: [{
                      required: true, message: '该字段不能为空',
                    }],
                  })(
                    <Select
                      showSearch
                      defaultActiveFirstOption={false}
                      showArrow={false}
                      filterOption={false}
                      placeholder="请选择就诊人"
                      notFoundContent="无匹配结果"
                      onSearch={this.handleSearchAppoint}
                    >
                      {appointOptions}
                    </Select>
                  )}
                </FormItem>
              </Row>
              <Row>
                <FormItem label="拍摄日期">
                  {getFieldDecorator('filmTime', {
                    initialValue: details.filmTime ? moment(details.filmTime) : null,
                    rules: [{
                      required: true, message: '该字段不能为空',
                    }],
                  })(
                    <DatePicker placeholder="请选择日期" />
                  )}
                </FormItem>
              </Row>
            </Form>
          </div>
        </div>

        <div className="imagesInfo part">
          <div className="head"><h3>图片影像</h3></div>
          <div className="content">
            <Upload
              listType="picture-card"
              fileList={fileList}
              action={getUploadPicUrl({ type: 'img' })}
              beforeUpload={this.beforeUpload}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 10 ? null : this.renderUploadButton()}
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

import { Form, Tag, Row, Checkbox, Modal } from 'antd';
import styles from './VisitModal.less';
const { CheckableTag } = Tag;

class CheckBoxTag extends React.Component {
  state = { checked: false };
  render() {
    return <CheckableTag className="checkBoxTag" {...this.props} checked={this.state.checked} />;
  }
}

class AssessModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getlist() {
    const { selecteRecord, tagList } = this.props;
    const tags = selecteRecord && selecteRecord.comment && selecteRecord.comment.tags;
    const tagslist = tagList
      .filter(({ id }) => {
        return tags.includes(id) || tags.includes(`${id}`);
      })
      .map(({ name }) => {
        return name;
      });
    return tagslist.map((index) => {
      return <CheckBoxTag key={index} className="evaluate">{tagslist}</CheckBoxTag>;
    });
  }

  handleChange(key, value) {
    if (value.target) {
      value = value.target.value;
    }
    this.setState({ [key]: value });
  }

  render() {
    const { onCancel, selecteRecord, onOk } = this.props;
    const modalOpts = {
      title: '患者评价',
      width: 550,
      visible: true,
      maskClosable: false,
      onOk,
      onCancel,
    };

    return (
      <Modal {...modalOpts} className={styles.assessModal}>
        <Form >
          <Row>
            {this.getlist()}
          </Row>
          <Row><span className="praising">{selecteRecord.comment.content}</span></Row>
          <Row>
            <Checkbox
              onChange={this.onChange}
            > 分享到朋友圈
            </Checkbox>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default AssessModal;

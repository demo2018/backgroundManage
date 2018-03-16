import { Form, Button } from 'antd';
import BaseInfo from './BaseInfo.js';
import ReportInfo from './ReportInfo.js';

import styles from './reportDetail.less';

class CustomerDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave() {
    const { form } = this.props;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  }
  render() {
    const { form, toList } = this.props;

    const baseInfoProps = {
      form,
    };

    return (
      <div className={styles.reportDetail}>
        <BaseInfo {...baseInfoProps} />
        <ReportInfo {...baseInfoProps} />
        <div className="btnGroup part">
          <Button type="primary" onClick={this.handleSave}>保存</Button>
          <Button onClick={toList}>取消</Button>
        </div>
      </div >
    );
  }
}

export default Form.create()(CustomerDetail);

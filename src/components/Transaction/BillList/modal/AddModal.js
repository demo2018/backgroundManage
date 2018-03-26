import { Form, Layout, Modal, Table } from 'antd';
import styles from './AddModal.less';

const columns = [{
  title: '项目名称',
  dataIndex: 'itemName',
  key: 'itemName',
}, {
  title: '单价',
  dataIndex: 'originalPrice',
  key: 'Price',
}, {
  title: '数量',
  dataIndex: 'num',
  key: 'num',
}, {
  title: '金额',
  dataIndex: 'allPrice',
  key: 'originalPrice',
}, {
  title: '折扣',
  dataIndex: 'discounts',
  key: 'discount',
}, {
  title: '实际金额',
  dataIndex: 'actualCost',
  key: 'actualCost',
}];

const { Header, Footer, Content } = Layout;
// 页面参数初始化
class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 页面渲染
  render() {
    const { onCancel, selecteRecord, billInfo } = this.props;

    const dataSource = billInfo.map(({ num, originalPrice, discount }, index) => ({ ...billInfo[index], allPrice: (num * originalPrice).toFixed(2), discounts: discount == 1 ? '无' : (discount * 10) + '折' }));

    const modalOpts = {
      title: '账单明细',
      visible: true,
      maskClosable: false,
      onOk: this.handleOk,
      onCancel,
    };

    return (
      <Modal {...modalOpts} className={styles.addModal}>
        <Layout>
          <Header>
            <p>用户名：<span>{selecteRecord.patientName}</span></p>
            <p>账单号：<span>{selecteRecord.billId}</span></p>
          </Header>
          <Content>
            <Table dataSource={dataSource} columns={columns} />
          </Content>
          <Footer>
            <div>
              <p>合计：<span>￥{selecteRecord.originalCost}</span></p>
              {/* <p>合计折扣：<span>{selecteRecord.originalCost}</span></p> */}
              <p>实际金额：<span className="actualcost">￥{selecteRecord.actualCost}</span></p>
            </div>
          </Footer>
        </Layout>
      </Modal>
    );
  }
}

export default Form.create()(AddModal);

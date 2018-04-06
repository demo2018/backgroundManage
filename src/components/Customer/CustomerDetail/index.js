import { Table, Button, Popconfirm, Modal, message } from 'antd';
import { toString } from 'utils/common';
import tableUtil from 'utils/tableUtil';
import BaseInfo from './BaseInfo.js';
import AddModal from './modal/AddModal.js';
import styles from './customerDetail.less';

const { getColumns } = tableUtil;

// 格式化时间格式
const getDetailByStates = (details = {}) => {
  const { birthday } = details;
  return {
    ...details,
    birthday: birthday ? toString(birthday, 'YYYY-MM-DD') : undefined, // 日期组件只支持传入moment对象
  };
};
// 页面参数初始化
class CustomerDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newDetails: getDetailByStates(props.details),
      modalVisible: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('details' in nextProps && nextProps.details !== this.props.details) {
      this.setState({ newDetails: getDetailByStates(nextProps.details) });
    }
  }

  getInitalColumns(fields) {
    const { onUpdateState, onDeletes } = this.props;

    const popconfirmProps = {
      title: '确认删除该关系客户?',
      okText: '确定',
      cancelText: '取消',
    };

    const extraFields = [
      {
        key: 'option',
        name: '操作',
        render: (value, record) => {
          return (<div>
            <a onClick={() => { onUpdateState({ selectRecord: record, addModalVisible: true }); }}>编辑</a>
            <span className="ant-divider"></span>
            <Popconfirm {...popconfirmProps} onConfirm={() => { onDeletes(record.relationId); }}>
              <a>删除</a>
            </Popconfirm>
          </div>);
        },
      }
    ];
    return getColumns(fields).enhance(extraFields).values();
  }
  // 触发提交 判断是新增还是更新
  toSubmit() {
    const { onAddCustomer, onUpdateCustomer } = this.props;
    const { newDetails } = this.state;
    if (newDetails.id) {
      onUpdateCustomer({ ...newDetails });
    } else {
      onAddCustomer({ ...newDetails });
    }
  }
  // 列表清空事件
  handleClear() {
    this.props.onUpdateState({ selected: [] });
  }
  // 添加关系客户事件
  handleMember() {
    const { details, onUpdateState } = this.props;
    if (!details.id) {
      Modal.warning({
        title: '操作提示',
        content: '请先保存客户信息，再添加关系客户！',
      });
    } else {
      onUpdateState({ selectRecord: {}, addModalVisible: true });
    }
  }

  renderTableTitle() {
    const { selected = [] } = this.props;
    return (<p>已选择<span style={{ color: 'red', padding: '0 4px' }}>{selected.length}</span>项
      <a style={{ marginLeft: 10 }} onClick={() => { this.handleClear(); }}>清空</a>
    </p>);
  }
  // 页面渲染
  render() {
    const { fields = [], datas, details, loading, addModalVisible, onUpdateState, downFile, onAdd, onUpdate, onDelete, selected = [], selectRecord, goback } = this.props;
    const { newDetails } = this.setState;
    const columns = this.getInitalColumns(fields);

    const rowSelection = {
      selectedRowKeys: selected,
      onChange: (selectedRowKeys) => {
        onUpdateState({ selected: selectedRowKeys });
      },
    };

    const tableProps = {
      dataSource: datas,
      columns,
      loading,
      rowKey: 'id',
      bordered: true,
      pagination: false,
      rowSelection,
      title: this.renderTableTitle.bind(this)
    };

    const baseInfoProps = {
      details,
      onChange: details => {
        this.setState({ newDetails: { ...newDetails, ...details } });
      }
    };

    const modalProps = {
      selectRecord,
      id: details.id,
      onOK: onAdd,
      onOKs: onUpdate,
      onCancel: () => {
        onUpdateState({ addModalVisible: false });
      }
    };

    const popconfirmProps = {
      title: '确认删除该患者?',
      okText: '确定',
      cancelText: '取消',
    };

    return (
      <div className={styles.customerDetail}>
        <BaseInfo {...baseInfoProps} />
        <div className="btnGroup">
          <Button type="primary" icon="plus" onClick={() => { this.handleMember(); }}>添加成员</Button>
          {/* <Button onClick={downFile}>导出数据</Button> */}
          <Button onClick={() => { message.warning('开发中'); }}>导出数据</Button>
        </div>
        <Table {...tableProps} />
        <div className="pageBtns">
          <Button type="primary" onClick={() => { this.toSubmit(); }}>提交</Button>
          {details.id ?
            <Popconfirm {...popconfirmProps} onConfirm={() => { onDelete(details.id); }}><Button type="danger" ghost>删除</Button></Popconfirm>
            :
            <Button onClick={goback}>取消</Button>
          }
        </div>
        {addModalVisible && <AddModal {...modalProps} />}
      </div >
    );
  }
}

export default CustomerDetail;

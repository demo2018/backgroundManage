import { Table, Button, Popconfirm, Modal } from 'antd';
import tableUtil from 'utils/tableUtil';
import SearchBar from './SearchBar.js';
import AssessModal from './modal/AssessModal.js';
import VisitModal from './modal/VisitModal.js';
import MessageModal from './modal/MessageModal.js';
import { ORDER_SUFFIX } from 'configs/constants';

const { getColumns } = tableUtil;
// 页面参数初始化
class TreatmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  getInitalColumns(fields) {
    const { toTreatmentDetail, onDelete, search: { sortField, ordination } } = this.props;

    const popconfirmProps = {
      title: '确认删除该就诊?',
      okText: '确定',
      cancelText: '取消',
    };

    const extraFields = [
      {
        key: sortField,
        sortOrder: `${ordination.toLocaleLowerCase()}${ORDER_SUFFIX}`
      }, {
        key: 'option',
        name: '操作',
        width: 200,
        render: (value, record) => {
          return (<div>
            <a onClick={() => { toTreatmentDetail(record.id); }}>编辑</a>
            <span className="ant-divider"></span>
            <a onClick={() => { this.toAssess({ selecteRecord: record, assessModalVisible: true }); }}>评价</a>
            <span className="ant-divider"></span>
            <a onClick={() => { this.toVisit({ selecteRecord: record, visitModalVisible: true }); }}>随访</a>
            <span className="ant-divider"></span>
            <Popconfirm {...popconfirmProps} onConfirm={() => { onDelete(record.id); }}>
              <a>删除</a>
            </Popconfirm>
          </div >);
        }
      }];
    return getColumns(fields).enhance(extraFields).values();
  }
  // 列表清空事件
  handleClear() {
    this.props.onUpdateState({ selected: [] });
  }
  // 判断是否选择医生
  handleVerify(handleFn) {
    return () => {
      const { selected = [] } = this.props;
      if (selected.length) {
        handleFn();
      } else {
        Modal.warning({
          title: '操作提示',
          content: '请先选择医生，然后进行操作！',
        });
      }
    };
  }
  // 发送短信事件
  handleSendMsg() {
    const { selected } = this.props;
    if (!selected.length) {
      Modal.warning({
        title: '操作提示',
        content: '请先选择客户！',
      });
    } else {
      this.props.onUpdateState({ messageModalVisible: true });
    }
  }
  // 触发查看评价
  toAssess(state) {
    if (state.selecteRecord.comment) {
      const { getComment } = this.props;
      getComment(state.selecteRecord.id);
      this.props.onUpdateState({ ...state });
    } else {
      Modal.warning({
        title: '抱歉！',
        content: '该就诊暂无评价！',
      });
    }
  }
  // 触发随访记录
  toVisit(state) {
    const { getManager } = this.props;
    getManager(state.selecteRecord.id);
    this.props.onUpdateState({ ...state });
  }
  // 页面排序监听事件
  handleTableSortChange({ current }, sort, { field, order }) {
    const { onSearch, search } = this.props;
    if (current == search.pn && order) {
      onSearch({
        sortField: field,
        ordination: order.replace(ORDER_SUFFIX, '').toUpperCase()
      });
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
    const { getFields, types, datas, total, search, loading, assessModalVisible, visitModalVisible, messageModalVisible, itemList, tagList,
      msgList, onSendMsg, onUpdateState, downFile, addVisit, delVisit, editVisit, onSearch, onReset, selecteRecord, selected = [], visitList, managerList } = this.props;
    const { pn, ps } = search;
    const fields = getFields(itemList); // 这样fileds就是动态生成的
    const columns = this.getInitalColumns(fields);

    const pagination = {
      current: pn,
      total,
      pageSize: ps,
      showQuickJumper: true,
      onChange: page => onSearch({ pn: page }),
      showTotal: t => `共 ${t} 条`,
    };

    const rowSelection = {
      selectedRowKeys: selected,
      onChange: (selectedRowKeys) => {
        this.props.onUpdateState({ selected: selectedRowKeys });
      },
    };

    const modalProps = {
      msgList,
      onOK: onSendMsg,
      onCancel: () => {
        onUpdateState({ messageModalVisible: false });
      }
    };

    const tableProps = {
      dataSource: datas,
      columns,
      loading,
      rowKey: 'id',
      bordered: true,
      pagination,
      rowSelection,
      title: this.renderTableTitle.bind(this),
      onChange: ({ current }, sort, { field, order }) =>
        this.handleTableSortChange({ current }, sort, { field, order })
    };

    const searchBarProps = {
      search,
      itemList,
      types,
      onSearch,
      onReset,
    };

    const assessModalProps = {
      selecteRecord,
      tagList,
      onOK: () => {
        onUpdateState({ selecteRecord: {}, assessModalVisible: false });
      },
      onCancel: () => {
        onUpdateState({ selecteRecord: {}, assessModalVisible: false });
      }
    };

    const visitModalProps = {
      selecteRecord,
      onOK: addVisit,
      onEdit: editVisit,
      onCancel: () => {
        onUpdateState({ selecteRecord: {}, visitModalVisible: false });
      },
      visitList,
      managerList,
      delVisit,
    };

    return (
      <div>
        <SearchBar {...searchBarProps} />
        <div className="btnGroup">
          <Button onClick={this.handleVerify(downFile)}>导出数据</Button>
          <Button onClick={() => { this.handleSendMsg(); }}>发送健康提醒</Button>
        </div>
        <Table {...tableProps} />
        {assessModalVisible && <AssessModal {...assessModalProps} />}
        {visitModalVisible && <VisitModal {...visitModalProps} />}
        {messageModalVisible && <MessageModal {...modalProps} />}
      </div>
    );
  }
}

export default TreatmentList;

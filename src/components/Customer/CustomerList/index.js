import { Table, Button, Popconfirm, Modal, message } from 'antd';
import tableUtil from 'utils/tableUtil';
import SearchBar from './SearchBar.js';
import MessageModal from './modal/MessageModal.js';
import { ORDER_SUFFIX } from 'configs/constants';

const { getColumns } = tableUtil;
// 页面参数初始化
class CustomerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  getInitalColumns(fields) {
    const { toCustomerDetail, onDelete, search: { sortField, ordination } } = this.props;

    const popconfirmProps = {
      title: '确认删除该客户?',
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
        render: (value, { id }) => {
          return (<div>
            <a onClick={() => { toCustomerDetail(id); }}>编辑</a>
            <span className="ant-divider"></span>
            <Popconfirm {...popconfirmProps} onConfirm={() => { onDelete(id); }}>
              <a>删除</a>
            </Popconfirm>
          </div>);
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

    message.warning('开发中');
    // return () => {
    //   const { selected = [] } = this.props;
    //   if (selected.length) {
    //     handleFn();
    //   } else {
    //     Modal.warning({
    //       title: '操作提示',
    //       content: '请先选择医生，然后进行操作！',
    //     });
    //   }
    // };
  }
  // 发送短信事件
  handleSendMsg() {
    message.warning('开发中');
    // const { selected } = this.props;
    // if (!selected.length) {
    //   Modal.warning({
    //     title: '操作提示',
    //     content: '请先选择客户！',
    //   });
    // } else {
    //   this.props.onUpdateState({ messageModalVisible: true });
    // }
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
    const { fields, types, datas, total, search, loading, msgList, messageModalVisible,
      onUpdateState, onSendMsg, toAddCustomer, downFile, onSearch, onReset, selected = [] } = this.props;
    const { pn, ps } = search;
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
      types,
      onSearch,
      onReset,
    };

    const modalProps = {
      msgList,
      onOK: onSendMsg,
      onCancel: () => {
        onUpdateState({ messageModalVisible: false });
      }
    };
    return (
      <div>
        <SearchBar {...searchBarProps} />
        <div className="btnGroup">
          <Button type="primary" icon="plus" onClick={toAddCustomer}>新增</Button>
          <Button onClick={() => this.handleVerify(downFile)}>导出数据</Button>
          <Button onClick={() => { this.handleSendMsg(); }}>发送提醒</Button>
        </div>
        <Table {...tableProps} />
        {messageModalVisible && <MessageModal {...modalProps} />}
      </div>
    );
  }
}

export default CustomerList;

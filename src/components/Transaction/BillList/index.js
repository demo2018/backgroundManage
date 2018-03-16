import { Table, Button, Popconfirm, Modal } from 'antd';
import tableUtil from 'utils/tableUtil';
import SearchBar from './SearchBar.js';
import AddModal from './modal/AddModal.js';
import { ORDER_SUFFIX } from 'configs/constants';

const { getColumns } = tableUtil;
// 页面参数初始化
class ProjectClassify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  getInitalColumns(fields) {
    const { onUpdateState, onDelete, search: { sortField, ordination } } = this.props;

    const popconfirmProps = {
      title: '确认删除该折扣?',
      okText: '确定',
      cancelText: '取消',
    };

    const extraFields = [
      {
        key: sortField,
        sortOrder: `${ordination.toLocaleLowerCase()}${ORDER_SUFFIX}`
      }, {
        key: 'id',
        name: '操作',
        width: 200,
        render: (value, record) => {
          return (<div>
            <a onClick={() => { onUpdateState({ selecteRecord: record, addModalVisible: true }); }}>明细</a>
            <span className="ant-divider"></span>
            <Popconfirm {...popconfirmProps} onConfirm={() => { onDelete({ id: record.id }); }}>
              <a>删除</a>
            </Popconfirm>
          </div >);
        }
      }];

    return getColumns(fields).enhance(extraFields).values();
  }
  // 判断是否选中医生
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
  // 列表清空事件
  handleClear() {
    this.props.onUpdateState({ selected: [] });
  }
  renderTableTitle() {
    const { selected = [] } = this.props;
    return (<p>已选择<span style={{ color: 'red', padding: '0 4px' }}>{selected.length}</span>项
      <a style={{ marginLeft: 10 }} onClick={() => { this.handleClear(); }}>清空</a>
    </p>);
  }
  // 页面渲染
  render() {
    const { fields, types, datas, total, search, loading, addModalVisible, downFile, onUpdateState, tabKey, onTabChange, onAdd, onSearch, onReset, selecteRecord, selected = [] } = this.props;
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
      tabKey,
      onTabChange,
      search,
      types,
      onSearch,
      onReset,
    };

    const addModalProps = {
      selecteRecord,
      onOK: onAdd,
      onCancel: () => {
        onUpdateState({ selecteRecord: {}, addModalVisible: false });
      }
    };
    return (
      <div>
        <SearchBar {...searchBarProps} />
        <div className="btnGroup">
          <Button onClick={this.handleVerify(downFile)}>导出数据</Button>
        </div>
        <Table {...tableProps} />
        {addModalVisible && <AddModal {...addModalProps} />}
      </div>
    );
  }
}

export default ProjectClassify;

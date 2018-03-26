import { Table, Button, Modal } from 'antd';
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
    const { search: { sortField, ordination } } = this.props;

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
            <a onClick={() => { this.getBill({ selecteRecord: record, addModalVisible: true }); }}>明细</a>
          </div >);
        }
      }];

    return getColumns(fields).enhance(extraFields).values();
  }
  // 触发随访记录
  getBill(state) {
    const { getBillinfo } = this.props;
    getBillinfo(state.selecteRecord.id);
    this.props.onUpdateState({ ...state });
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
    const { types, datas, total, search, loading, addModalVisible, downFile, onUpdateState, tabKey, onTabChange, onSearch, onReset, selecteRecord, itemList, getFields, selected = [], billInfo = [] } = this.props;
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
      itemList,
      tabKey,
      onTabChange,
      search,
      types,
      onSearch,
      onReset,
    };

    const addModalProps = {
      selecteRecord,
      onCancel: () => {
        onUpdateState({ selecteRecord: {}, addModalVisible: false });
      },
      billInfo,
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

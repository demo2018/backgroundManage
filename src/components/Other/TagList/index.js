import { Table, Button, Popconfirm } from 'antd';
import tableUtil from 'utils/tableUtil';
import SearchBar from './SearchBar.js';
import AddModal from './modal/AddModal.js';
import { ORDER_SUFFIX } from 'configs/constants';

const { getColumns } = tableUtil;

class LabelList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  getInitalColumns(fields) {
    const { onUpdateState, onDelete, search: { sortField, ordination } } = this.props;

    const popconfirmProps = {
      title: '确认删除该子标签?',
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
            <a onClick={() => { onUpdateState({ selecteRecord: record, addModalVisible: true }); }}>编辑</a>
            <span className="ant-divider"></span>
            <Popconfirm {...popconfirmProps} onConfirm={() => { onDelete(record.id); }}>
              <a>删除</a>
            </Popconfirm>
          </div >);
        }
      }];

    return getColumns(fields).enhance(extraFields).values();
  }
  handleClear() {
    this.props.onUpdateState({ selected: [] });
  }
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
  render() {
    const { fields, types, datas, total, search, loading, addModalVisible, onUpdateState, onTabChange, onAdd, onEdit, onSearch, onReset, selecteRecord, selected = [] } = this.props;
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
      onTabChange,
      search,
      types,
      onSearch,
      onReset,
    };

    const addModalProps = {
      selecteRecord,
      onAdds: onAdd,
      onOK: onEdit,
      onCancel: () => {
        onUpdateState({ selecteRecord: {}, addModalVisible: false });
      }
    };
    return (
      <div>
        <SearchBar {...searchBarProps} />
        <div className="btnGroup">
          <Button type="primary" icon="plus" onClick={() => { onUpdateState({ selecteRecord: {}, addModalVisible: true }); }}>新增分类</Button>
        </div>
        <Table {...tableProps} />
        {addModalVisible && <AddModal {...addModalProps} />}
      </div>
    );
  }
}

export default LabelList;

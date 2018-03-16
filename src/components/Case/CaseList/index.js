import { Table, Button, Popconfirm } from 'antd';
import tableUtil from 'utils/tableUtil';
import SearchBar from './SearchBar.js';
import { ORDER_SUFFIX } from 'configs/constants';

const { getColumns } = tableUtil;

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  getInitalColumns(fields) {
    const { toDetail, onDelete, search: { sortField, ordination } } = this.props;

    const popconfirmProps = {
      title: '确认删除该预约?',
      okText: '确定',
      cancelText: '取消',
    };

    const extraFields = [
      {
        key: sortField,
        sortOrder: `${ordination.toLocaleLowerCase()}${ORDER_SUFFIX}`
      },
      {
        key: 'id',
        name: '操作',
        width: 200,
        render: (value, record) => {
          return (<div>
            <a onClick={() => { toDetail(record.id); }}>编辑</a>
            <span className="ant-divider"></span>
            <Popconfirm {...popconfirmProps} onConfirm={() => { onDelete({ id: record.id }); }}>
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
    const { fields, types, datas, total, search, loading,
      toAdd, onSearch, onReset, selected = [] } = this.props;
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

    return (
      <div>
        <SearchBar {...searchBarProps} />
        <div className="btnGroup">
          <Button type="primary" icon="plus" onClick={toAdd}>新增就诊病历</Button>
        </div>
        <Table {...tableProps} />
      </div>
    );
  }
}

export default ProjectList;

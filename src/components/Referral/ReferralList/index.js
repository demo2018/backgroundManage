import { Table, Button, Modal } from 'antd';
import tableUtil from 'utils/tableUtil';
import SearchBar from './SearchBar.js';
import { ORDER_SUFFIX } from 'configs/constants';

const { getColumns } = tableUtil;

class ReferralList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  getInitalColumns(fields) {
    const { toDetail, search: { sortField, ordination } } = this.props;
    const extraFields = [
      {
        key: sortField,
        sortOrder: `${ordination.toLocaleLowerCase()}${ORDER_SUFFIX}`
      }, {
        key: 'id',
        name: '操作',
        width: 280,
        render: (value, { id }) => {
          return (<div>
            <a onClick={() => { toDetail(id); }}>详情</a>
          </div>);
        }
      }];

    return getColumns(fields).enhance(extraFields).values();
  }
  handleClear() {
    this.props.onUpdateState({ selected: [] });
  }
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
    const { fields, types, datas, total, search, loading, downFile, onSearch, onReset, downReport, selected = [] } = this.props;
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
          <Button onClick={this.handleVerify(downFile)}>导出</Button>
          <Button onClick={this.handleVerify(downReport)}>生成转诊报告</Button>
        </div>
        <Table {...tableProps} />
      </div>
    );
  }
}

export default ReferralList;

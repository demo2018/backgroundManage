import { Table, Button, Popconfirm } from 'antd';
import tableUtil from 'utils/tableUtil';
import SearchBar from './SearchBar.js';
import { ORDER_SUFFIX } from 'configs/constants';

const { getColumns } = tableUtil;
// 页面参数初始化
class AppointmentList extends React.Component {
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
      }, {
        key: 'option',
        name: '操作',
        render: (value, { id }) => {
          return (<div>
            <a onClick={() => { toDetail(id); }}>编辑</a>
            <span className="ant-divider"></span>
            <Popconfirm {...popconfirmProps} onConfirm={() => { onDelete(id); }}>
              <a>删除</a>
            </Popconfirm>
          </div>);
        },
      }, {
        key: 'phone',
        name: '手机号码',
        render: (value, { customerPhone, customerName }) => {
          return (`${customerPhone}(${customerName})`);
        },
      }
    ];

    return getColumns(fields).enhance(extraFields).values();
  }
  // 列表清空事件
  handleClear() {
    this.props.onUpdateState({ selected: [] });
  }
  // 更多操作 暂时不清楚需要触发什么功能 待定
  handleMoreOperation() {
    alert('更多操作！');
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
    const { types, datas, total, search, loading, toAdd, onSearch, onReset, itemList, selected = [], getFields } = this.props;
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
      search,
      itemList,
      types,
      onSearch,
      onReset,
    };

    return (
      <div>
        <SearchBar {...searchBarProps} />
        <div className="btnGroup">
          <Button type="primary" icon="plus" onClick={() => { toAdd(); }}>新增</Button>
          <Button onClick={() => { this.handleMoreOperation(); }}>更多操作</Button>
        </div>
        <Table {...tableProps} />
      </div>
    );
  }
}

export default AppointmentList;

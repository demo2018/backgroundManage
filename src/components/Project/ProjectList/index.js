import { Table, Button, Popconfirm, Input, Icon } from 'antd';
import tableUtil from 'utils/tableUtil';
import SearchBar from './SearchBar.js';
import styles from './index.less';
import { ORDER_SUFFIX } from 'configs/constants';

const { getColumns } = tableUtil;

// 页面参数初始化
class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: ''
    };
  }

  getInitalColumns(fields) {
    const { toDetail, onDelete, search: { sortField, ordination } } = this.props;
    const { editable, rankValue } = this.state;

    const popconfirmProps = {
      title: '确认删除该项目?',
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
            <a onClick={() => { toDetail(record.id); }}>编辑</a>
            <span className="ant-divider"></span>
            <Popconfirm {...popconfirmProps} onConfirm={() => { onDelete(record.id); }}>
              <a>删除</a>
            </Popconfirm>
          </div >);
        }
      }, {
        key: 'rank',
        name: '排序',
        sorter: true,
        render: (text, record) => {
          return (
            <div className="editable-cell">
              {
                editable == record.id ?
                  <div className="editable-cell-input-wrapper">
                    <Input
                      value={rankValue}
                      onChange={this.handleChange}
                      onPressEnter={() => { this.check(record.id); }}
                    />
                    <Icon
                      type="check"
                      className="editable-cell-icon-check"
                      onClick={() => { this.check(record.id); }}
                    />
                  </div>
                  :
                  <div className="editable-cell-text-wrapper">
                    {record.rank || ' '}
                    <Icon
                      type="edit"
                      className="editable-cell-icon"
                      onClick={() => { this.edit({ id: record.id, rank: record.rank }); }}
                    />
                  </div>
              }
            </div>
          );
        },
      }
    ];

    return getColumns(fields).enhance(extraFields).values();
  }
  // 实时修改排序值
  handleChange = (e) => {
    const rankValue = e.target.value;
    this.setState({ rankValue });
  }
  // 点击确定修改
  check = (id) => {
    this.setState({ editable: '' });
    this.props.rankChange(id, this.state.rankValue);
  }
  // 点击触发编辑
  edit = (info) => {
    this.setState({ editable: info.id, rankValue: info.rank });
  }
  // 列表清空事件
  handleClear() {
    this.props.onUpdateState({ selected: [] });
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
    const { fields, types, datas, total, search, loading, toAdd, onSearch, onReset, selected = [] } = this.props;
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
      <div className={styles.projectList}>
        <SearchBar {...searchBarProps} />
        <div className="btnGroup">
          <Button type="primary" icon="plus" onClick={toAdd}>新增项目</Button>
        </div>
        <Table {...tableProps} />
      </div>
    );
  }
}

export default ProjectList;

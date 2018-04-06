import { Table, Button, Modal, Input, Icon, message } from 'antd';
import tableUtil from 'utils/tableUtil';
import SearchBar from './SearchBar.js';
import styles from './doctorList.less';
import MessageModal from './modal/MessageModal.js';
import { ORDER_SUFFIX } from 'configs/constants';

const { getColumns } = tableUtil;

// 页面参数初始化
class DoctorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: '',
      modalVisible: false,
    };
  }

  getInitalColumns(fields) {
    const { toDetail, toAudit, toProgress, topPlans, search: { sortField, ordination } } = this.props;
    const { editable, rankValue } = this.state;

    const extraFields = [
      {
        key: sortField,
        sortOrder: `${ordination.toLocaleLowerCase()}${ORDER_SUFFIX}`
      }, {
        key: 'option',
        name: '操作',
        width: 280,
        render: (value, record) => {
          return (<div>
            <a onClick={() => { toDetail(record.id); }}>编辑</a>
            {record.status == 4 ? <span className="ant-divider"></span> : null}
            {record.status == 4 ? <a onClick={() => { toAudit(record.id); }}>审核</a> : null}
            {record.status == 1 ? <span className="ant-divider"></span> : null}
            {record.status == 1 ? <a onClick={() => { topPlans(record.id); }}>出诊安排</a> : null}
            {record.source == 1 ? <span className="ant-divider"></span> : null}
            {record.source == 1 ? <a onClick={() => { toProgress(record.id); }}>邀请进程</a> : null}
          </div>);
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
  // 发送短信事件
  handleSendMsg() {
    message.warning('开发中');
    // const { selected } = this.props;
    // if (!selected.length) {
    //   Modal.warning({
    //     title: '操作提示',
    //     content: '请先选择医生！',
    //   });
    // } else {
    //   this.props.onUpdateState({ messageModalVisible: true });
    // }
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
    const { fields, types, datas, total, search, loading, toAdd, downFile, onSearch, onReset, msgList, messageModalVisible, onSendMsg, onUpdateState, downReport, adeptList, selected = [] } = this.props;
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
      adeptList,
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
      <div className={styles.doctorList}>
        <SearchBar {...searchBarProps} />
        <div className="btnGroup">
          <Button type="primary" icon="plus" onClick={() => { toAdd(); }}>新增医生</Button>
          <Button onClick={() => this.handleVerify(downFile)}>导出数据</Button>
          <Button onClick={() => { this.handleSendMsg(); }}>发送提醒</Button>
          <Button onClick={() => this.handleVerify(downReport)}>生成邀请报告</Button>
        </div>
        <Table {...tableProps} />
        {messageModalVisible && <MessageModal {...modalProps} />}
      </div>
    );
  }
}

export default DoctorList;

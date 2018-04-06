import { Form, Button, Input, Select, DatePicker, Radio, Modal, TimePicker, Table, Popconfirm } from 'antd';
import styles from './doctorPlans.less';
import tableUtil from 'utils/tableUtil';
import { toString } from 'utils/common';
import { ORDER_SUFFIX } from 'configs/constants';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const format = 'HH:mm';
const { getColumns } = tableUtil;

// 页面初始化
class DoctorPlans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: props.details,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('details' in nextProps && nextProps.details !== this.props.details) {
      this.setState({ details: { ...nextProps.details } });
    }
  }

  getInitalColumns(fields) {
    const { onDeletes, search: { sortField, ordination } } = this.props;

    const popconfirmProps = {
      title: '确认删除该出诊?',
      okText: '确定',
      cancelText: '取消',
    };

    const extraFields = [{
      key: sortField,
      sortOrder: `${ordination.toLocaleLowerCase()}${ORDER_SUFFIX}`
    }, {
      key: 'option',
      name: '操作',
      render: (value, record) => {
        return (<div>
          {record.status == 0 ?
            <Popconfirm {...popconfirmProps} onConfirm={() => { onDeletes(record.id); }}>
              <a>删除</a>
            </Popconfirm>
            : null
          }
        </div>);
      },
    }
    ];

    return getColumns(fields).enhance(extraFields).values();
  }
  // 列表清空事件
  handleClear() {
    this.props.onUpdateState({ selected: [] });
  }
  // 触发提交 判断是新增还是修改
  handleSave() {
    const { form, toPlans } = this.props;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.date) {
          const { date, startTime, endTime } = values;
          const start = new Date(startTime).getTime();
          const end = new Date(endTime).getTime();
          if (start < end) {
            toPlans({ ...values, date: date ? toString(date, 'YYYY-MM-DD') : undefined, startTime: startTime ? toString(startTime, 'HH:mm') : undefined, endTime: endTime ? toString(endTime, 'HH:mm') : undefined, interval: 15 });
          } else {
            Modal.warning({
              title: '提示！',
              content: '终诊时间不能小于初诊时间！',
            });
          }
        } else {
          Modal.warning({
            title: '抱歉！',
            content: '请选择出诊日期！',
          });
        }
      }
    });
  }
  //  设置今天及之前日期不可选
  disabledDate(currentDate) {
    if (new Date().getTime() > new Date(currentDate).getTime()) {
      return true;
    }
    return false;
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
    const { fields = [], loading, form, details, hospitalList, goback, onUpdateState, selected = [], datelists, search, onSearch, total } = this.props;
    const { getFieldDecorator } = form;
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
        onUpdateState({ selected: selectedRowKeys });
      },
    };

    const tableProps = {
      dataSource: datelists,
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

    return (
      <div className={styles.doctorPlans}>
        <h3 className="title"> 出诊安排 </h3>
        <Form layout="inline">
          <FormItem label="医生姓名">
            {getFieldDecorator('doctorId', {
              initialValue: `${details.id}`,
              rules: [{ required: true, whitespace: true, message: '不能为空' }]
            })(
              <Select placeholder="医生姓名将自动填写" disabled>
                <Option key={details.id} value={`${details.id}`}>{details.realName}</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="手机号码">
            {getFieldDecorator('phone', {
              initialValue: details.phone,
              rules: [{ required: true, whitespace: true, message: '不能为空' }]
            })(
              <Input placeholder="选填" disabled />
            )}
          </FormItem>
          <FormItem label="诊所选择">
            {getFieldDecorator('hospitalId', {
              initialValue: details.hospitalId,
              rules: [{ required: true, whitespace: true, message: '不能为空' }]
            })(
              <Select placeholder="请选择" >
                {hospitalList.map(({ id, name }) => (<Option key={id} value={`${id}`}>{name}</Option>))}
              </Select>
            )}
          </FormItem>
          <FormItem label="出诊安排">
            {getFieldDecorator('date', {
              initialValue: details.date,
            })(
              <DatePicker disabledDate={this.disabledDate} />
            )}
          </FormItem>
          <FormItem label="初诊">
            {getFieldDecorator('startTime', {
              initialValue: details.startTime,
            })(
              <TimePicker minuteStep={15} format={format} />
            )}
          </FormItem>
          <FormItem label="终诊">
            {getFieldDecorator('endTime', {
              initialValue: details.endTime,
            })(
              <TimePicker minuteStep={15} format={format} />
            )}
          </FormItem>
          {/* <FormItem label="时间间隔">
            {getFieldDecorator('interval', {
              initialValue: details.interval,
              rules: [{ required: true, whitespace: true, message: '不能为空' }]
            })(
              <Select placeholder="时间间隔">
                <Option value="15">15分钟</Option>
                <Option value="30">30分钟</Option>
                <Option value="45">45分钟</Option>
                <Option value="60">60分钟</Option>
                <Option value="90">90分钟</Option>
              </Select>
            )}
          </FormItem> */}
          <FormItem label="是否约满">
            {getFieldDecorator('status', {
              initialValue: 0,
            })(
              <RadioGroup>
                <Radio value={0}>否</Radio>
                <Radio value={1}>是</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <div className="btnGroup">
            <Button type="primary" onClick={() => { this.handleSave(); }}>保存</Button>
            <Button onClick={goback}>取消</Button>
          </div>
        </Form>
        <Table {...tableProps} />
      </div>
    );
  }
}

export default Form.create()(DoctorPlans);

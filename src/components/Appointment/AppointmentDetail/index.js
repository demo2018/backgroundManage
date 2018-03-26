import { Form, Button, Popconfirm, Input, Select } from 'antd';
import { appointmentStatus, treatmentType } from 'configs/constants';
import styles from './appointmentDetail.less';
import TagPicker from './TagPicker.js';

const FormItem = Form.Item;
const Option = Select.Option;
let patentTimer = null;
let doctorTimer = null;

const projectTimes = [
  {
    value: 15,
    label: '15分钟',
  },
  {
    value: 30,
    label: '30分钟',
  },
  {
    value: 45,
    label: '45分钟',
  },
];

const formatSelectValue = (value) => {
  if (value || value === 0) {
    return `${value}`;
  }
};
// 页面参数初始化
class AppointmentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: props.details,
    };
    this.handleSearchPatent = this.handleSearchPatent.bind(this);
    this.handleSearchDoctor = this.handleSearchDoctor.bind(this);
    this.handlePatientChange = this.handlePatientChange.bind(this);
    this.handleDoctorChange = this.handleDoctorChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ('details' in nextProps && nextProps.details !== this.props.details) {
      this.setState({ details: nextProps.details });
    }
  }
  // 触发保存 判断为新增还是更新
  handSave() {
    const { addAppointment, updateAppointment, doctorTimes, form, details } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        // 拼接开始时间
        const { time, visitPlanIds = [] } = values;

        const startTime = (doctorTimes.find(({ id }) => {
          return id === visitPlanIds[0];
        }) || {}).time;

        const newTime = `${time} ${startTime}`;
        if (details.id) {
          updateAppointment({ ...values, time: newTime }, details.id);
        } else {
          addAppointment({ ...values, time: newTime });
        }
      }
    });
  }
  // 查询就诊人
  handleSearchPatent(patientName = '') {
    const { getPatientList } = this.props;
    const newPatientName = patientName.replace(/(^\s*)|(\s*$)/g, '');
    if (patentTimer) {
      clearTimeout(patentTimer);
      patentTimer = null;
    }
    if (patientName !== '') {
      patentTimer = setTimeout(() => {
        getPatientList({ name: newPatientName });
      }, 500);
    }
  }
  // 查询医生
  handleSearchDoctor(doctorName = '') {
    const { getDoctorList } = this.props;
    const newDoctorName = doctorName.replace(/(^\s*)|(\s*$)/g, '');
    if (doctorTimer) {
      clearTimeout(doctorTimer);
      doctorTimer = null;
    }
    if (doctorName !== '') {
      doctorTimer = setTimeout(() => {
        getDoctorList({ name: newDoctorName, status: 1, is_show: 1 });
      }, 500);
    }
  }
  // 病人选中，判断是否是关系人
  handlePatientChange(value) {
    const { patientList } = this.props;
    const patient = patientList.find(({ customerId }) => {
      return value == customerId;
    }) || {};
    this.setState({ relationinfo: { relationId: patient.relationId, relationName: patient.relationName } });
  }
  // 选中医生，查询可选日期
  handleDoctorChange(value) {
    const { getDoctorDates, form, updateState } = this.props;
    form.setFieldsValue({ visitPlanIds: [], time: undefined });
    updateState({ doctorDates: [], doctorTimes: [] });
    getDoctorDates({ doctorId: value });
  }
  // 选中日期，查询可用时间段
  handleDateChange(value) {
    const { form, doctorDates, getDoctorTimes } = this.props;
    const { doctorId } = form.getFieldsValue(['doctorId']);
    const hospitalId = (doctorDates.find(({ date }) => {
      return date === value;
    }) || {}).hospitalId;
    form.setFieldsValue({ visitPlanIds: [], hospitalId });
    getDoctorTimes({ id: doctorId, date: value });
  }
  // 选中就诊时长，改变时间段
  handleTimeChange(value) {
    const { form } = this.props;
    const { details } = this.state;
    this.setState({ details: { ...details, timeCost: value } });
    form.setFieldsValue({ visitPlanIds: [] });
  }
  // 页面渲染
  render() {
    const { details, relationinfo = {} } = this.state;
    const { onDelete, form, projectList, patientList, doctorList,
      doctorDates, doctorTimes, hospitalList } = this.props;
    const { getFieldDecorator } = form;
    // 就诊人与预约人至今的关系
    const patientOptions = patientList.map(({ isPatient, relationName, customerName, customerId, phone, relationPhone }) => {
      if (isPatient == true) {
        return <Option key={`${customerId}`} value={`${customerId}`}>{customerName} ({phone})</Option>;
      } else {
        if (relationName) {
          return <Option key={`${customerId}`} value={`${customerId}`}>{customerName} ({relationName}：{relationPhone})</Option>;
        } else {
          return <Option key={`${customerId}`} value={`${customerId}`}>{customerName}</Option>;
        }
      }
    });
    // 医生列表
    const doctorOptions = doctorList.map(({ id, realName }) => {
      return <Option key={id} value={`${id}`}>{realName}</Option>;
    });

    const popconfirmProps = {
      title: '确认删除该患者?',
      okText: '确定',
      cancelText: '取消',
    };

    return (
      <div className={styles.appointmentDetail}>
        <h3 className="title">{details.id ? '编辑预约' : '新增预约'}</h3>
        <Form layout="inline">
          <FormItem label="就诊人姓名">
            {getFieldDecorator('patientId', {
              initialValue: formatSelectValue(details.patientId),
              rules: [{ required: true, whitespace: true, message: '就诊人不能为空' }]
            })(
              <Select
                showSearch
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                placeholder="请选择就诊人"
                notFoundContent="无匹配结果"
                onSearch={this.handleSearchPatent}
                // onBlur={this.handleSearchPatent}
                onChange={this.handlePatientChange}
              >
                {patientOptions}
              </Select>
            )}
          </FormItem>
          {relationinfo && relationinfo.relationId ?
            <FormItem label="预约人姓名">
              {getFieldDecorator('customerId', {
                initialValue: formatSelectValue(relationinfo.relationId),
              })(
                <Select placeholder="请选择就诊人，预约人将自动填写" disabled>
                  <Option key={relationinfo.relationId} value={`${relationinfo.relationId}`}>{relationinfo.relationName}</Option>
                </Select>
              )}
            </FormItem>
            :
            <FormItem label="预约人姓名">
              {getFieldDecorator('customerId', {
                initialValue: formatSelectValue(details.customerId),
              })(
                <Select placeholder="请选择就诊人，预约人将自动填写" disabled>
                  <Option key={details.customerId} value={`${details.customerId}`}>{details.customerName}</Option>
                </Select>
              )}
            </FormItem>
          }
          <FormItem label="预约项目">
            {getFieldDecorator('itemClassId', {
              initialValue: formatSelectValue(details.itemClassId),
              rules: [{ required: true, whitespace: true, message: '预约项目不能为空' }]
            })(
              <Select placeholder="请选择" >
                {projectList.map(({ id, className }) => {
                  return <Option key={id} value={`${id}`}>{className}</Option>;
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="初/复诊">
            {getFieldDecorator('type', {
              initialValue: formatSelectValue(details.type),
              rules: [{ required: true, whitespace: true, message: '初/复诊不能为空' }]
            })(
              <Select placeholder="请选择" >
                {treatmentType.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
              </Select>
            )}
          </FormItem>
          <FormItem label="医生">
            {getFieldDecorator('doctorId', {
              initialValue: formatSelectValue(details.doctorId),
              rules: [{ required: true, whitespace: true, message: '医生不能为空' }]
            })(
              <Select
                showSearch
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                placeholder="请选择医生"
                notFoundContent="无匹配结果"
                onSearch={this.handleSearchDoctor}
                // onBlur={this.handleSearchDoctor}
                onChange={this.handleDoctorChange}
              >
                {doctorOptions}
              </Select>
            )}
          </FormItem>
          <FormItem label="就诊日期">
            {getFieldDecorator('time', {
              initialValue: formatSelectValue(details.time),
              rules: [{ required: true, whitespace: true, message: '就诊日期不能为空' }]
            })(
              <Select placeholder="请选择就诊日期" onChange={this.handleDateChange}>
                {doctorDates.map(({ status, date }) => {
                  if (status == 1) {
                    return <Option key={date} value={`${date}`} disabled>{date}(已约满)</Option>;
                  } else {
                    return <Option key={date} value={`${date}`}>{date}</Option>;
                  }
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="项目所需时长">
            {getFieldDecorator('timeCost', {
              initialValue: formatSelectValue(details.timeCost || 15),
              rules: [{ required: true, whitespace: true, message: '就诊时长不能为空' }]
            })(
              <Select placeholder="请选择项目所需时长" onChange={this.handleTimeChange}>
                {projectTimes.map(({ value, label }) => {
                  return <Option key={value} value={`${value}`}>{label}</Option>;
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="就诊时间">
            {getFieldDecorator('visitPlanIds', {
              initialValue: formatSelectValue(details.visitPlanIds || []),
              rules: [{ required: true, message: '就诊时间段不能为空' }]
            })(
              <TagPicker timeLength={details.timeCost || 15} timeInterval={15} doctorTimes={doctorTimes} />
            )}
          </FormItem>
          <FormItem label="诊所名称">
            {getFieldDecorator('hospitalId', {
              initialValue: formatSelectValue(details.hospitalId),
            })(
              <Select placeholder="诊所名称" disabled>
                {
                  hospitalList.map(({ value, label }) => {
                    return <Option key={value} value={`${value}`}>{label}</Option>;
                  })
                }
              </Select>
            )}
          </FormItem>
          <FormItem label="预约状态">
            {getFieldDecorator('status', {
              initialValue: formatSelectValue(details.status),
            })(
              <Select placeholder="请选择" >
                {appointmentStatus.map(({ label, value }) => {
                  return <Option key={value} value={`${value}`}>{label}</Option>;
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="备注">
            {getFieldDecorator('remark', {
              initialValue: formatSelectValue(details.remark),
            })(
              <Input type="textarea" placeholder="请输入" />
            )}
          </FormItem>
          <div className="btnGroup">
            <Button type="primary" onClick={() => { this.handSave(); }}>保存</Button>
            {details.id ? <Popconfirm {...popconfirmProps} onConfirm={() => { onDelete(details.id); }}><Button type="danger" ghost>删除</Button></Popconfirm> : ''}
          </div>
        </Form>
      </div >
    );
  }
}

export default Form.create()(AppointmentDetail);

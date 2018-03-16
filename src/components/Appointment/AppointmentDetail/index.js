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

const numToStr = (num = '') => {
  return `${num}`;
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
    const { addAppointment, updateAppointment, form, details } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        if (details.id) {
          updateAppointment({ ...values });
        } else {
          addAppointment({ ...values });
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
      }, 1000);
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
        getDoctorList({ name: newDoctorName });
      }, 1000);
    }
  }
  // 病人选中，判断是否是关系人
  handlePatientChange(value) {
    const { form, patientList } = this.props;

    const patient = patientList.find(({ relationId, customerId }) => {
      return value == relationId || value == customerId;
    }) || {};

    const customerId = patient.isPatient ? patient.customerId : patient.relationId;
    form.setFieldsValue({ customerId });
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
    const { form, getDoctorTimes } = this.props;
    const { doctorId } = form.getFieldsValue(['doctorId']);
    form.setFieldsValue({ visitPlanIds: [] });
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
    const { details } = this.state;
    const { onDelete, form, projectList, patientList, doctorList,
      doctorDates, doctorTimes, hospitalList } = this.props;
    const { getFieldDecorator } = form;

    // todo 就诊人与预约人至今的关系？？？
    const patientOptions = patientList.map(({ isPatient, relationName, customerName, relationId, customerId }) => {
      return <Option key={`${customerId || relationId}`} value={`${customerId || relationId}`}>{relationName || customerName}</Option>;
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
              initialValue: numToStr(details.patientId),
              rules: [{ required: true, whitespace: true, message: '就诊人不能为空' }]
            })(
              <Select
                showSearch
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                placeholder="请选择就诊人"
                onSearch={this.handleSearchPatent}
                // onBlur={this.handleSearchPatent}
                onChange={this.handlePatientChange}
              >
                {patientOptions}
              </Select>
            )}
          </FormItem>
          <FormItem label="预约人姓名">
            {getFieldDecorator('customerId', {
              initialValue: details.customerId && `${details.customerId}`,
            })(
              <Input placeholder="选填" />
            )}
          </FormItem>
          <FormItem label="预约项目">
            {getFieldDecorator('itemClassId', {
              initialValue: numToStr(details.itemClassId),
              rules: [{ required: true, whitespace: true, message: '预约项目不能为空' }]
            })(
              <Select placeholder="请选择" >
                {projectList.map(({ id, className }) => {
                  return <Option key={`${id}`} value={`${id}`}>{className}</Option>;
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="初/复诊">
            {getFieldDecorator('type', {
              initialValue: numToStr(details.type),
              rules: [{ required: true, whitespace: true, message: '初/复诊不能为空' }]
            })(
              <Select placeholder="请选择" >
                {treatmentType.map(({ label, value }) => (<Option key={value} value={`${value}`}>{label}</Option>))}
              </Select>
            )}
          </FormItem>
          <FormItem label="医生">
            {getFieldDecorator('doctorId', {
              initialValue: numToStr(details.doctorId),
              rules: [{ required: true, whitespace: true, message: '医生不能为空' }]
            })(
              <Select
                // showSearch
                // defaultActiveFirstOption={false}
                // placeholder="请选择医生"
                // onSearch={this.handleSearchDoctor}
                // onBlur={this.handleSearchDoctor}
                onChange={this.handleDoctorChange}
              >
                {doctorList.map(({ id, realName }) => {
                  return <Option key={`${id}`} value={`${id}`}>{realName}</Option>;
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="就诊日期">
            {getFieldDecorator('time', {
              initialValue: numToStr(details.time),
              rules: [{ required: true, whitespace: true, message: '就诊日期不能为空' }]
            })(
              <Select
                placeholder="请选择就诊日期"
                onChange={this.handleDateChange}
              >
                {doctorDates.map(({ date }) => {
                  return <Option key={`${date}`} value={`${date}`}>{date}</Option>;
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="项目所需时长">
            {getFieldDecorator('timeCost', {
              initialValue: numToStr(details.timeCost || 15),
              rules: [{ required: true, whitespace: true, message: '就诊日期不能为空' }]
            })(
              <Select
                placeholder="请选择项目所需时长"
                onChange={this.handleTimeChange}
              >
                {projectTimes.map(({ value, label }) => {
                  return <Option key={`${value}`} value={`${value}`}>{label}</Option>;
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="就诊时间">
            {getFieldDecorator('visitPlanIds', {
              initialValue: details.visitPlanIds || [],
              rules: [{ required: true, message: '就诊时间段不能为空' }]
            })(
              <TagPicker timeLength={details.timeCost} timeInterval={15} doctorTimes={doctorTimes} />
            )}
          </FormItem>
          <FormItem label="诊所名称">
            {getFieldDecorator('hospitalId', {
              initialValue: numToStr(details.hospitalId),
            })(
              <Select
                placeholder="诊所名称"
                disabled
              >
                {
                  hospitalList.map(({ value, label }) => {
                    return <Option key={`${value}`} value={`${value}`}>{label}</Option>;
                  })
                }
              </Select>
            )}
          </FormItem>
          <FormItem label="预约状态">
            {getFieldDecorator('status', {
              initialValue: numToStr(details.status),
            })(
              <Select placeholder="请选择" >
                {appointmentStatus.map(({ label, value }) => {
                  return <Option key={`${value}`} value={`${value}`}>{label}</Option>;
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="备注">
            {getFieldDecorator('remark', {
              initialValue: numToStr(details.remark),
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

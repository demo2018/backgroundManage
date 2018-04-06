import { appointmentStatus, appointmentSource } from 'configs/constants';

export const getFields = (enums = []) => {
  const itemLists = enums.map(({ id, className }) => (
    {
      value: id,
      label: className
    }
  ));

  return [
    {
      key: 'appointId',
      name: '预约单号',
      sorter: true,
    },
    {
      key: 'patientName',
      name: '就诊人姓名'
    },
    {
      key: 'phone',
      name: '手机号码'
    },
    {
      key: 'itemClassId',
      name: '预约项目',
      enums: itemLists,
    },
    {
      key: 'source',
      name: '预约来源',
      enums: appointmentSource,
      sorter: true,
    },
    {
      key: 'doctorName',
      name: '预约医生'
    },
    {
      key: 'status',
      name: '预约状态',
      enums: appointmentStatus,
      sorter: true,
      render: (value) => {
        if (value == 0) {
          return <p><span className="status determine"></span>未确认</p>;
        } else if (value == 1) {
          return <p><span className="status success"></span>已确认</p>;
        } else if (value == 2) {
          return <p><span className="status on"></span>就诊中</p>;
        } else if (value == 3) {
          return <p><span className="status done"></span>已完成</p>;
        } else if (value == 4) {
          return <p><span className="status cancel"></span>已取消</p>;
        }
      }

    },
    {
      key: 'time',
      name: '就诊时间',
      // type: 'datetime',
      sorter: true,
    },
    {
      key: 'option',
      name: '操作'
    }
  ];
};

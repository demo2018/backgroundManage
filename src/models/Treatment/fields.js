import { treatmentType, treatmentStatus } from 'configs/constants';

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
      name: '就诊单号',
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
      name: '就诊项目',
      enums: itemLists,
      sorter: true,
    },
    {
      key: 'type',
      name: '初/复诊',
      enums: treatmentType,
      sorter: true,
    },
    {
      key: 'doctorName',
      name: '医生'
    },
    {
      key: 'status',
      name: '就诊状态',
      enums: treatmentStatus,
      sorter: true,
      render: (value) => {
        if (value == 0) {
          return <p><span className="status determine"></span>待核实</p>;
        } else if (value == 1) {
          return <p><span className="status success"></span>未开始</p>;
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

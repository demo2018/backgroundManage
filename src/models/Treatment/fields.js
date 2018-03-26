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
      key: 'customerName',
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

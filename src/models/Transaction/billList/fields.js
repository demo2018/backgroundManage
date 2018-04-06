import { payType, payStatus, saleType } from 'configs/constants';

export const getFields = (enums = []) => {
  const itemLists = enums.map(({ id, className }) => (
    {
      value: `${id}`,
      label: className
    }
  ));

  return [
    {
      key: 'billId',
      name: '账单号'
    },
    {
      key: 'patientName',
      name: '患者姓名'
    },
    {
      key: 'phone',
      name: '手机号'
    },
    {
      key: 'doctorName',
      name: '医生姓名'
    },
    {
      key: 'hospitalName',
      name: '诊所名称',
    },
    {
      key: 'createTime',
      name: '就诊时间',
      type: 'datetime',
      sorter: true,
    },
    {
      key: 'itemName',
      name: '项目',
      enums: itemLists
    },
    {
      key: 'originalCost',
      name: '原价',
    },
    {
      key: 'actualCost',
      name: '支付金额',
    },
    {
      key: 'status',
      name: '状态',
      enums: payStatus,
      sorter: true,
    },
    {
      key: 'payType',
      name: '支付方式',
      enums: payType,
      sorter: true,
    },
    {
      key: 'isOnSale',
      name: '优惠情况',
      enums: saleType,
      sorter: true,
    },
    {
      key: 'id',
      name: '操作'
    }
  ];
};

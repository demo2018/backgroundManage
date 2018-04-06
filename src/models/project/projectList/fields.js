import { treatmentStatus } from 'configs/constants';
import { getServer } from 'utils/common';
const { disease } = getServer();

export const fields = [
  {
    key: 'id',
    name: '项目ID',
    sorter: true,
  },
  {
    key: 'icon',
    name: '项目icon',
    render: (icon) => <img src={`${disease}/bhyy/core/image/${icon}`} /> // 把后台有的banner存成一个数组 取数组里得img，设置img的src={text.img}
  },
  {
    key: 'name',
    name: '项目名称'
  },
  {
    key: 'price',
    name: '价格'
  },
  {
    key: 'unit',
    name: '单位'
  },
  {
    key: 'patientClass',
    name: '患者端类别',
    enums: treatmentStatus
  },
  {
    key: 'doctorClass',
    name: '医生端类别',
    enums: treatmentStatus
  },
  {
    key: 'rank',
    name: '排序'
  },
  {
    key: 'option',
    name: '操作'
  }
];

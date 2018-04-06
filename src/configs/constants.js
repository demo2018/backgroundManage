export const PAGE_SIZE = 20;
export const ORDER_SUFFIX = 'end';

export const treatmentStatus = [
  {
    value: 0,
    label: '待核实'
  }, {
    value: 1,
    label: '未开始'
  }, {
    value: 2,
    label: '就诊中'
  }, {
    value: 3,
    label: '已完成'
  }, {
    value: 4,
    label: '已取消'
  }
];

export const treatmentType = [
  {
    value: 0,
    label: '初诊'
  }, {
    value: 1,
    label: '复诊'
  }
];

export const genderType = [
  {
    value: 0,
    label: '女'
  }, {
    value: 1,
    label: '男'
  }
];

export const ageType = [
  {
    value: 0,
    label: '0～5岁'
  }, {
    value: 1,
    label: '6～14岁'
  }, {
    value: 2,
    label: '15～30岁'
  }, {
    value: 3,
    label: '30～60岁'
  }, {
    value: 4,
    label: '60岁以上'
  }
];

export const appointmentStatus = [
  {
    value: 0,
    label: '未确认'
  }, {
    value: 1,
    label: '已确认'
  }, {
    value: 2,
    label: '就诊中'
  }, {
    value: 3,
    label: '已完成'
  }, {
    value: 4,
    label: '已取消'
  }
];

export const appointmentSource = [
  {
    value: 0,
    label: '前台预约'
  }, {
    value: 1,
    label: '后台预约'
  }
];

export const sourceStatus = [
  {
    value: 0,
    label: '患者推荐'
  }, {
    value: 1,
    label: '医生推荐'
  }, {
    value: 2,
    label: '市场活动'
  }, {
    value: 3,
    label: '企业活动'
  }, {
    value: 4,
    label: '后台录入'
  }, {
    value: 5,
    label: '其他'
  }
];

export const doctorStatus = [
  {
    value: 0,
    label: '已注册,待认证'
  }, {
    value: 1,
    label: '认证成功'
  }, {
    value: 2,
    label: '认证失败'
  }, {
    value: 3,
    label: '停诊中'
  }, {
    value: 4,
    label: '待审核'
  }
];

export const doctorSource = [
  {
    value: 0,
    label: '自助注册'
  }, {
    value: 1,
    label: '医生推荐'
  }, {
    value: 2,
    label: '后台录入'
  }
];

export const isShow = [
  {
    value: 0,
    label: '否'
  }, {
    value: 1,
    label: '是'
  }
];
// 成员关系
export const relationStatus = [
  {
    value: 0,
    label: '夫妻'
  }, {
    value: 1,
    label: '母女'
  }, {
    value: 2,
    label: '父女'
  }, {
    value: 3,
    label: '母子'
  }, {
    value: 4,
    label: '父子'
  }, {
    value: 5,
    label: '兄弟姐妹'
  }, {
    value: 6,
    label: '朋友'
  }, {
    value: 7,
    label: '同事'
  }, {
    value: 8,
    label: '亲戚'
  }, {
    value: 9,
    label: '其它'
  }
];

export const feedbackStatus = [
  {
    value: 0,
    label: '未跟进'
  }, {
    value: 1,
    label: '已跟进'
  }
];

export const itemStatus = [
  {
    value: 0,
    label: '禁用'
  }, {
    value: 1,
    label: '启用'
  }
];

export const typeStatus = [
  {
    value: 0,
    label: '医生'
  }, {
    value: 1,
    label: '患者'
  }
];

export const followType = [
  {
    value: 0,
    label: '电话跟进'
  }, {
    value: 1,
    label: '微信跟进'
  }
];

export const sendStatus = [
  {
    value: 0,
    label: '未发送'
  }, {
    value: 1,
    label: '已发送'
  }
];

export const visitType = [
  {
    value: 0,
    label: '电话随访'
  }, {
    value: 1,
    label: '微信随访'
  }
];

export const payStatus = [
  {
    value: 0,
    label: '未支付'
  }, {
    value: 1,
    label: '已支付'
  }
];

export const payType = [
  {
    value: 0,
    label: '微信支付'
  }, {
    value: 1,
    label: '其它支付'
  }
];

export const saleType = [
  {
    value: 0,
    label: '无折扣'
  }, {
    value: 1,
    label: '有折扣'
  }, {
    value: 2,
    label: '有优惠券'
  }
];

export const referralStatus = [
  {
    value: 0,
    label: '转诊中已扫码'
  }, {
    value: 1,
    label: '转诊中咨询中'
  }, {
    value: 2,
    label: '转诊中已注册'
  }, {
    value: 3,
    label: '转诊中已预约'
  }, {
    value: 4,
    label: '转诊中已就诊'
  }, {
    value: 5,
    label: '转诊成功未支付'
  }, {
    value: 6,
    label: '转诊成功已支付'
  }, {
    value: 7,
    label: '取消预约'
  }
];

export const weekDay = [
  {
    value: 0,
    label: '星期日'
  }, {
    value: 1,
    label: '星期一'
  }, {
    value: 2,
    label: '星期二'
  }, {
    value: 3,
    label: '星期三'
  }, {
    value: 4,
    label: '星期四'
  }, {
    value: 5,
    label: '星期五'
  }, {
    value: 6,
    label: '星期六'
  }
];

export const bookStatus = [
  {
    value: 0,
    label: '未约满'
  }, {
    value: 1,
    label: '已约满'
  }
];

export const rebateType = [
  {
    value: 0,
    label: '现金'
  }, {
    value: 1,
    label: '薄荷币'
  }
];

export const rebateNum = [
  {
    value: 0,
    label: '0~50'
  }, {
    value: 1,
    label: '50~100'
  }, {
    value: 2,
    label: '100~200'
  }, {
    value: 3,
    label: '200~500'
  }, {
    value: 4,
    label: '500以上'
  }
];

// 成年牙齿症状
export const adultSymptoms = [
  { label: 'C龋坏', value: 'C龋坏' },
  { label: 'F填充物', value: 'F填充物' },
  { label: 'U未见萌出', value: 'U未见萌出' },
  { label: 'IM阻生牙', value: 'IM阻生牙' },
  { label: 'CF全冠', value: 'CF全冠' },
  { label: 'CV瓷贴面', value: 'CV瓷贴面' },
  { label: 'FP固定桥', value: 'FP固定桥' },
  { label: 'RP可摘局部义齿', value: 'RP可摘局部义齿' },
  { label: 'TC牙隐裂', value: 'TC牙隐裂' },
  { label: 'M缺失', value: 'M缺失' },
  { label: 'R扭转牙', value: 'R扭转牙' },
  { label: 'IT种植牙', value: 'IT种植牙' },
  { label: 'CP部分冠', value: 'CP部分冠' },
  { label: 'GO合金高嵌体', value: 'GO合金高嵌体' },
  { label: 'RV树脂贴面', value: 'RV树脂贴面' },
  { label: 'DCP畸形中央尖', value: 'DCP畸形中央尖' },
  { label: 'RT残根', value: 'RT残根' },
  { label: 'AC根尖囊肿', value: 'AC根尖囊肿' },
  { label: 'RC残冠', value: 'RC残冠' },
  { label: 'OGT过长牙', value: 'OGT过长牙' },
  { label: 'SC继发龋', value: 'SC继发龋' },
  { label: 'ID不良修复体', value: 'ID不良修复体' },
  { label: 'MC颌骨囊肿', value: 'MC颌骨囊肿' },
  { label: 'DT移位牙', value: 'DT移位牙' },
  { label: 'CB反颌', value: 'CB反颌' },
];

// 孩子牙齿症状
export const childSymptoms = [
  { label: 'C龋坏', value: 'C龋坏' },
  { label: 'PFS窝沟封闭', value: 'PFS窝沟封闭' },
  { label: 'U未见萌出', value: 'U未见萌出' },
  { label: 'RT根管治疗后', value: 'RT根管治疗后' },
  { label: 'M缺失', value: 'M缺失' },
  { label: 'CF全冠', value: 'CF全冠' },
  { label: 'F填充物', value: 'F填充物' },
  { label: 'SR间隙保持器', value: 'SR间隙保持器' },
];

// 混合牙齿症状
export const mixSymptoms = [
  { label: 'C龋坏', value: 'C龋坏' },
  { label: 'TC牙隐裂', value: 'TC牙隐裂' },
  { label: 'SC继发龋', value: 'SC继发龋' },
  { label: 'R扭转牙', value: 'R扭转牙' },
  { label: 'PFS窝沟封闭', value: 'PFS窝沟封闭' },
  { label: 'U未见萌出', value: 'U未见萌出' },
  { label: 'RT根管治疗后', value: 'RT根管治疗后' },
  { label: 'M缺失', value: 'M缺失' },
  { label: 'CF全冠', value: 'CF全冠' },
  { label: 'F填充物', value: 'F填充物' },
  { label: 'SR间隙保持器', value: 'SR间隙保持器' },
  { label: 'DCP畸形中央尖', value: 'DCP畸形中央尖' },
  { label: 'AC根尖囊肿', value: 'AC根尖囊肿' },
  { label: 'RC残冠', value: 'RC残冠' },
  { label: 'RT残根', value: 'RT残根' },
];

export const commonSymptoms = [
  { label: '反颌', value: '反颌' },
  { label: '唇颊向', value: '唇颊向' },
  { label: '低位', value: '低位' },
  { label: '下颌后退', value: '下颌后退' },
  { label: '舌腭向', value: '舌腭向' },
  { label: '高位', value: '高位' },
  { label: '开颌', value: '开颌' },
  { label: '拥挤', value: '拥挤' },
  { label: '锁颌', value: '锁颌' },
  { label: '內翻', value: '內翻' },
  { label: '多生牙', value: '多生牙' },
  { label: '正？反', value: '正？反' },
  { label: '外翻', value: '外翻' },
  { label: '发育不良', value: '发育不良' },
  { label: '先天缺失', value: '先天缺失' },
  { label: '早失牙', value: '早失牙' },
  { label: '滞留乳牙', value: '滞留乳牙' },
  { label: '未见萌出', value: '未见萌出' },
];

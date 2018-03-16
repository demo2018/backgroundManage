const menus = [
  {
    title: '预约管理',
    key: 'appointment ',
    path: '/appointment/appointmentList',
    icon: 'file-text'
  },
  {
    title: '就诊管理',
    key: 'treatment',
    path: '/treatment/treatmentList',
    icon: 'tags-o'
  },
  {
    title: '客户管理',
    key: 'customer',
    path: '/customer/customerList',
    icon: 'solution'
  },
  {
    title: '医生管理',
    key: 'doctor',
    path: '/doctor/doctorList',
    icon: 'idcard'
  },
  {
    title: '病历管理',
    key: 'caseManage',
    icon: 'copy',
    children: [
      {
        title: '初筛报告',
        key: 'reportList',
        path: '/report/list'
      }, {
        title: '就诊病历',
        key: 'caseList',
        path: '/case/list'
      }, {
        title: '病历模板',
        key: 'templateList',
        path: '/template/list'
      }
    ]
  },
  {
    title: '影像管理',
    key: 'diagnoseImg',
    path: '/diagnoseImg/list',
    icon: 'picture'
  },
  {
    title: '交易管理',
    key: 'transaction',
    icon: 'pay-circle-o',
    children: [
      {
        title: '客户账单',
        key: 'customerBill',
        path: '/bill/list'
      }, {
        title: '分成管理',
        key: 'prorata',
        path: '/bill/prorata'
      }
    ]
  },
  {
    title: '转诊中心',
    key: 'referral',
    path: '/referral/referralList',
    icon: 'qrcode'
  },
  {
    title: '诊所管理',
    key: 'clinic',
    path: '/clinic/clinicList',
    icon: 'home'
  },
  {
    title: '项目管理',
    key: 'project',
    icon: 'inbox',
    children: [
      {
        title: '项目分类',
        key: 'projectClassify',
        path: '/project/classify'
      }, {
        title: '项目列表',
        key: 'projectList',
        path: '/project/list'
      }, {
        title: '折扣管理',
        key: 'projectDiscount',
        path: '/project/discount'
      }
    ]
  },
  {
    title: '内容管理',
    key: 'other',
    icon: 'laptop',
    children: [
      {
        title: 'banner管理',
        key: 'banner',
        path: '/banner/list'
      }, {
        title: '标签管理',
        key: 'label',
        path: '/label/list'
      }
    ]
  },
  {
    title: '意见反馈',
    key: 'feedback',
    path: '/feedback/list',
    icon: 'star-o'
  },
  {
    title: '系统设置',
    key: 'system',
    icon: 'setting',
    children: [
      {
        title: '成员设置',
        key: 'member',
        path: '/member/list'
      }, {
        title: '角色管理',
        key: 'role',
        path: '/role/list'
      }, {
        title: '奖励设置',
        key: 'award',
        path: '/award/set'
      }
    ]
  },
];

export default menus;

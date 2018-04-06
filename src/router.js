import { Router, Route, IndexRedirect } from 'dva/router';
import cookie from 'js-cookie';
import pages from './pages';

const isLogin = (nextState, replace) => {
  if (!cookie.get('seesionid')) {
    replace('/login');
  }
};

export default function ({ history }) {
  return (<Router history={history}>
    <Route path="/login" component={pages.Login} />
    <Route path="/" component={pages.Layout} onEnter={isLogin}>
      <IndexRedirect to="/welcome" />
      <Route path="/welcome" component={pages.Welcome} breadcrumbName="欢迎" />>

      <Route path="/appointment/appointmentList" component={pages.AppointmentList} breadcrumbName="预约管理" >
        <Route path="/appointment/add" component={pages.AppointmentDetail} breadcrumbName="新建预约" />
        <Route path="/appointment/detail/:id" component={pages.AppointmentDetail} breadcrumbName="编辑预约" />
      </Route>

      <Route path="/treatment/treatmentList" component={pages.TreatmentList} breadcrumbName="就诊列表" >
        <Route path="/treatment/detail/:id" component={pages.AppointmentDetail} breadcrumbName="编辑预约" />
      </Route>

      <Route path="/customer/customerList" component={pages.CustomerList} breadcrumbName="客户管理" >
        <Route path="/customer/add" component={pages.CustomerDetail} breadcrumbName="新增客户" />
        <Route path="/customer/detail/:id" component={pages.CustomerDetail} breadcrumbName="编辑客户" />
      </Route>

      <Route path="/doctor/doctorList" component={pages.DoctorList} breadcrumbName="医生管理" >
        <Route path="/doctor/add" component={pages.DoctorDetail} breadcrumbName="新增医生" />
        <Route path="/doctor/detail/:id" component={pages.DoctorDetail} breadcrumbName="医生详情" />
        <Route path="/doctor/audits/:id" component={pages.DoctorAudits} breadcrumbName="医生审核" />
        <Route path="/doctor/plans/:id" component={pages.DoctorPlans} breadcrumbName="医生安排" />
        <Route path="/doctor/progress/:id" component={pages.DoctorProgress} breadcrumbName="邀请进程" />
      </Route>

      <Route path="" breadcrumbName="病历管理" >
        <Route path="/report/list" component={pages.ReportList} breadcrumbName="初筛报告" >
          <Route path="/report/add" component={pages.ReportDetail} breadcrumbName="新增报告" />
          <Route path="/report/detail/:id" component={pages.ReportDetail} breadcrumbName="报告详情" />
        </Route>
        <Route path="/case/list" component={pages.CaseList} breadcrumbName="就诊病历" >
          <Route path="/case/add" component={pages.CaseDetail} breadcrumbName="新增病历" />
          <Route path="/case/detail/:id" component={pages.CaseDetail} breadcrumbName="病历详情" />
        </Route>
        <Route path="/template/list" component={pages.TemplateList} breadcrumbName="病历模板" />
      </Route>

      <Route path="/diagnoseImg/list" component={pages.DiagnoseImgList} breadcrumbName="影像管理" >
        <Route path="/diagnoseImg/add" component={pages.DiagnoseImgDetail} breadcrumbName="新增影像" />
        <Route path="/diagnoseImg/detail/:id" component={pages.DiagnoseImgDetail} breadcrumbName="影像详情" />
      </Route>

      <Route path="" breadcrumbName="项目管理" >
        <Route path="/project/classify" component={pages.ProjectClassify} breadcrumbName="项目分类" />
        <Route path="/project/list" component={pages.ProjectList} breadcrumbName="项目列表" >
          <Route path="/project/add" component={pages.ProjectDetail} breadcrumbName="新增项目" />
          <Route path="/project/detail/:id" component={pages.ProjectDetail} breadcrumbName="项目详情" />
        </Route>
        <Route path="/project/discount" component={pages.ProjectDiscount} breadcrumbName="折扣管理" />
      </Route>

      <Route path="" breadcrumbName="交易管理" >
        <Route path="/bill/list" component={pages.BillList} breadcrumbName="客户账单" />
        <Route path="/bill/prorata" component={pages.BillProrata} breadcrumbName="分成管理" />
      </Route>

      <Route path="/referral/referralList" component={pages.ReferralList} breadcrumbName="转诊中心" >
        <Route path="/referral/detail/:id" component={pages.ReferralDetail} breadcrumbName="转诊详情" />
      </Route>

      <Route path="/clinic/clinicList" component={pages.ClinicList} breadcrumbName="诊所管理" >
        <Route path="/clinic/add" component={pages.ClinicDetail} breadcrumbName="新增诊所" />
        <Route path="/clinic/detail/:id" component={pages.ClinicDetail} breadcrumbName="编辑诊所" />
      </Route>

      <Route path="" breadcrumbName="内容管理" >
        <Route path="/banner/list" component={pages.BannerList} breadcrumbName="banner管理" />
        <Route path="/label/list" component={pages.LabelList} breadcrumbName="标签管理" />
        <Route path="/tag/list" component={pages.TagList} breadcrumbName="子标签管理" />
      </Route>

      <Route path="/feedback/list" component={pages.FeedbackList} breadcrumbName="意见反馈" />

      <Route path="" breadcrumbName="系统设置" >
        <Route path="/member/list" component={pages.MemberList} breadcrumbName="成员设置" />
        <Route path="/role/list" component={pages.RoleList} breadcrumbName="角色管理" />
        <Route path="/role/add" component={pages.RoleDetail} breadcrumbName="新增角色" />
        <Route path="/role/detail/:id" component={pages.RoleDetail} breadcrumbName="角色详情" />
        <Route path="/award/set" component={pages.AwardSet} breadcrumbName="奖励设置" />
      </Route>
    </Route>
  </Router>);
}

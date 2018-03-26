import dva from 'dva';
import './index.html';
import 'antd/dist/antd.css';
import './styles/common.less';

// 1. Initialize
const app = dva({
  onError(e) {
    console.log(e);
  }
});

// 3. Model
app.model(require('./models/layout'));
app.model(require('./models/appointment/appointmentList'));
app.model(require('./models/appointment/appointmentDetail'));

app.model(require('./models/treatment/treatmentList'));

app.model(require('./models/customer/customerList'));
app.model(require('./models/customer/customerDetail'));

app.model(require('./models/doctor/doctorList'));
app.model(require('./models/doctor/doctorDetail'));
app.model(require('./models/doctor/doctorAudits'));
app.model(require('./models/doctor/doctorPlans'));
app.model(require('./models/doctor/doctorProgress'));

app.model(require('./models/case/reportList'));
app.model(require('./models/case/reportDetail'));
app.model(require('./models/case/caseList'));
app.model(require('./models/case/caseDetail'));
app.model(require('./models/case/templateList'));

app.model(require('./models/diagnoseImg/diagnoseImgList'));
app.model(require('./models/diagnoseImg/diagnoseImgDetail'));

app.model(require('./models/project/projectClassify'));
app.model(require('./models/project/projectList'));
app.model(require('./models/project/projectDetail'));
app.model(require('./models/project/projectDiscount'));

app.model(require('./models/transaction/billList'));

app.model(require('./models/referral/referralList'));

app.model(require('./models/clinic/clinicList'));
app.model(require('./models/clinic/clinicDetail'));

app.model(require('./models/Other/bannerList'));
app.model(require('./models/Other/labelList'));
app.model(require('./models/Other/tagList'));

app.model(require('./models/Feedback/feedbackList'));

app.model(require('./models/System/memberList'));
app.model(require('./models/System/roleList'));
app.model(require('./models/System/roleDetail'));
app.model(require('./models/System/awardSet'));
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

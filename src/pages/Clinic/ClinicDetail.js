import { connect } from 'dva';
import { createNestPage } from 'utils/common';
import ClinicDetail from 'components/Clinic/ClinicDetail';

function mapStateToProps({ clinicDetail }) {
  return {
    ...clinicDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新
    onUpdateState(payload) {
      dispatch({ type: 'clinicDetail/updateState', payload: { ...payload } });
    },
    // 新增诊所
    addDatas(param) {
      dispatch({ type: 'clinicDetail/addDatas', payload: { param } });
    },
    // 更新诊所信息
    updateDatas(param, id) {
      dispatch({ type: 'clinicDetail/updateDatas', payload: { param, id } });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(ClinicDetail));

import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import DiagnoseImgList from 'components/DiagnoseImg/DiagnoseImgList';

function mapStateToProps({ diagnoseImgList }) {
  return {
    ...diagnoseImgList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(payload) {
      dispatch({ type: 'diagnoseImgList/updateState', payload: { ...payload } });
    },
    onSearch(search) {
      dispatch({ type: 'diagnoseImgList/updateSearch', payload: { search } });
      dispatch({ type: 'diagnoseImgList/fetchDatas' });
    },
    onReset() {
      dispatch({ type: 'diagnoseImgList/resetSearch' });
      dispatch({ type: 'diagnoseImgList/fetchDatas' });
    },
    onDelete(param) {
      dispatch({ type: 'diagnoseImgList/doDelete', payload: { param } });
    },
    toDetail(id) {
      dispatch(routerRedux.push(`/diagnoseImg/detail/${id}`));
    },
    toAdd() {
      dispatch(routerRedux.push('/diagnoseImg/add'));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(DiagnoseImgList));

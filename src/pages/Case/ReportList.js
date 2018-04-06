import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import ReportList from 'components/Case/ReportList';

function mapStateToProps({ reportList }) {
  return {
    ...reportList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(payload) {
      dispatch({ type: 'reportList/updateState', payload: { ...payload } });
    },
    onSearch(search) {
      dispatch({ type: 'reportList/updateSearch', payload: { search } });
      dispatch({ type: 'reportList/fetchDatas' });
    },
    onReset() {
      dispatch({ type: 'reportList/resetSearch' });
      dispatch({ type: 'reportList/fetchDatas' });
    },
    onDelete(param) {
      dispatch({ type: 'reportList/doDelete', param });
    },
    toDetail(id) {
      dispatch(routerRedux.push(`/report/detail/${id}`));
    },
    toAdd() {
      dispatch(routerRedux.push('/report/add'));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(ReportList));

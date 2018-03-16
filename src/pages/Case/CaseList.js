import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import CaseList from 'components/Case/CaseList';

function mapStateToProps({ caseList }) {
  return {
    ...caseList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(payload) {
      dispatch({ type: 'caseList/updateState', payload: { ...payload } });
    },
    onSearch(search) {
      dispatch({ type: 'caseList/updateSearch', payload: { search } });
      dispatch({ type: 'caseList/fetchDatas' });
    },
    onReset() {
      dispatch({ type: 'caseList/resetSearch' });
      dispatch({ type: 'caseList/fetchDatas' });
    },
    onDelete(param) {
      dispatch({ type: 'caseList/doDelete', payload: { param } });
    },
    toDetail(id) {
      dispatch(routerRedux.push(`/case/detail/${id}`));
    },
    toAdd() {
      dispatch(routerRedux.push('/case/add'));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(CaseList));

import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import BillList from 'components/Transaction/BillList';

function mapStateToProps({ billList }) {
  return {
    ...billList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(payload) {
      dispatch({ type: 'billList/updateState', payload: { ...payload } });
    },
    onSearch(search) {
      dispatch({ type: 'billList/updateSearch', payload: { search } });
      dispatch({ type: 'billList/fetchDatas' });
    },
    onReset() {
      dispatch({ type: 'billList/resetSearch' });
      dispatch({ type: 'billList/fetchDatas' });
    },
    onAdd(param) {
      dispatch({ type: 'billList/doAdd', payload: { param } });
    },
    onEdit(param) {
      dispatch({ type: 'billList/doEdit', payload: { param } });
    },
    onDelete(param) {
      dispatch({ type: 'billList/doDelete', payload: { param } });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(BillList));

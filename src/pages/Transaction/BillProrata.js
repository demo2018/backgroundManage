import { connect } from 'dva';
import { createNestPage } from 'utils/common';
import BillProrata from 'components/Transaction/BillProrata';

function mapStateToProps({ billProrata }) {
  return {
    ...billProrata,
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
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(BillProrata));

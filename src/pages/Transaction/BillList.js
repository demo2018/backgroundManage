import { connect } from 'dva';
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
    getBillinfo(param) {
      dispatch({ type: 'billList/getBillinfo', param });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(BillList));

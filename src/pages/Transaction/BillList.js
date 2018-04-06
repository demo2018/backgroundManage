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
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'billList/updateState', payload: { ...payload } });
    },
    // 搜索事件
    onSearch(search) {
      dispatch({ type: 'billList/updateSearch', payload: { search } });
      dispatch({ type: 'billList/fetchDatas' });
    },
    // 重置事件
    onReset() {
      dispatch({ type: 'billList/resetSearch' });
      dispatch({ type: 'billList/fetchDatas' });
    },
    // 查询账单详情
    getBillinfo(param) {
      dispatch({ type: 'billList/getBillinfo', param });
    },
    // 导出账单
    downFile() {
      dispatch({ type: 'billList/downFile' });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(BillList));

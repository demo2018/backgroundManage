import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import CustomerList from 'components/Customer/CustomerList';

function mapStateToProps({ customerList }) {
  return {
    ...customerList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'customerList/updateState', payload: { ...payload } });
    },
    // 搜索事件
    onSearch(search) {
      dispatch({ type: 'customerList/updateSearch', payload: { search } });
      dispatch({ type: 'customerList/fetchDatas' });
    },
    // 重置事件
    onReset() {
      dispatch({ type: 'customerList/resetSearch' });
      dispatch({ type: 'customerList/fetchDatas' });
    },
    // 删除事件
    onDelete(param) {
      dispatch({ type: 'customerList/doDelete', param });
    },
    onSendMsg(param) {
      dispatch({ type: 'customerList/sendMsg', payload: { param } });
    },
    downFile() {
      dispatch({ type: 'customerList/downFile' });
    },
    // 跳转到详情页
    toCustomerDetail(id) {
      dispatch(routerRedux.push(`customer/detail/${id}`));
    },
    // 跳转到新增页
    toAddCustomer() {
      dispatch(routerRedux.push('/customer/add'));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(CustomerList));

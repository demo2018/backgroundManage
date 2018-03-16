import { connect } from 'dva';
import { createNestPage } from 'utils/common';
import CustomerDetail from 'components/Customer/CustomerDetail';

function mapStateToProps({ customerDetail }) {
  return {
    ...customerDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'customerDetail/updateState', payload: { ...payload } });
    },
    // 新增客户信息
    onAddCustomer(param) {
      dispatch({ type: 'customerDetail/addCustomer', payload: { param } });
    },
    // 更新客户信息
    onUpdateCustomer(param) {
      dispatch({ type: 'customerDetail/updateCustomer', payload: { param } });
    },
    // 添加关系客户
    onAdd(param, id) {
      dispatch({ type: 'customerDetail/addMember', payload: { param, id } });
    },
    // 更新关系客户
    onUpdate(param, id, relationId) {
      dispatch({ type: 'customerDetail/updateMember', payload: { param, id, relationId } });
    },
    // 删除客户详情
    onDelete(param) {
      dispatch({ type: 'customerDetail/delCustomer', param });
    },
    // 删除关系客户
    onDeletes(param) {
      dispatch({ type: 'customerDetail/delMember', param });
    },
    downFile() {
      dispatch({ type: 'customerDetail/downFile' });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(CustomerDetail));

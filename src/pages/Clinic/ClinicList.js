import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import ClinicList from 'components/Clinic/ClinicList';

function mapStateToProps({ clinicList }) {
  return {
    ...clinicList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'clinicList/updateState', payload: { ...payload } });
    },
    // 搜索事件
    onSearch(search) {
      dispatch({ type: 'clinicList/updateSearch', payload: { search } });
      dispatch({ type: 'clinicList/fetchDatas' });
    },
    // 重置事件
    onReset() {
      dispatch({ type: 'clinicList/resetSearch' });
      dispatch({ type: 'clinicList/fetchDatas' });
    },
    // 变更排序事件
    rankChange(id, param) {
      dispatch({ type: 'clinicList/rankChange', payload: { id, param } });
    },
    // 删除事件
    onDelete(param) {
      dispatch({ type: 'clinicList/doDelete', param });
    },
    // 跳转到详情页
    toDetail(id) {
      dispatch(routerRedux.push(`/clinic/detail/${id}`));
    },
    // 跳转到新增页
    toAdd() {
      dispatch(routerRedux.push('/clinic/add'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(ClinicList));

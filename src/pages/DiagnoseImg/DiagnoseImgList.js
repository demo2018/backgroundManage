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
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'diagnoseImgList/updateState', payload: { ...payload } });
    },
    // 搜索事件
    onSearch(search) {
      dispatch({ type: 'diagnoseImgList/updateSearch', payload: { search } });
      dispatch({ type: 'diagnoseImgList/fetchDatas' });
    },
    // 重置事件
    onReset() {
      dispatch({ type: 'diagnoseImgList/resetSearch' });
      dispatch({ type: 'diagnoseImgList/fetchDatas' });
    },
    // 删除事件
    onDelete(param) {
      dispatch({ type: 'diagnoseImgList/doDelete', param });
    },
    // 跳转至详情页面
    toDetail(id) {
      dispatch(routerRedux.push(`/diagnoseImg/detail/${id}`));
    },
    // 跳转至新增页面
    toAdd() {
      dispatch(routerRedux.push('/diagnoseImg/add'));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(DiagnoseImgList));

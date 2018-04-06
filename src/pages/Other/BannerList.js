import { connect } from 'dva';
import { createNestPage } from 'utils/common';
import BannerList from 'components/Other/BannerList';

function mapStateToProps({ bannerList }) {
  return {
    ...bannerList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'bannerList/updateState', payload: { ...payload } });
    },
    // 搜索事件
    onSearch(search) {
      dispatch({ type: 'bannerList/updateSearch', payload: { search } });
      dispatch({ type: 'bannerList/fetchDatas' });
    },
    // 重置事件
    onReset() {
      dispatch({ type: 'bannerList/resetSearch' });
      dispatch({ type: 'bannerList/fetchDatas' });
    },
    // 变更排序事件
    rankChange(id, param) {
      dispatch({ type: 'bannerList/rankChange', payload: { id, param } });
    },
    // 添加banner
    onAdd(param) {
      dispatch({ type: 'bannerList/doAdd', payload: { param } });
    },
    // 编辑banner
    onEdit(param, id) {
      dispatch({ type: 'bannerList/doEdit', payload: { param, id } });
    },
    // 删除banner
    onDelete(param) {
      dispatch({ type: 'bannerList/doDelete', param });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(BannerList));

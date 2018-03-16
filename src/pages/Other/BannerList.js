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
    onUpdateState(payload) {
      dispatch({ type: 'bannerList/updateState', payload: { ...payload } });
    },
    onSearch(search) {
      dispatch({ type: 'bannerList/updateSearch', payload: { search } });
      dispatch({ type: 'bannerList/fetchDatas' });
    },
    onReset() {
      dispatch({ type: 'bannerList/resetSearch' });
      dispatch({ type: 'bannerList/fetchDatas' });
    },
    onAdd(param) {
      dispatch({ type: 'bannerList/doAdd', payload: { param } });
    },
    onEdit(param, id) {
      dispatch({ type: 'bannerList/doEdit', payload: { param, id } });
    },
    onDelete(param) {
      dispatch({ type: 'bannerList/doDelete', param });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(BannerList));

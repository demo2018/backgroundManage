import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import TagList from 'components/Other/TagList';

function mapStateToProps({ tagList }) {
  return {
    ...tagList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(payload) {
      dispatch({ type: 'tagList/updateState', payload: { ...payload } });
    },
    onSearch(search) {
      dispatch({ type: 'tagList/updateSearch', payload: { search } });
      dispatch({ type: 'tagList/fetchDatas' });
    },
    onReset() {
      dispatch({ type: 'tagList/resetSearch' });
      dispatch({ type: 'tagList/fetchDatas' });
    },
    onAdd(param) {
      dispatch({ type: 'tagList/doAdd', payload: { param } });
    },
    onEdit(param, id) {
      dispatch({ type: 'tagList/doEdit', payload: { param, id } });
    },
    onDelete(param) {
      dispatch({ type: 'tagList/doDelete', param });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(TagList));

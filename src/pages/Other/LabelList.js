import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import LabelList from 'components/Other/LabelList';

function mapStateToProps({ labelList }) {
  return {
    ...labelList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(payload) {
      dispatch({ type: 'labelList/updateState', payload: { ...payload } });
    },
    onSearch(search) {
      dispatch({ type: 'labelList/updateSearch', payload: { search } });
      dispatch({ type: 'labelList/fetchDatas' });
    },
    onReset() {
      dispatch({ type: 'labelList/resetSearch' });
      dispatch({ type: 'labelList/fetchDatas' });
    },
    onAdd(param) {
      dispatch({ type: 'labelList/doAdd', payload: { param } });
    },
    onEdit(param, id) {
      dispatch({ type: 'labelList/doEdit', payload: { param, id } });
    },
    onDelete(param) {
      dispatch({ type: 'labelList/doDelete', param });
    },
    toTag(search) {
      dispatch(routerRedux.push('/tag/list'), search);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(LabelList));

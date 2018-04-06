import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'awardSet',

  state: {
    details: {},
    types: [],
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/award/set', () => {
        dispatch({ type: 'fetchDatas' });
      });
    }
  },

  effects: {
    // 获取列表数据
    * fetchDatas({ payload }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.system.getSet);
      yield update({ details: { treatmentAward: data[0].type, treatmentNum: data[0].num, inviteAward: data[1].type, inviteNum: data[1].num } });
    },
    // 编辑
    * doEdit({ param }, { put, callWithLoading }) {
      yield callWithLoading(services.system.editAward, [{ id: 1, keyStr: 'referral_patient', type: param.treatmentAward, num: param.treatmentNum }, { id: 2, keyStr: 'invite_doctor', type: param.inviteAward, num: param.inviteNum }], { successMsg: '操作成功' });
      yield put({ type: 'fetchDatas' });
    }
  },

  reducers: {

  }
});

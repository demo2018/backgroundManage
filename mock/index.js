const mock = require('mockjs');
const utils = require('./utils');

const mockData = mock.mock({
  'tableDatas|1-20': [
    {
      'id|+1': 1,
      'age|+1': 15,
      'name|+1': '@cname',
      career: '软件工程师',
      gender: 'male',
      createTime: 1482705955000,
    },
  ],
});

Object.assign(global, mockData);

module.exports = {
  'POST /mock/data/list': utils.createPageResponse('tableDatas'),
};

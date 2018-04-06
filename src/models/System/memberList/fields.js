export const getFields = (enums = []) => {
  const roleList = enums.map(({ id, name }) => (
    {
      value: id,
      label: name
    }
  ));

  return [
    {
      key: 'id',
      name: '成员ID',
      sorter: true,
    },
    {
      key: 'realName',
      name: '姓名'
    },
    {
      key: 'phone',
      name: '手机号'
    },
    {
      key: 'roleId',
      name: '角色',
      enums: roleList
    },
    {
      key: 'createTime',
      name: '创建时间',
      type: 'datetime',
      sorter: true,
    },
    {
      key: 'option',
      name: '操作'
    }
  ];
};

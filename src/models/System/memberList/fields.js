export const getFields = (enums = []) => {
  const roleList = enums.map(({ id, className }) => (
    {
      value: id,
      label: className
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
      key: 'roleIds',
      name: '角色',
      enums: roleList,
      sorter: true,
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

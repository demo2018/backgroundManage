import { Form, Button, Input, Tree } from 'antd';
import styles from './roleDetail.less';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const treeData = [{
  title: '预约管理',
  key: '预约管理',
  children: [
    { title: '查看预约', key: '查看预约', },
    { title: '新增预约', key: '新增预约', },
    { title: '编辑预约', key: '编辑预约', },
    { title: '搜索预约', key: '搜索预约', }
  ],
}, {
  title: '就诊管理',
  key: '就诊管理',
  children: [
    { title: '查看就诊', key: '查看就诊', },
    { title: '新增就诊', key: '新增就诊', },
    { title: '编辑就诊', key: '编辑就诊', },
    { title: '搜索就诊', key: '搜索就诊', },
    { title: '就诊评价', key: '就诊评价', },
    { title: '查看就诊评价', key: '查看就诊评价', },
    { title: '随访', key: '随访', },
    { title: '查看随访记录', key: '查看随访记录', }
  ],
}, {
  title: '客户管理',
  key: '客户管理',
}, {
  title: '病历管理',
  key: '病历管理',
}, {
  title: '影像管理',
  key: '影像管理',
}, {
  title: '医生管理',
  key: '医生管理',
}, {
  title: '交易管理',
  key: '交易管理',
}];


class RoleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: [], // 展开指定的树节点
      autoExpandParent: true,  // 是否自动展开父节点
      checkedKeys: ['0-0-0'],  // 选中复选框的树节点
      selectedKeys: [],  // （受控）设置选中的树节点
      details: props.details,
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('details' in nextProps && nextProps.details !== this.props.details) {
      this.setState({ details: nextProps.details });
    }
  }
  onExpand = (expandedKeys) => {  // 展开/收起节点时触发
    console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  }
  onSelect = (selectedKeys, info) => {  // 	点击树节点触发
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }

  // 触发提交 判断是新增还是修改
  handleSave() {
    const { form, details } = this.props;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((err, values) => {
      if (!err && !details.id) {
        // onAdds({ ...values, roleIds: [values.roleIds] });
      }
      if (!err && details.id) {
        // onOK({ ...values, roleIds: [values.roleIds] }, selecteRecord.id);
      }
    });
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }
  render() {
    const { form, details, goback } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.roleDetail}>
        <h3 className="title"> {details.id ? '更新角色' : '新增角色'} </h3>
        <Form layout="inline">
          <FormItem label="角色名称">
            {getFieldDecorator('phone', {
              initialValue: details.phone,
              rules: [{ required: true, whitespace: true, message: '不能为空' }]
            })(
              <Input placeholder="请输入名称" />
            )}
          </FormItem>
          <FormItem label="选择权限" className="permissions">
            <Tree
              checkable
              onExpand={this.onExpand}
              expandedKeys={this.state.expandedKeys}
              autoExpandParent={this.state.autoExpandParent}
              onCheck={this.onCheck}
              checkedKeys={this.state.checkedKeys}
              onSelect={this.onSelect}
              selectedKeys={this.state.selectedKeys}
            >
              {this.renderTreeNodes(treeData)}
            </Tree>
          </FormItem>
          <div className="btnGroup">
            <Button type="primary" onClick={() => { this.handleSave(); }}>保存</Button>
            <Button onClick={() => { goback(); }} type="danger" ghost>取消</Button>
          </div>
        </Form>
      </div>
    );
  }
}
export default Form.create()(RoleDetail);

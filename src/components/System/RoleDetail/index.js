import { Form, Button, Input, Tree } from 'antd';
import styles from './roleDetail.less';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
// 页面参数初始化
class RoleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: props.details,
      menuId: [],
      expandedKeys: [], // 展开指定的树节点
      autoExpandParent: true,  // 是否自动展开父节点
      checkedKeys: [],  // 选中复选框的树节点
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('details' in nextProps && nextProps.details !== this.props.details) {
      this.setState({ details: nextProps.details });
    }
  }

  onExpand = (expandedKeys) => {  // 展开/收起节点时触发
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  // 点击选中事件
  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys, menuId: checkedKeys });
  }
  // 触发提交 判断是新增还是修改
  handleSave() {
    const { form, details, addDatas, updateDatas } = this.props;
    const { menuId } = this.state;
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((err, values) => {
      if (!err && !details.id) {
        addDatas({ ...values, menuIds: menuId && menuId[0] ? menuId : details.menuIds });
      }
      if (!err && details.id) {
        updateDatas({ ...values, menuIds: menuId && menuId[0] ? menuId : details.menuIds }, details.id);
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
  // 页面渲染
  render() {
    const { form, details, goback, menuList } = this.props;
    const { getFieldDecorator } = form;
    const treeData = menuList;
    const { menuIds } = details;

    const menu = (menuIds || []).map((index) => {
      return index.toString();
    });

    return (
      <div className={styles.roleDetail}>
        <h3 className="title"> {details.id ? '更新角色' : '新增角色'} </h3>
        <Form layout="inline">
          <FormItem label="角色名称">
            {getFieldDecorator('name', {
              initialValue: details.name,
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
              checkedKeys={this.state.checkedKeys && this.state.checkedKeys[0] ? this.state.checkedKeys : menu}
              onSelect={this.onSelect}
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

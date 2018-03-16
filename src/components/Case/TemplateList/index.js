import { Tabs, Modal, Spin } from 'antd';
import HTree from 'components/Common/Htree';
import FirstTemplate from './FirstTemplate.js';
import SecendTemplate from './SecendTemplate.js';
import styles from './index.less';
const TabPane = Tabs.TabPane;

class TemplateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyDetail: {},
      departDetail: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('entModalVisible' in nextProps) {
      this.setState({ entModalVisible: nextProps.entModalVisible });
      if (!nextProps.entModalVisible) {
        this.setState({ companyDetail: {} });
      }
    }
  }
  getEntTreeProps() {
    return {
      treeId: 'htree',
      nodes: [
        { id: 1, pId: 0, name: '随意勾选 1', open: true },
        { id: 11, pId: 1, name: '随意勾选 1-1', open: true },
        { id: 111, pId: 11, name: '随意勾选 1-1-1' },
        { id: 112, pId: 11, name: '随意勾选 1-1-2' },
        { id: 12, pId: 1, name: '随意勾选 1-2', open: true },
        { id: 121, pId: 12, name: '随意勾选 1-2-1' },
        { id: 122, pId: 12, name: '随意勾选 1-2-2' },
        { id: 2, pId: 0, name: '随意勾选 2', checked: true, open: true },
        { id: 21, pId: 2, name: '随意勾选 2-1' },
        { id: 22, pId: 2, name: '随意勾选 2-2', open: true },
        { id: 221, pId: 22, name: '随意勾选 2-2-1', checked: true },
        { id: 222, pId: 22, name: '随意勾选 2-2-2' },
        { id: 23, pId: 2, name: '随意勾选 2-3' },
      ],
      setting: {
        edit: {
          enable: true,
          showRemoveBtn: (treeId, treeNode) => !treeNode.isParent,
          showRenameBtn: true,
          drag: {
            isMove: false,
            isCopy: false
          }
        },
        view: {
          selectedMulti: false,
          addHoverDom(treeId, treeNode) {
            if (treeNode.editNameFlag || $(`#addBtn_${treeNode.tId}`).length > 0) return;
            const $addBtn = $(`<span class='button add' id='addBtn_${treeNode.tId}' title='add' onfocus='this.blur();'></span>`);
            $(`#${treeNode.tId}_span`).after($addBtn);
            if ($addBtn) {
              $addBtn.bind('click', function () {
                console.log('add', treeNode);
                return false;
              });
            }
          },
          removeHoverDom(treeId, treeNode) {
            $(`#addBtn_${treeNode.tId}`).unbind().remove();
          }
        },
        data: {
          key: {
            name: 'name',
          },
          simpleData: {
            enable: true,
            idKey: 'id',
            pIdKey: 'pId',
          },
        },
        callback: {
          beforeRemove: (treeId, treeNode) => {
            const { id, name } = treeNode;
            Modal.confirm({
              title: `确认删除 ${name}?`,
              okText: '确认',
              cancelText: '取消',
              onOk: () => {
                console.log('delete', treeNode);
              }
            });
            return false;
          },
          beforeEditName: (treeId, treeNode) => {
            console.log('edit', treeNode);
            return false;
          },
          onClick: (event, treeId, treeNode) => {
            console.log(treeNode);
            return false;
          }
        },
      },
      onTreeMount(ztreeObj) {
        ztreeObj.expandAll(true);
      },
    };
  }

  toAddDepart() {
    const { toAddDepart, companyId } = this.props;
    return () => {
      if (companyId) {
        toAddDepart(companyId);
      } else {
        Modal.warning({
          title: '操作提示',
          content: '请选择所属公司',
        });
      }
    };
  }
  toDepartDetail({ id, editable }) {
    return () => {
      this.props.toDepartDetail(id, editable);
    };
  }
  handleUpdateState(state) {
    return () => {
      this.setState(state);
    };
  }

  render() {
    const { loading, spinning } = this.props;
    const entTreeProps = this.getEntTreeProps();

    return (
      <Spin spinning={loading} >
        <div className={styles.templateList}>
          <div className="templateTree">
            <Spin spinning={spinning}>
              <HTree {...entTreeProps} ref={htree => this.htree = htree} />
            </Spin>
          </div>
          <div className="templateContainer">
          <Tabs type="card">
              <TabPane tab="初诊病历模板" key="1"><FirstTemplate /></TabPane>
              <TabPane tab="复诊病历模板" key="2"><SecendTemplate /></TabPane>
           </Tabs>
          </div>
        </div>
      </Spin>
    );
  }
}

export default TemplateList;

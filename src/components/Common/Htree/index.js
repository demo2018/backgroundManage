import React from 'react';
import 'ztree';

import './index.less';

const pick = (obj, keys) =>
  keys.map(k => k in obj ? { [k]: obj[k] } : {})
    .reduce((res, o) => Object.assign(res, o), {});

const DEFAULT_CALLBACKS = ['onClick', 'onCheck', 'onCollapse', 'onDblClick', 'onDrag', 'onDragMove', 'onDrop',
  'onExpand', 'onMouseDown', 'onMouseUp', 'onNodeCreated', 'onRemove', 'onRename', 'onRightClick'];

class HTree extends React.Component {
  componentDidMount() {
    this.renderZtree();
  }

  // 数据没变，不重新渲染
  shouldComponentUpdate(nextProps) {
    return this.props.nodes != nextProps.nodes;
  }

  componentDidUpdate() {
    this.renderZtree();
  }

  getTreeDom() {
    return $(this.ztree);
  }

  getSetting() {
    const { setting } = this.props;
    const callback = pick(this.props, DEFAULT_CALLBACKS);

    setting.callback = { ...setting.callback, ...callback };
    return setting;
  }

  renderZtree() {
    const { nodes, onTreeMount } = this.props;

    this.ztreeObj = $.fn.zTree.init(this.getTreeDom(), this.getSetting(), nodes);

    onTreeMount && onTreeMount(this.ztreeObj);
  }

  render() {
    const { treeId } = this.props;

    return <ul id={treeId} ref={ztree => this.ztree = ztree} className="ztree" />;
  }
}

export default HTree;

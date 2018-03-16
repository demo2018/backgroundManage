import classnames from 'classnames';

import Layout from './Layout';
import Affix from './Affix';
import './index.less';

class HLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      layout: 'normal',
      theme: 'blue',
      isAsideFixed: false,
      isBoxed: false,
      isAffixShow: false,
      ...props,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, ...nextProps });
  }

  handleChange(values) {
    this.setState({ ...this.state, ...values });
  }

  render() {
    const { layout, isAsideFixed, isBoxed, isAffixShow, theme = 'blue', style } = this.state;

    const affixProps = {
      layout,
      isAsideFixed,
      isBoxed,
      theme,
      onChange: (...args) => this.handleChange(...args)
    };

    const wrapperCls = classnames({
      'hlayout-wrapper': true,
      'aside-fixed-wrapper': isAsideFixed,
    });

    return (
        <div className={wrapperCls} style={style}>
          <Layout {...this.state} />
          {isAffixShow && <Affix {...affixProps} />}
        </div>
    );
  }
}

export default HLayout;

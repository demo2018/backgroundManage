import classnames from 'classnames';
import { Modal } from 'antd';
import './tagPicker.less';
function noop() { }

const abled = 0; // 可用
const disabled = 1; // 不可用
 // 初始化
class TagPicker extends React.Component {
  static defaultProps = {
    doctorTimes: [],
    timeLength: 15,
    timeInterval: 15,
    onChange: noop,
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps && nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleSelect(key, index) {
    return () => {
      const { timeLength, timeInterval, onChange, doctorTimes } = this.props;
      if (!timeLength) {
        Modal.confirm({
          title: '操作错误',
          content: '请选择就诊时长',
        });
        return false;
      }

      const timeCounts = window.parseInt(timeLength / timeInterval) || 1;
      let isOk = true;
      const selectedKeys = [];
      selectedKeys.push(key);

      // 验证时间段的可用性
      for (let timeIndex = index; timeIndex < (index + timeCounts + 1); timeIndex++) {
        const { id, status } = doctorTimes[timeIndex] || {};
        selectedKeys.push(id);
        if (status === disabled || status === undefined) {
          isOk = false;
        }
      }

      if (isOk) {
        this.setState({ value: selectedKeys });
        onChange(selectedKeys);
      } else {
        Modal.confirm({
          title: '时间段选择错误',
          content: '该时间不满足就诊所需时长',
        });
      }
    };
  }
  // 页面渲染
  render() {
    const { doctorTimes = [] } = this.props;
    const { value = [] } = this.state;
    return (<div className="tagPicker">
      <div className="subPart">
        <p>请选择时间段</p>
        <div className="tagContent">
          {
            doctorTimes.map(({ id, time, status }, index) => {
              return (<span
                key={id}
                className={classnames({
                  tagItem: true,
                  abled: status == abled,
                  disabled: status == disabled,
                  checked: value.includes(id)
                })}
                onClick={status == abled ? this.handleSelect(id, index) : noop}
              >{time}</span>);
            })
          }
        </div>
      </div>
    </div>);
  }
}

export default TagPicker;

import classnames from 'classnames';
import { Modal } from 'antd';
import './tagPicker.less';
function noop() { }

const defaultTimes = [
  {
    id: 95,
    time: '09:00',
    status: 1,
  }, {
    id: 96,
    time: '09:15',
    status: 1,
  }, {
    id: 97,
    time: '09:45',
    status: 1,
  }, {
    id: 98,
    time: '10:00',
    status: 1,
  }, {
    id: 99,
    time: '10:15',
    status: 1,
  }, {
    id: 193,
    time: '10:30',
    status: 0,

  }, {
    id: 194,
    time: '10:45',
    status: 0,
  }, {
    id: 195,
    time: '11:00',
    status: 0,
  }, {
    id: 196,
    time: '11:15',
    status: 0,
  }, {
    id: 197,
    time: '11:30',
    status: 0,
  }, {
    id: 198,
    time: '11:45',
    status: 0,
  }, {
    id: 199,
    time: '12:00',
    status: 0,
  }, {
    id: 200,
    time: '12:15',
    status: 0,
  }, {
    id: 201,
    time: '12:30',
    status: 0,
  }, {
    id: 202,
    time: '12:45',
    status: 0,
  }, {
    id: 203,
    time: '13:00',
    status: 0,
  }, {
    id: 204,
    time: '13:15',
    status: 0,
  }, {
    id: 205,
    time: '13:30',
    status: 0,
  }, {
    id: 206,
    time: '13:45',
    status: 0,
  }, {
    id: 207,
    time: '14:00',
    status: 0,
  }, {
    id: 208,
    time: '14:15',
    status: 0,
  }, {
    id: 209,
    time: '14:30',
    status: 0,
  }, {
    id: 210,
    time: '14:45',
    status: 0,
  }, {
    id: 211,
    time: '15:00',
    status: 0,
  }, {
    id: 212,
    time: '15:15',
    status: 0,
  }, {
    id: 213,
    time: '15:30',
    status: 0,
  }, {
    id: 214,
    time: '15:45',
    status: 0,
  }, {
    id: 215,
    time: '16:00',
    status: 0,
  }, {
    id: 216,
    time: '16:15',
    status: 0,
  }, {
    id: 217,
    time: '16:30',
    status: 0,
  }, {
    id: 218,
    time: '16:45',
    status: 0,
  }, {
    id: 219,
    time: '17:00',
    status: 0,
  }, {
    id: 220,
    time: '17:15',
    status: 0,
  }, {
    id: 221,
    time: '17:30',
    status: 0,
  }, {
    id: 222,
    time: '17:45',
    status: 0,
  }, {
    id: 223,
    time: '18:00',
    status: 0,
  }];


const abled = 0; // 可用
const disabled = 1; // 不可用

class TagPicker extends React.Component {
  static defaultProps = {
    doctorTimes: [],
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
      const { timeLength, timeInterval, onChange } = this.props;

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
      for (let timeIndex = index; timeIndex < (index + timeCounts); timeIndex++) {
        const { id, status } = defaultTimes[timeIndex] || {};
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

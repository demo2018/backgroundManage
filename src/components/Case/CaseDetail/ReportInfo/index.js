import { Tabs } from 'antd';
import BodyReport from './BodyReport';
import ToothReport from './ToothReport';
import ImageReport from './ImageReport';

const TabPane = Tabs.TabPane;

class ReportInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { form } = this.props;
    const bodyReportProps = {
      form
    };
    const toothReportProps = {
      form
    };
    return (
      <div className="reportInfo part">
        <div className="head">
          <h3>初诊报告</h3>
        </div>
        <div className="content">
          <Tabs type="card" def>
            <TabPane tab="全身情况" key="1">
              <BodyReport {...bodyReportProps} />
            </TabPane>
            <TabPane tab="牙位图" key="2">
              <ToothReport {...toothReportProps} />
            </TabPane>
            <TabPane tab="影像检查" key="3">
              <ImageReport {...toothReportProps} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default ReportInfo;

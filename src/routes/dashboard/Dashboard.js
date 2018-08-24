import * as React from 'react';
import { Row, Col, Icon, Panel } from 'rsuite';

import * as images from '../../images/charts';
import StackedColumnChart from './StackedColumnChart';
import Axios from 'axios';
import { getArrayFromGistData, getLastData } from '../../utils/utils';
import config from '../../config';

type Props = {};

class Dashboard extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      summariesData: []
    };
  }

  componentDidMount() {
    this.fetchSummariesData().then(response => {
      const summariesData = getArrayFromGistData(response);
      const lineChartData = getLastData(summariesData, 2);
      console.log(lineChartData);
      this.setState({
        lineChartData
      });
    });
  }

  fetchSummariesData() {
    return Axios.get(`https://api.github.com/gists/${config.gistId}`).then(
      response => response.data
    );
  }
  render() {
    const { lineChartData } = this.state;
    return (
      <Panel className="dashboard" header={<h3>Dashboard</h3>}>
        <Row gutter={30} className="header">
          <Col xs={24}>
            <StackedColumnChart chartData={lineChartData} />
          </Col>
        </Row>
        <Row gutter={30}>
          <Col xs={24}>
            {/* <LineChart lineChartData={lineChartData} /> */}
          </Col>
        </Row>
      </Panel>
    );
  }
}

export default Dashboard;

import * as React from 'react';
import { Row, Col, Icon, Panel } from 'rsuite';

import * as images from '../../images/charts';
import StackedColumnChart from './StackedColumnChart';
import Axios from 'axios';
import { getArrayFromGistData, getLastData, secondsFormat } from '../../utils/utils';
import config from '../../config';

type Props = {};

class Dashboard extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      summariesData: [],
      total: 0,
      date: 7
    };
  }

  componentDidMount() {
    const { date } = this.state;
    this.fetchSummariesData().then(response => {
      const summariesData = getArrayFromGistData(response);
      const chartData = getLastData(summariesData, date);
      this.setState({
        chartData,
        total: this.getTotal(chartData)
      });
    });
  }

  getTotal(data) {
    return data.reduce((x, y) => x + y.grand_total.total_seconds, 0);
  }
  fetchSummariesData() {
    return Axios.get(`https://api.github.com/gists/${config.gistId}`).then(
      response => response.data
    );
  }

  renderHeader() {
    const { total, date } = this.state;
    return (
      <h3>
        <span>{secondsFormat(total)}</span>&nbsp;
      </h3>
    );
  }
  render() {
    const { chartData } = this.state;
    return (
      <Panel className="dashboard" header={this.renderHeader()}>
        <Row gutter={30} className="header">
          <Col xs={24}>
            <StackedColumnChart chartData={chartData} />
          </Col>
        </Row>
      </Panel>
    );
  }
}

export default Dashboard;

import * as React from 'react';
import { Row, Col, Icon, Panel, Loader } from 'rsuite';
import Axios from 'axios';
import moment from 'moment';
import StackedColumnChart from './StackedColumnChart';
import { getArrayFromGistData, getLastData, secondsFormat } from '../../utils/utils';
import DatePicker from './DatePicker';

type Props = {};

class Dashboard extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      loading: true,
      selectedValue: 7,
      datePickerData: [
        {
          value: 7,
          label: 'Last 7 Days'
        },
        {
          value: 14,
          label: 'Last 14 Days'
        },
        {
          value: 30,
          label: 'Last 30 Days'
        }
      ],
      summariesData: []
    };
  }

  componentDidMount() {
    const { selectedValue } = this.state;
    this.fetchSummariesData().then(response => {
      console.log(response);
      const chartData = getLastData(response, selectedValue);
      this.setState({
        total: this.getTotal(chartData),
        loading: false,
        chartData,
      });
    });
  }

  getTotal(data) {
    return data.reduce((x, y) => x + y.grand_total.total_seconds, 0);
  }

  fetchSummariesData() {
    const gistId = localStorage.getItem('gistId');
    const summaryData = JSON.parse(localStorage.getItem('wakatime'));
    let isLast = false;
    const lastDate = summaryData ? summaryData[summaryData.length - 1].data[0].range.date : null;
    const currentDate = moment()
      .subtract(1, 'd')
      .format('YYYY-MM-DD');

    // 当不存在昨天的数据时，即认为当前的数据不是最新，需要重新从 Gist 上获取
    /** TODO:
     * 该部分的判断及本地存储逻辑需要优化，因为随着备份数据的增多，从 Gist 获取的数据越大
     * 一方面，网络请求的时间会变长，另一方面，可能 localStorage 放不下
     * **/
    isLast = lastDate ? moment(currentDate).isSame(lastDate) : false;

    if (summaryData && isLast) {
      return Promise.resolve(summaryData);
    } else {
      return Axios.get(`https://api.github.com/gists/${gistId}`).then(response => {
        const summaryData = getArrayFromGistData(response.data);
        localStorage.setItem('wakatime', JSON.stringify(summaryData));
        return summaryData;
      });
    }
  }

  handlePickerSelect = value => {
    const summaryData = JSON.parse(localStorage.getItem('wakatime'));
    const chartData = getLastData(summaryData, value);
    this.setState({
      total: this.getTotal(chartData),
      chartData,
      selectedValue: value
    });
  };

  renderHeader() {
    const { total, selectedValue, datePickerData } = this.state;
    return (
      <h3>
        <span>{secondsFormat(total)}</span>
        &nbsp;
        <DatePicker
          data={datePickerData}
          selectedValue={selectedValue}
          onSelect={this.handlePickerSelect}
        />
      </h3>
    );
  }
  render() {
    const { loading, chartData } = this.state;
    return (
      <Panel className="dashboard" header={this.renderHeader()}>
        <Row gutter={30} className="header">
          <Col xs={24}>
            <StackedColumnChart chartData={chartData} />
            {loading && <Loader center content="loading" />}
          </Col>
        </Row>
      </Panel>
    );
  }
}

export default Dashboard;

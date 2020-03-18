import * as React from 'react';
import { Row, Col, Icon, Panel, Loader } from 'rsuite';
import Axios from 'axios';
import StackedColumnChart from './StackedColumnChart';
import { getLastData, secondsFormat, swap } from '../../utils/utils';
import DatePicker from './DatePicker';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      loading: false,
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
        },
        {
          value: 90,
          label: 'Last 90 Days'
        }
      ],
      chartData: []
    };
  }

  componentDidMount() {
    this.fetchSummariesData();
  }

  getTotal(data) {
    return data.reduce((x, y) => x + y.grand_total.total_seconds, 0);
  }

  fetchSingleFile(response = {}) {
    const { selectedValue } = this.state;
    const {
      data: { files }
    } = response;
    const fetchTasks = [];
    length = Object.keys(files).length - 1;
    const startIndex = selectedValue >= length ? 0 : length - selectedValue;
    // 选取已选中的天数
    const filesNames = Object.keys(files).slice(startIndex);

    filesNames.forEach(fileName => {
      // eslint-disable-next-line
      const { type, filename, raw_url } = files[fileName] || {};
      if (type === 'application/json' && /summaries/.test(filename)) {
        fetchTasks.push(Axios.get(raw_url));
      }
    });
    return Promise.all(fetchTasks);
  }

  fetchSummariesData() {
    const gistId = localStorage.getItem('gistId');
    this.setState({ loading: true });
    return Axios.get(`https://api.github.com/gists/${gistId}`)
      .then(response => this.fetchSingleFile(response))
      .then(values => {
        const data = values.reduce((sum, current) => {
          sum.push(current.data);
          return sum;
        }, []);

        const chartData = getLastData(data);
        this.setState({
          total: this.getTotal(chartData),
          loading: false,
          chartData
        });
      });
  }

  /**
   * 对数据做一个排序，确保日期顺序的正确
   * @param {*} arr
   */
  bubbleSort(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        if (
          new Date(arr[j].data ? arr[j].data[0].range.date : arr[j][0].range.date).getTime() >
          new Date(
            arr[j + 1].data ? arr[j + 1].data[0].range.date : arr[j + 1][0].range.date
          ).getTime()
        ) {
          swap(arr, j, j + 1);
        }
      }
    }

    return arr;
  }

  handlePickerSelect = value => {
    this.fetchSummariesData();
    this.setState({
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

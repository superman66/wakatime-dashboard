import React from 'react';
import BarChart from '@rsuite/charts/lib/charts/BarChart';
import LineChart from '@rsuite/charts/lib/charts/LineChart';
import Bars from '@rsuite/charts/lib/series/Bars';
import Line from '@rsuite/charts/lib/series/Line';
import YAxis from '@rsuite/charts/lib/components/YAxis';

const StackedBarWithLineChart = ({ data1 }) => {
  const data = [
    ['18-24岁', 650, 650, 750, 100, 100, 150],
    ['25-29岁', 200, 200, 1000, 100, 100, 150],
    ['30-34岁', 650, 650, 1400, 300, 250, 400],
    ['35-39岁', 750, 750, 1400, 300, 250, 400],
    ['40-44岁', 650, 650, 1300, 100, 100, 150],
    ['45-49岁', 650, 650, 1300],
    ['50-54岁', 650, 650, 1250],
    ['55岁+', 400, 450, 900]
  ];
  return (
    <BarChart data={data}>
      <YAxis minInterval={1000} />
      <Bars name="男-互联网电视曝光量" color="#2485C1" stack="男" />
      <Bars name="男-移动曝光量" color="#32A4D4" stack="男" />
      <Bars name="男-电脑曝光量" color="#34C3FF" stack="男" />
    </BarChart>
  );
  // const data = [
  //   ['00:00', 494],
  //   ['01:00', 999]
  // ];

  // return <LineChart name="Page View" data={data} />;
};

export default StackedBarWithLineChart;

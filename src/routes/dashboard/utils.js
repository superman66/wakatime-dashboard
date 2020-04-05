export function getCodeActivityData(summary) {}

/**
 * codingActivityData: ['2019-09-09',1,2,3,3,4]
 * @param {*} data
 */
export function getWakatimeData(data) {
  const codingActivityData = []; // 过去n天的 code 活跃时间数据
  const categoryData = []; // 时间分类数据
  const languagesData = []; // 语言数据
  const editorsData = []; // 编辑器数据
  for (let index = data.length - 1; index >= 0; index--) {
    // 每天的统计数据。由于之前的保存的数据有 data 字段，后面保存的数据去掉 data 字段，因此这里需要做个兼容。
    const summary = data[index].data ? data[index].data[0] : data[index][0];
    const projects = summary.projects.map(project => project.total_seconds / 3600);
    codingActivityData.push([summary.range.date, ...projects]);
  }
  return { codingActivityData };
}

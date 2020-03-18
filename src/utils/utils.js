/**
 * 获取 gist 数据中的  content 值
 * @param {*} obj
 */
// export function getArrayFromGistData(obj) {
//   const data = [];
//   const files = obj.files;
//   if (!files) {
//     return;
//   }
//   Object.keys(files).forEach(filename => {
//     const file = files[filename];
//     // 文件存在、语言是 JSON且文件名称包含 sumarries 关键词，才能当成 summaries 数据
//     if (file && file.language === 'JSON' && /summaries/.test(file.filename)) {
//       data.push(JSON.parse(file.content));
//     }
//   });

//   return data;
// }

export function getLastData(data) {
  const length = data.length;
  const projectNames = {};
  const lineChartData = [];

  for (let index = length - 1; index >= 0; index--) {
    // 每天的统计数据
    const summary = data[index].data ? data[index].data[0] : data[index][0];
    lineChartData.push(summary);
  }
  return lineChartData.reverse();
}

export function secondsFormat(seconds, showSeconds = true) {
  let time = '';
  if (seconds > -1) {
    const hour = Math.floor(seconds / 3600);
    const min = Math.floor(seconds / 60) % 60;
    const sec = seconds % 60;

    if (hour > 0) {
      time = `${hour}h `;
    }
    if (min > 0) {
      time += `${min}m `;
    }

    if (showSeconds) {
      time += `${sec.toFixed(0)}s`;
    }
  }
  return time;
}

export function swap(arr, indexA, indexB) {
  [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}

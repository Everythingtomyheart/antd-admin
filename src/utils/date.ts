import dayjs from 'dayjs';
/**
 * @description 处理时间
 * @param {String} 可转为js时间格式的数据
 * @param {String} 格式类型，默认为YYYY-M-D HH:mm:ss
 */
export function format(datestr: string, type: string = 'YYYY-MM-DD  HH:mm:ss') {
  return datestr !== '' ? dayjs(datestr).format(type) : '';
}
export function now(type: string = 'YYYY-MM-DD  HH:mm:ss') {
  return dayjs().format(type);
}

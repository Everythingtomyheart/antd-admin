import dayjs from 'dayjs';
import relative from 'dayjs/plugin/relativeTime';
dayjs.extend(relative);
type DateType = string | number | Date | dayjs.Dayjs;
/**
 * @description 处理时间
 * @param {DateType}  date  可转为js时间格式的数据
 * @param {string} type 格式类型，默认为YYYY-M-D HH:mm:ss
 * @returns {string}  格式化后的时间
 */
export function format(date: DateType, type: string = 'YYYY-MM-DD  HH:mm:ss') {
  return date !== '' ? dayjs(date).format(type) : '';
}
/**
 * @description 格式化当前时间
 * @param   {string}  type                  当前时间格式化标准，默认YYYY-MM-DD HH:mm:ss
 * @return  {string}                        格式化后的时间
 */
export function now(type: string = 'YYYY-MM-DD  HH:mm:ss') {
  return dayjs().format(type);
}

/**
 * @description 获取时间X到当前的时间的相对时间
 * @param {DateType} date 时间X的js可解析字符串
 * @returns 相对时间
 */
export function relativeTime(date: DateType) {
  return dayjs(date).fromNow();
}

/**
 * Функция "вырезания" айдишника (целое число `например:1500019817412111`) из URL
 *
 * @param url - если `null` то `browser.getUrl()`
 */
export function getIdFromUrl(url?: string): string {
  let reportNum: RegExpExecArray | string;

  url ? (reportNum = /\d+$/.exec(url)![0]) : (reportNum = /\d+$/.exec(browser.getUrl())![0]);

  return reportNum;
}

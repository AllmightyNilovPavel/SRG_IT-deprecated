import * as fse from "fs-extra";

const screenshotDir = `./.reports/screenshots/${new Date().toDateString()}/`;
let initScreenshotDir = false;
/**
 * Функция сохранения скриншота страницы
 *
 * @param name - имя скриншота
 */
export function makeScreenshot(name: string): void {
  if (name) {
    let nameFormatted: string = name
      .replace(/[\.\s]+/g, "_")
      .replace(/_+$/, "")
      .replace(/(?:[']|["])/g, "");
    if (!initScreenshotDir) {
      fse.mkdirpSync(screenshotDir);
      initScreenshotDir = true;
    }
    browser.saveScreenshot(
      `${screenshotDir}/${nameFormatted}_${new Date().getHours().toString()}h_${new Date()
        .getMinutes()
        .toString()}m.png`
    );
  } else {
    throw new Error(`Cant make screenshot. The screenshot name is NULL.`);
  }
}

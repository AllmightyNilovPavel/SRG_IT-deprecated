import { makeScreenshot } from "modules";
import options from "options";

/**
 * Кастомный метод который делает скриншот экрана
 * и пишет лог переданный в параметре - в консоль.
 * @param logData
 */
export function debugLogging(logData: any, callingFuncName?: string) {
  if (options.debug) {
    callingFuncName
      ? console.log(`Дебаг лог для функции ${callingFuncName}.`)
      : console.log(`Ноунейм дебаг лог.`);

    makeScreenshot(`debugLogging_${new Date().getTime()}`);
    console.log(`${logData}`);
  }
}

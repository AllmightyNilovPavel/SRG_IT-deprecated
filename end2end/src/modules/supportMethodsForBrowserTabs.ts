import { EnumSwitchWindow } from "../shared/enums/enum.switchWindow";
import { EnumCloseWindow } from "../shared/enums/enum.closeWindow";
import { debugLogging } from "./debugLogging";

export function browserSwitchWindow(windowName: string, comment: EnumSwitchWindow) {
  browser.switchWindow(windowName);
  debugLogging(comment);
}

/**
 * Метод который закрывает текущую вкладку браузера
 * и логирует сообщение указанное в параметра - в лог.
 * @param comment
 */
export function browserCloseWindow(comment: EnumCloseWindow) {
  browser.closeWindow();
  debugLogging(comment);
}

/**
 * Метод переключения между вкладками браузера
 * по номеру вкладки начиная с нуля
 * @param i - 0 - первая вкладка
 * @param comment - опциональный параметр для логирования сообщения в консоль
 */
export function browserSwitchWindowByIndex(i: number, comment?: string) {
  let handles = browser.getWindowHandles();
  browser.switchToWindow(handles[i]);
  if (comment) debugLogging(comment);
}

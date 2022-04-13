import {
  kronaNavigationBar,
  kronaResultTable,
  kronaFiltersBox,
  kronaRequestsRegistry,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";
import { KronaNavigationButtons } from "pages/Krona/Enums";

/** Последовательность действий:
 * Переход в старую версию реестра объектов
 * Ожидание загрузки реестра
 * В поле с rfvId вписывыем id заявки
 * Нажатие кнопки "Показать"
 * Ожидание загрузки результирующей таблицы
 *
 * @param rfvId - id заявки по которой отфильтруется таблица
 */
export function kronaFilterTableById(rfvId: string) {
  kronaNavigationBar.navigate_to(KronaNavigationButtons.REQUESTS_OLD);
  kronaResultTable.waitForLoad();
  kronaFiltersBox.selectByRfvId(rfvId);
  kronaRequestsRegistry.show();
  kronaResultTable.waitForLoad();
  return kronaResultTable.resultTableGetStatus();
}

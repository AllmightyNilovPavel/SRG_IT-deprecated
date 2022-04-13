import { kronaNavigationBar } from "pages/Krona";
import { IRequestFlat } from "options/testData/krona";
import { KronaNavigationButtons, ValuationResultData } from "pages/Krona/Enums";
import { requestsCreateFlat } from "pages/Krona";
import { makeScreenshot } from "modules";

/** Последовательность действий:
 * Переход на страницу создания нового запроса стомости
 * Ожидание загрузки страницы
 * Заполнение всех полей для создания запроса стоимости
 * Нажатие кнопки "Рассчитать стоимость"
 * Ожидание результата расчета роботом
 *
 * @param request_params - данные для запроса стоимости
 */
export function kronaNewRequestPriceForFlat(request_params: IRequestFlat) {
  kronaNavigationBar.navigate_to(KronaNavigationButtons.NEW_REQUEST);
  requestsCreateFlat.waitForLoad();
  requestsCreateFlat.fullfillFlatRequest(request_params);
  makeScreenshot(`Проверка данных перед отправкой`);
  requestsCreateFlat.sendResult();
  requestsCreateFlat.waitForResult(ValuationResultData.STATUS);
}

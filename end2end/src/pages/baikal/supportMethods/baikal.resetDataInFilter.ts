import { baikalHeaderBeta, baikalLeftPanelBetaFilter, baikalMapBeta } from "pages/baikal";
import { BaikalEnumHeader } from "pages/baikal/enums";

/** Последотваленость действий:
 * Перейти на раздел "Карта" в Байкале
 * Подождать пока страница с картой загрузится
 * Подождать пока откроется фильтр
 * Открыть расширенный режим в фильтре по дате
 * Сбросить предустановленные значения даты
 */
export function baikalResetDataInFilter() {
  baikalHeaderBeta.goToSection(BaikalEnumHeader.MAP);
  baikalMapBeta.waitForLoad();
  baikalLeftPanelBetaFilter.waitForLoad();
  baikalLeftPanelBetaFilter.goToAdvanceMode();
  baikalLeftPanelBetaFilter.resetData();
}

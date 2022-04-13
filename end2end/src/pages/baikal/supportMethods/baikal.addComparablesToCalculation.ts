import { baikalHeaderBeta, baikalOffersBeta } from "pages/baikal";
import { BaikalEnumHeader } from "pages/baikal/enums";

/** Последователеность действий:
 * Перейти на раздел "Список объектов" в Байкале
 * Дождаться загрузки страницы
 * Открыть все объекты списком
 * Добавить n-ное количество аналогов в расчетник
 *
 * @param count_analogs - количество добавляемых аналогов
 */
export function baikalAddComparablesToCalculation(count_analogs: number) {
  baikalHeaderBeta.goToSection(BaikalEnumHeader.LIST_OF_OBJECTS);
  baikalOffersBeta.waitForLoad();
  baikalOffersBeta.showAsList();
  baikalOffersBeta.addToCalculation(count_analogs);
}

import { baikalCalculationBetaCalculation, baikalHeaderBeta } from "pages/baikal";
import { BaikalEnumCalculationLeftMenu, BaikalEnumHeader } from "pages/baikal/enums";

/** Последователеность действий:
 *
 * Открыть в Байкале раздел "Расчетник"
 * Открыть вкладку "Расчетник сравнительный"
 * Дождаться загрузки страницы с расчетником
 */
export function baikalGoToCalculation() {
  baikalHeaderBeta.goToSection(BaikalEnumHeader.CALCULATION);
  baikalCalculationBetaCalculation.goToSection(BaikalEnumCalculationLeftMenu.CALCULATION);
  baikalCalculationBetaCalculation.waitForLoad();
}

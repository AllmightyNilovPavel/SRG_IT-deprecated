import { BaikalEnumHeader, baikalHeaderBeta, baikalRequestPageBeta } from "pages/baikal";
import { browserCloseWindow, browserSwitchWindow } from "modules/supportMethodsForBrowserTabs";
import { EnumCloseWindow } from "shared/enums/enum.closeWindow";
import { EnumSwitchWindow } from "shared/enums/enum.switchWindow";

/** Последователеность действий:
 * Перейти в раздел "Заявка" в Байкале
 * Дождаться загрузки страницы с заявкой
 * Просмотреть разделы, обязательные для подтверждения расчета ("История верификаций", "История по дому", "Дубли")
 * Подтвердить расчет через карточку Байкала
 * Закрыть текущее окно Байкала и перейти в КРОНУ
 */
export function baikalConfirmCalculationAndGoToKrona() {
  baikalHeaderBeta.goToSection(BaikalEnumHeader.REQUEST);
  baikalRequestPageBeta.waitForLoad();
  baikalRequestPageBeta.watchRequireTables();
  baikalRequestPageBeta.allowCalculation();
  browserCloseWindow(EnumCloseWindow.close_baikal);
  browserSwitchWindow(`9r`, EnumSwitchWindow.switch_to_9r);
}

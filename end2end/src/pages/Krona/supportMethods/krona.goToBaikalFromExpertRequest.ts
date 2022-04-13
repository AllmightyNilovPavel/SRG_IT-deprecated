import { kronaExpertRequestCard } from "pages/Krona/index";
import { browserSwitchWindow } from "modules/supportMethodsForBrowserTabs";
import { EnumSwitchWindow } from "shared/enums/enum.switchWindow";

/** Последовательность действий:
 * Переход в карточку эксперта по id, переданному в @param rfvId
 * Ожидание загрузки карточки эксперта
 * Из карточки эксперта переходим в Байкал по кнопке "Открыть в Байкале"
 * Переключаемся на окно Байкала
 *
 * @param rfvId - id заявки, через которую будет осуществлен вход в Байкал
 */
export function kronaGoToBaikalFromExpertRequest(rfvId: string) {
  kronaExpertRequestCard.goToExpertRequestCard(rfvId);
  kronaExpertRequestCard.waitForLoad(false);
  kronaExpertRequestCard.goToBaikal();
  browserSwitchWindow(`baikal`, EnumSwitchWindow.switch_to_baikal);
}

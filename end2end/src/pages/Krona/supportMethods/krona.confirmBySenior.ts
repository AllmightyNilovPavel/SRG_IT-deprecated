import { kronaExpertRequestCard } from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

/** Последовательность действий:
 * Переход в карточку эксперта
 * Ожидание загрузки страницы с карточкой эксперта
 * Подтверждение заявки старшим экспертом
 *
 * @param rfvId - id заявки, которую нужно подтвердить старшим экспертом
 */
export function kronaConfirmBySenior(rfvId: string) {
  kronaExpertRequestCard.goToExpertRequestCard(rfvId);
  kronaExpertRequestCard.waitForLoad(false);
  kronaExpertRequestCard.confirmationBySenior();

  // Иногда после подтверждения заявки старшим снова появляются модальные окна, нужно из закрыть
  kronaExpertRequestCard.waitForLoad(false);
}

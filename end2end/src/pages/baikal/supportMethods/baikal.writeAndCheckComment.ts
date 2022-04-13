import { baikalHeaderBeta, baikalRequestPageBeta } from "pages/baikal";
import { BaikalEnumHeader } from "pages/baikal/enums";

/** Последователеность действий:
 * Перейти в раздел "Заявка" в Байкале
 * Дождаться загрузки страницы с заявкой
 * Написать комментарий, обновить страницу и проверить, что значение комментария сохранилось
 *
 * @param comment - комментарий
 * */
export function baikalWriteAndCheckComment(comment: string) {
  baikalHeaderBeta.goToSection(BaikalEnumHeader.REQUEST);
  baikalRequestPageBeta.waitForLoad();
  baikalRequestPageBeta.writeAndCheckComment(comment);
}

import { BaikalRightPanelBetaBase } from "./baikalRightPanelBetaBase";
import { baikalRequestPageBeta } from "../baikalRequestPageBeta";

export class BaikalRightPanelBetaComment extends BaikalRightPanelBetaBase {
  //-------------------------------------------------- Геттеры ---------------------------------------------------------
  get $commentary() {
    return this.$right_panel.$(`.//div[contains(@class, "Commentary_commentary")]`);
  }
  /** Сама форма куда вводится комментарий */
  get $commentary_form() {
    return this.$commentary.$(`.//textarea[@placeholder="Комментарий к заявке"]`);
  }

  //-------------------------------------------------- Методы ----------------------------------------------------------
  writeAndCheckComment(commentary: string) {
    baikalRightPanelBetaComment.$commentary_form.waitForClickable({
      timeoutMsg:
        "Поле с комментарием НЕ кликабельно. Хотя оно должно быть кликабельно под пользоваталем," +
        "который является исполнителем по заявке.",
    });
    baikalRightPanelBetaComment.$commentary_form.click();
    console.log(`Клик по форме заполнения комментария из правой панели Байкала`);
    baikalRightPanelBetaComment.$commentary_form.setValue(commentary);
    console.log(`Маленькая пауза для того, чтобы запрос /multi отправился на сервер`);
    browser.pause(1000);
    browser.waitUntil(() => baikalRightPanelBetaComment.$commentary_form.getText() === commentary, {
      timeoutMsg: `В форме заполнения комментария из правой панели Байкала должно было засетиться значение = ${commentary}.
        Но сейчас там по факту значение = ${baikalRightPanelBetaComment.$commentary_form.getText()}`,
    });
    console.log(
      `В форму заполнения коммертария из правой панели Байкала засетилось значение = ${commentary}`
    );
    browser.waitUntil(() => baikalRequestPageBeta.$commentary_form.getText() === commentary, {
      timeoutMsg: `В форме заполнения коммертария в заявке должно было засетиться значение = ${commentary}.
        Но сейчас там по факту значение = ${baikalRequestPageBeta.$commentary_form.getText()}`,
    });
    console.log(
      `В форму заполнения комментария в заявке Байкала засетилось значение = ${commentary}`
    );
    console.log(`Обновление страницы в браузере`);
    browser.refresh();
    browser.waitUntil(() => baikalRightPanelBetaComment.$commentary_form.getText() === commentary, {
      timeoutMsg: `После обновления страницы в форме заполнения комментария из правой панели Байкала должно было остаться значение = ${commentary}.
        Но сейчас там по факту значение = ${baikalRightPanelBetaComment.$commentary_form.getText()}`,
    });
    console.log(
      `После обновления страницы значение комментария в правой панели Байкала сохранилось и оно = ${commentary}`
    );
    browser.waitUntil(() => baikalRequestPageBeta.$commentary_form.getText() === commentary, {
      timeoutMsg: `После обновления страницы в форме заполнения коммертария в заявке должно было остаться значение = ${commentary}.
        Но сейчас там по факту значение = ${baikalRequestPageBeta.$commentary_form.getText()}`,
    });
    console.log(
      `После обновления страницы значение комментария в заявке Байкала сохранилось и оно = ${commentary}`
    );
  }
}

export const baikalRightPanelBetaComment = new BaikalRightPanelBetaComment();

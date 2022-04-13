import { debugLogging } from "modules";
import { EnumKeyboardButtons } from "../enums";
import { baikalRightPanelBetaComment } from "./rightPanelBeta";

class BaikalRequestPageBeta {
  path = "/baikal/request";

  //------------------------------------------------- Геттеры ----------------------------------------------------------

  get $loader(): WebdriverIO.Element {
    return browser.$(`div[class*=loader]`);
  }

  /** Корневой элемент страницы с заявкой */
  get $center_block() {
    return browser.$(`//div[contains(@class, 'CenterBlock_root')]`);
  }

  /** Блок заявки */
  private get $request_root() {
    return this.$center_block.$(`.//div[contains(@class, 'Request_root')]`);
  }

  /** Блок `Обратите внимание` в шапке заявки */
  private get $alerts_block() {
    return this.$request_root.$(`.//div[contains(@class, 'Alerts_alertsBlock')]`);
  }

  /** Правый блок страницы */
  private get $request_info() {
    return this.$request_root.$(`.//div[contains(@class, 'Request_infoRight')]`);
  }

  /** Группа кнопок справа */
  private get $action_groups() {
    return this.$request_info.$(`.//div[contains(@class, 'ActionGroups_actionGroup')]`);
  }

  /** Таблица с кнопками */
  private get $table(): WebdriverIO.Element {
    return this.$action_groups.$(`.//div[contains(@class, 'ant-table-content')]`);
  }

  /** Кнопка 'История верификаций' */
  private get $history_verification(): WebdriverIO.Element {
    return this.$table.$(`.//p[contains(text(), 'История верификаций')]/../../..//button`);
  }

  /** Кнопка 'История по дому' */
  private get $history_house(): WebdriverIO.Element {
    return this.$table.$(`.//p[contains(text(), 'История по дому')]/../../..//button`);
  }

  /** Значок у кнопки "История по дому" */
  private get $history_house_icon(): WebdriverIO.Element {
    return this.$table.$(`.//p[contains(text(), 'История по дому')]/../../..//i`);
  }

  /** Кнопка 'Дубли' */
  private get $doubles(): WebdriverIO.Element {
    return this.$table.$(`.//p[contains(text(), 'Дубли')]/../../..//button`);
  }

  /** Значок у кнопки "Дубли" */
  private get $doubles_icon(): WebdriverIO.Element {
    return this.$table.$(`.//p[contains(text(), 'Дубли')]/../../..//i`);
  }
  get $commentary() {
    return this.$request_root.$(`.//div[contains(@class, "Commentary_commentary")]`);
  }
  /** Сама форма куда вводится комментарий */
  get $commentary_form() {
    return this.$commentary.$(`.//textarea[@placeholder="Комментарий к заявке"]`);
  }

  /** Кнопка 'Подтвердить расчет' на форме с заявкой */
  private get $confirm_calculation() {
    return this.$request_root.$(`.//span[contains(text(), "Подтвердить расчет")]/..`);
  }

  /** Корень модального окна (корень генерируется отдельно для каждой из кнопок) */
  private get $$modal_root() {
    return browser.$$(`//div[contains(@class, 'ant-modal-root')]`);
  }

  /** Кнопки на модальных окнах */
  private get $modal_buttons() {
    return this.$$modal_root[3].$(`.//div[contains(@class, 'ActionModal_buttonGroup')]`);
  }

  /** Кнопка `Ок` на модальном окне с подтверждением заявки */
  private get $modal_button_ok() {
    return this.$modal_buttons.$(`.//span[contains(text(), 'Ок')]/..`);
  }

  //-------------------------------------------------- Методы ---------------------------------------------------------

  /** Просмотреть обязательельные таблицы.
   * Нажать кнопку
   * Дождаться появления модального окна
   * Нажать кнопку 'ESC'
   */
  watchRequireTables() {
    // История верификаций
    this.$history_verification.waitForClickable({
      timeoutMsg: `Кнопка "История верификаций" не кликабельна`,
    });
    this.$history_verification.click();
    debugLogging(`Клик по кнопке "История верификаций"`);

    this.$$modal_root[0].$(`.//div[contains(@class, 'ant-table-body')]`).waitForDisplayed({
      timeoutMsg: `После нажатия кнопки "История верификаций" не появилось модальное окно`,
    });
    browser.keys(EnumKeyboardButtons.ESC);
    debugLogging(`Нажатие клавиши Esc для закрытия всплывающего окна`);
    this.waitForLoad();

    // История по дому
    while (this.$history_house_icon.getAttribute("aria-label") === "icon: exclamation-circle-o") {
      this.$history_house.waitForClickable({
        timeoutMsg: `Кнопка "История по дому" не кликабельна`,
      });
      this.$history_house.click();
      debugLogging(`Клик по кнопке "История по дому"`);

      this.$$modal_root[1].$(`.//div[contains(@class, 'ant-table-body')]`).waitForDisplayed({
        timeout: 40000,
        timeoutMsg: `После нажатия кнопки "История по дому" не появилось модальное окно`,
      });
      browser.keys(EnumKeyboardButtons.ESC);
      debugLogging(`Нажатие клавиши Esc для закрытия всплывающего окна`);
      this.waitForLoad();
    }
    browser.waitUntil(
      () => this.$history_house_icon.getAttribute("aria-label") === "icon: check-circle-o",
      {
        timeoutMsg: `Иконка у кнопки "История по дому" должна быть в виде зеленой галочки, но сейчас это не так.`,
      }
    );

    // Дубли
    while (this.$doubles_icon.getAttribute("aria-label") == "icon: exclamation-circle-o") {
      this.$doubles.waitForClickable({
        timeoutMsg: `Кнопка "Дубли" не кликабельна`,
      });
      this.$doubles.click();
      debugLogging(`Клик по кнопке "Дубли"`);

      this.$$modal_root[2].$(`.//div[contains(@class, 'ant-table-body')]`).waitForDisplayed({
        timeout: 40000,
        timeoutMsg: `После нажатия кнопки "Дубли" не появилось модальное окно`,
      });
      browser.keys(EnumKeyboardButtons.ESC);
      debugLogging(`Нажатие клавиши Esc для закрытия всплывающего окна`);
      this.waitForLoad();
      browser.waitUntil(
        () => this.$doubles_icon.getAttribute("aria-label") === "icon: check-circle-o",
        {
          timeoutMsg: `Иконка у кнопки "Дубли" должна быть в виде зеленой галочки, но сейчас это не так.`,
        }
      );
    }
  }

  allowCalculation() {
    this.waitForLoad();
    let allowButton = this.$confirm_calculation;
    allowButton.scrollIntoView();
    allowButton.waitForClickable({
      timeoutMsg: "Кнопка 'Подтвердить расчет' на форме с заявкой не кликабельна",
    });
    debugLogging(`Нажатие по кнопке "Подтвердить расчет"`);
    allowButton.click();
    this.$modal_button_ok.waitForClickable({
      timeoutMsg: `В модальном окне с подтверждением заявки кнопка "Ок" не кликабельна.`,
    });
    debugLogging(`В модальном окне с подтверждением заявки нажатие кнопки "Ок"`);
    this.$modal_button_ok.click();
    allowButton.waitForDisplayed({
      timeoutMsg: `Кнопка "Подтвердить расчет" НЕ пропала с формы. Скорее всего есть ошибка при заполнении расчетника,
      которая не дает подтвердить расчет. Ссылка на заявку = ${browser.getUrl()}`,
      reverse: true,
    });
    debugLogging(
      `Кнопка "Подтвердить расчет" пропала с формы. Значит заявка подтверждена аналитиком и ушла на проверку старшему`
    );
  }

  writeAndCheckComment(commentary: string) {
    baikalRequestPageBeta.$commentary_form.waitForClickable({
      timeoutMsg:
        "В карточке заявки поле с комментарием НЕ кликабельно. " +
        "Хотя оно должно быть кликабельно под пользоваталем, который является исполнителем по заявке.",
    });
    baikalRequestPageBeta.$commentary_form.click();
    debugLogging(`Клик по форме заполнения комментария из карточки заявки Байкала`);
    baikalRequestPageBeta.$commentary_form.setValue(commentary);
    debugLogging(`Маленькая пауза для того, чтобы запрос /multi отправился на сервер`);
    browser.pause(1000);
    browser.waitUntil(() => baikalRequestPageBeta.$commentary_form.getText() === commentary, {
      timeoutMsg: `В форме заполнения комментария из карточки заявки Байкала должно было засетиться значение = ${commentary}.
        Но сейчас там по факту значение = ${baikalRequestPageBeta.$commentary_form.getText()}`,
    });
    debugLogging(
      `В форму заполнения коммертария из карточки заявки Байкала засетилось значение = ${commentary}`
    );
    browser.waitUntil(() => baikalRightPanelBetaComment.$commentary_form.getText() === commentary, {
      timeoutMsg: `В форме заполнения комментария из правой панели Байкала должно было засетиться значение = ${commentary}.
        Но сейчас там по факту значение = ${baikalRightPanelBetaComment.$commentary_form.getText()}`,
    });
    debugLogging(
      `В форму заполнения комментария из правой панели Байкала засетилось значение = ${commentary}`
    );
    debugLogging(`Обновление страницы в браузере`);
    browser.refresh();
    browser.waitUntil(() => baikalRequestPageBeta.$commentary_form.getText() === commentary, {
      timeoutMsg: `После обновления страницы в форме заполнения коммертария в заявке должно было остаться значение = ${commentary}.
        Но сейчас там по факту значение = ${baikalRequestPageBeta.$commentary_form.getText()}`,
    });
    debugLogging(
      `После обновления страницы значение комментария в заявке Байкала сохранилось и оно = ${commentary}`
    );
    browser.waitUntil(() => baikalRightPanelBetaComment.$commentary_form.getText() === commentary, {
      timeoutMsg: `После обновления страницы в форме заполнения комментария из правой панели Байкала должно было остаться значение = ${commentary}.
        Но сейчас там по факту значение = ${baikalRightPanelBetaComment.$commentary_form.getText()}`,
    });
    debugLogging(
      `После обновления страницы значение комментария в правой панели Байкала сохранилось и оно = ${commentary}`
    );
  }

  waitForLoad() {
    this.$request_root.waitForDisplayed({
      timeout: 20000,
      timeoutMsg: `Страница ${browser.getUrl()} не прогрузилась`,
    });
    this.$history_verification.waitForClickable({
      timeout: 20000,
      timeoutMsg: `Страница заявки не прогрузилась из-за того, что кнопка "История верификаций" не кликабельна`,
    });
    this.$history_house.waitForClickable({
      timeout: 20000,
      timeoutMsg: `Страница заявки не прогрузилась из-за того, что кнопка "История по дому" не кликабельна`,
    });
    this.$doubles.waitForClickable({
      timeout: 20000,
      timeoutMsg: `Страница заявки не прогрузилась из-за того, что кнопка "Дубли" не кликабельна`,
    });
    this.$commentary_form.waitForDisplayed({
      timeout: 20000,
      timeoutMsg: `Страница заявки не прогрузилась из-за того, что на экране не отображается форма комментария из заявки`,
    });
    debugLogging(`Страница ${browser.getUrl()} прогрузилась`);
  }
}

export const baikalRequestPageBeta = new BaikalRequestPageBeta();

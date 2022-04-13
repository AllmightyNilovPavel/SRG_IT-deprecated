export class BaikalCalc {
  path = "/baikal/calculations";

  /** Корень таблицы расчёта */
  private get $calcTable_Root() {
    return $(`div[class^="CalculationTable_root"]`);
  }
  /** Спиннер */
  private get $loader() {
    return $(`div[class^="Spinner_root"]`);
  }
  /** Уведомление об успешном событии */
  public get $notification() {
    return browser.$(`.notification-success.is-visible`);
  }
  /** Уведомление об ошибке */
  get $notification_error() {
    return browser.$(`.notification-error.is-visible`);
  }
  /** Окно с ошибкой в системе Байкал */
  get $message_fatalError() {
    return this.$calcTable_body.$(`div[class^="CalculationTable_fatalError"]`);
  }
  // --------------------------------------------------
  // ----------- Шапка расчётника ---------------------
  // --------------------------------------------------
  /** шапка */
  private get $calcTable_title() {
    return this.$calcTable_Root.$(`div[class^="CalculationTable_title"]`);
  }
  /** Табы расчетников */
  private get $calcTable_tabs() {
    return this.$calcTable_title.$(`div[class^="CalculationTable_calculationTableTabs"]`);
  }
  /** Таб Расчетник доходный */
  get $saleCalc_button() {
    return this.$calcTable_tabs.$(`li:nth-child(2)`);
  }
  /** Таб Расчетник сравнительный */
  get $rentCalc_button() {
    return this.$calcTable_tabs.$(`li:nth-child(1)`);
  }
  /** Кнопка Сохранить */
  get $button_saveProgress() {
    return this.$calcTable_title.$(`div[class^="CalculationTable_saveProgress"] > button`);
  }
  /** Кнопка Отправить расчетник в Крону/БО */
  get $button_sendCalculation() {
    return this.$calcTable_title.$(`div[title="Передать расчетник"] > span`);
  }
  /** Кнопка скачать Excel */
  get $button_downloadExcel() {
    return this.$calcTable_title.$(`a[title="Скачать расчетник в формате xls"]`);
  }
  /** Спиннер при изменении данных таблицы */
  get $loader_sendData() {
    return this.$calcTable_title.$(
      `div[class^="CalculationTable_saveProgress"] div[class^="Spinner_root"]`
    );
  }
  /** Спиннер при изменении данных таблицы */
  get $icon_checkData() {
    return this.$calcTable_title.$(
      `div[class^="CalculationTable_saveProgress"] i[class*="fa-check"]`
    );
  }
  // --------------------------------------------------
  // ----------- Тело расчётника ---------------------
  // --------------------------------------------------
  /** Тело расчётника */
  private get $calcTable_body() {
    return this.$calcTable_Root.$(`div[class^="CalculationTable_calculation_"]`);
  }
  /** Строка №5 для проверки отрисовки данных */
  get $calcTable_dataCheck() {
    return this.$calcTable_body.$(`tr#calculationRow5`);
  }
  /** Строка №2 таблицы */
  get $calcTable_row2() {
    return this.$calcTable_body.$(`tr#calculationRow2`);
  }
  /** Заголовок для аналога #3 */
  get $calcTable_analogue3_title() {
    return this.$calcTable_row2.$(`td:nth-child(4)`);
  }
  // --------------------------------------------------
  // ----------- Таблица расчётника ---------------------
  // --------------------------------------------------
  /** Таблица расчётника */
  public get $calcTable_Calculation() {
    return this.$calcTable_Root.$(`table[class*="CalculationTable_calculationTable"]`);
  }
  /** Кнопка редактировать */
  public get $calcTableData_mainObjectLink() {
    return this.$calcTable_Calculation.$(`a[class*="CalculationTable_linkButton"]`);
  }
  // ---------------------------------------------------------------------------
  //                                Функции
  // ---------------------------------------------------------------------------
  /** Функция ожидания загрузки страницы */
  waitForLoad(timeout?: number) {
    let waitTimer: number;
    timeout && timeout > 10000 ? (waitTimer = timeout!) : (waitTimer = 10000);

    this.$calcTable_Root.waitForDisplayed({ timeout: waitTimer });
    this.$loader.waitForDisplayed({ timeout: waitTimer, reverse: true });
    this.$calcTable_title.waitForDisplayed({});
    this.$calcTable_body.waitForDisplayed({});
  }
  /** Функция ожидания отправки изменения в таблице */
  waitForSendData() {
    browser.pause(750);
    this.$loader_sendData.waitForDisplayed({ timeout: 5000 });
    this.$icon_checkData.waitForDisplayed({ timeout: 5000 });
  }
}
/** Расчётник Байкала */
export const baikalCalc = new BaikalCalc();

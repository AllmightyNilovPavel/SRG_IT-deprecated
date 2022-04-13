import { baikalRightPanelBetaComparables } from "./rightPanelBeta";
import {
  BaikalEnumColumnsInOffersList,
  BaikalEnumNumberElementsOnPage,
  BaikalEnumOffersClassNamesInTable,
} from "../enums";
import { debugLogging } from "modules";

/** Раздел "Список объектов" */
class BaikalOffers {
  path = "/baikal/offers";

  //-------------------------------------------------- Геттеры ---------------------------------------------------------

  /** Корень списка объектов */
  private get $offersList_root(): WebdriverIO.Element {
    return browser.$(`//div[contains(@class, 'OfferList_root')]`);
  }
  /** Лоадер */
  private get $loader(): WebdriverIO.Element {
    return this.$offersList_content.$(`.//div[contains(@class, 'Spinner_root')]`);
  }
  /** Хэдер списка объектов */
  get $offersList_header(): WebdriverIO.Element {
    return this.$offersList_root.$(`.//div[contains(@class, 'OfferList_header')]`);
  }
  /** Выпадашка с количеством элементов на странице */
  get $elements_on_page(): WebdriverIO.Element {
    return this.$offersList_root.$(
      `.//div[contains(@class, "ant-col")]//div[@role="combobox" and contains(@class, "ant-select")]`
    );
  }
  /** Выпадашка с выбором отображаемых колонок на странице */
  get $select_columns(): WebdriverIO.Element {
    return this.$offersList_root.$(
      `.//button[contains(@class, "OfferListTable_selectFieldsDropDown")]`
    );
  }
  /** Контент у списка объектов */
  get $offersList_content(): WebdriverIO.Element {
    return this.$offersList_root.$(`.//div[contains(@class, 'OfferList_content')]`);
  }
  /** Список объектов */
  get $offersList_list(): WebdriverIO.Element {
    return this.$offersList_content.$(`.//div[contains(@class, 'OfferList_list')]`);
  }
  /** Кнопка "Показать списком" */
  get $offerList_button(): WebdriverIO.Element {
    return this.$offersList_header.$(`.//i[@title='Показать списком']`);
  }
  /** Таблица со списком объектов */
  get $offersListTable(): WebdriverIO.Element {
    return this.$offersList_content.$(`.//div[contains(@class, 'OfferListTable_tableContainer')]`);
  }
  /** Все строки в таблице */
  get $$table_rows(): WebdriverIO.Element[] {
    return this.$offersListTable.$$(`.//tbody/a`);
  }

  private get $offerListLoader() {
    return this.$offersList_content.$(`.//div[contains(@class,'Spinner_root')]`);
  }

  //---------------------------------------------------- Методы --------------------------------------------------------

  /** Показать списком */
  showAsList() {
    let target = this.$offerList_button;
    target.click();
    debugLogging(`Нажатие кнопки "Показать списком"`);
    browser.waitUntil(() => target.getAttribute(`class`).match(`OfferList_active`) !== null, {
      timeout: 20000,
      timeoutMsg: `Объекты НЕ отображаются списком`,
    });
    this.$offersListTable.waitForDisplayed({
      timeoutMsg: `После нажатия кнопки "Показать списком" таблица с объектами не прогрузилась`,
    });
    debugLogging(`Объекты отобразились списком`);
  }

  /** Добавить аналоги в расчетник.
   *
   * @param count_analogs - Количество аналогов, которые нужно добавить
   */
  addToCalculation(count_analogs: number) {
    debugLogging(`Добавить в расчетник ${count_analogs} аналога`);
    // index_row с 2, т.к. первая строка это заголовок таблицы
    for (let index_row = 2; index_row < count_analogs + 2; index_row++) {
      let target = this.$offersListTable.$(
        `.//tbody/a[contains(@class, "OfferListTable_tr")][${index_row}]//i[@title="Добавить в расчет"]`
      );
      target.waitForClickable({
        timeoutMsg: `Для аналога №${index_row - 1} кнопка "Добавить в расчет" не кликабельна`,
      });
      target.click();
      debugLogging(`Нажатие кнопки "Добавить в расчет" для аналога №${index_row - 1}`);
      browser.waitUntil(() => target.getAttribute(`class`).match(`ActionPanel_active`) !== null, {
        timeoutMsg: `Для аналога №${index_row - 1} кнопка "Добавить в расчет" не нажалась`,
      });
      browser.waitUntil(
        () => {
          // count_rows - количество аналогов в таблице с Аналогами (из правой панели)
          let count_rows =
            baikalRightPanelBetaComparables.$offers_short_list_table.$$("tr").length - 1;
          return count_rows == index_row - 1;
        },
        {
          timeoutMsg: `После нажатия кнопки "Добавить в расчет" количество аналогов из таблицы "Аналоги" (из правой
          панели) не совпадает с ожидаемым.`,
        }
      );
      debugLogging(
        `После добавления аналога общее количество добавленных аналогов стало = ${index_row - 1}`
      );
    }
  }

  /** Перейти в карточку объекта
   *
   * @param analog_number - Номер аналога (строки), в карточку которой требуется перейти
   */
  goToOfferCard(analog_number: number) {
    debugLogging(`Количество объектов в таблице = ${this.$$table_rows.length}`);
    let target = this.$$table_rows[analog_number - 1].$(`./td[2]`);
    target.scrollIntoView();
    target.waitForClickable({
      timeoutMsg: `В списке аналогов аналог №${analog_number} не кликабелен`,
    });
    target.click();
    debugLogging(`В списке аналогов клик по аналогу №${analog_number}`);
  }

  /** Получить значение из таблицы с объектами
   *
   * @param row - Строка таблицы, из которой будет получено значение
   * @param name_field - Имя параметра из строки
   * */
  getTextFromTable(row: WebdriverIO.Element, name_field: BaikalEnumOffersClassNamesInTable) {
    let target: WebdriverIO.Element = row.$(`./td[@class="${name_field}"]`);

    // Для того, чтобы если в этом месте автотеста возникнет ошибка,
    // то на скрине в аллюре было видно ячейку таблицы
    target.scrollIntoView();
    return target.getText();
  }

  /** Выбрать количество элементов на странице
   *
   * @param n - количество элементов
   * */
  selectNumberOfElementsOnPage(n: BaikalEnumNumberElementsOnPage) {
    let target: WebdriverIO.Element = this.$elements_on_page;

    target.scrollIntoView({ inline: "start" });
    target.waitForClickable({
      timeoutMsg: `Выпадающее меню с количеством элементов не кликабельно!`,
    });
    target.click();
    debugLogging(`Клик по выпадающему меню с количеством элементов`);

    browser.waitUntil(
      () =>
        target
          .$(`./..`)
          .getAttribute("class")
          .match(/ant-select-focused/) !== null,
      { timeout: 10000, interval: 1000, timeoutMsg: `Выпадашка не раскрылась` }
    );

    let dropdown = browser.$(`//div[contains(@class, "ant-select-dropdown--single")]`); // Сама выпадашка
    dropdown.scrollIntoView();
    dropdown.waitForDisplayed({
      timeoutMsg: `Выпадающее меню "Выбрать колонки" должно было отобразиться на экране, но этого не произошло!`,
    });
    debugLogging(`Выпадающее меню с количеством элементов отобразилось на экране`);

    target = browser.$(
      `//li[@role='option' and contains(@class,'ant-select-dropdown-menu-item') and contains(text(),'${n}')]`
    );
    target.scrollIntoView({ inline: "start" });
    target.waitForClickable({
      timeoutMsg: `Вариант = ${n} из выпадающего меню не кликабелен!`,
    });
    target.click();
    debugLogging(`В выпадающем меню "Выбрать колонки" кликнули по значению = ${n}`);

    let selected_value = parseInt(
      this.$elements_on_page
        .$(`.//div[contains(@class, "ant-select-selection-selected-value")]`)
        .getText()
    );
    browser.waitUntil(() => selected_value == n, {
      timeoutMsg: `Выбранное значение выпадающего меню "Выбрать колонки" должно быть = ${n}.
        Но сейчас выбрано значение = ${selected_value}`,
    });

    // if (!(this.$$table_rows.length < n)) this.offerListContentUpdate();
  }

  /** Выбрать колонки на странице */
  selectColumns(columns: BaikalEnumColumnsInOffersList[]) {
    let target: WebdriverIO.Element = this.$select_columns;

    target.scrollIntoView({ inline: "start" });
    target.waitForClickable({
      timeoutMsg: `Выпадашка "Выбрать колонки" не кликабельна`,
    });
    target.click();
    debugLogging(`Клик по выпадающему меню "Выбрать колонки"`);

    browser.waitUntil(() => target.getAttribute(`class`).match(`ant-dropdown-open`) != null, {
      timeoutMsg: `После клика по выпадающему меню "Выбрать колонки" выпадашка не раскрылась!`,
    });

    let dropdown = browser.$(`//div[@data-rbd-droppable-id="fieldsSelectorList"]`); // Сама выпадашка
    dropdown.waitForDisplayed({
      timeoutMsg: `Выпадающее меню "Выбрать колонки" должно было отобразиться на экране, но этого не произошло!`,
    });
    debugLogging(`Выпадающее меню "Выбрать колонки" отобразилось на экране`);

    for (let column of columns) {
      let new_target = dropdown.$(`.//div[@data-rbd-draggable-id="${column}"]`); // Куда нужно тыкнуть в выпадающем меню
      new_target.scrollIntoView();
      new_target.waitForClickable({
        timeoutMsg: `Вариант ${column} из выпадающего меню не кликабелен!`,
      });
      new_target.click();
      debugLogging(`В выпадающем меню "Выбрать колонки" кликнули по значению = ${new_target}`);
    }

    target.click();
    debugLogging(`Клик по выпадающему меню "Выбрать колонки"`);
    browser.waitUntil(() => target.getAttribute(`class`).match(`ant-dropdown-open`) == null, {
      timeoutMsg: `После повторного клика по выпадающему меню "Выбрать колонки" выпадашка должна была закрыться!`,
    });
    debugLogging(`Выпадающее меню "Выбрать колонки" закрылось`);
  }

  private offerListContentUpdate() {
    const loader = this.$offerListLoader;
    loader.waitForExist();
    loader.waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `Индикатор загрузки списка объектов не появился`,
    });
    loader.waitForDisplayed({
      reverse: true,
      timeoutMsg: `Список объектов слишком долго обновляется.`,
    });
  }
  waitForLoad() {
    this.$offersList_root.waitForDisplayed({
      timeoutMsg: `Страница ${this.path} не прогрузилась! Конкретно элемент ${this.$offersList_root} не отображается на экране`,
    });
    this.$offersList_content.waitForDisplayed({
      timeoutMsg: `Страница ${this.path} не прогрузилась! Конкретно элемент ${this.$offersList_content} не отображается на экране`,
    });
    this.$offersListTable.waitForDisplayed({
      timeoutMsg: `Страница ${this.path} не прогрузилась! Конкретно элемент ${this.$offersListTable} не отображается на экране`,
    });
    debugLogging(`Страница ${this.path} прогрузилась`);
  }
}

/** Раздел "Список объектов" */
export const baikalOffersBeta = new BaikalOffers();

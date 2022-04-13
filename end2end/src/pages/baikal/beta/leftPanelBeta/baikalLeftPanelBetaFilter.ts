import { BaikalLeftPanelBetaBase } from "./baikalLeftPanelBetaBase";
import {
  BaikalEnumExternalSources,
  BaikalEnumFilterFields,
  EnumKeyboardButtons,
} from "../../enums";
import { debugLogging } from "modules";

/** Класс описывает раздел "Фильтр" из левой панели */
export class BaikalLeftPanelBetaFilter extends BaikalLeftPanelBetaBase {
  /** Корневой элемент раздела "Фильтр" */
  get $filter_content(): WebdriverIO.Element {
    return this.$left_panel.$(`.//div[contains(@class, 'Filter_content')]`);
  }
  /** Корневой элемент подраздела с доп. источниками */
  get $externalSources(): WebdriverIO.Element {
    return this.$filter_content.$(`.//div[contains(@class, 'ExternalSources_root')]`);
  }
  /** Раздел "Дата" */
  private get $date(): WebdriverIO.Element {
    return this.$filter_content.$(`.//div[contains(@class, 'Filter_presetDateRow')]`);
  }
  /** Кнопка "Расширенный режим" */
  private get $advanced_mode(): WebdriverIO.Element {
    return this.$date.$(`.//button[contains(@class, 'Filter_presetDateButton')]`);
  }
  /** Кнопка "Очистить поле" */
  private get $clearData(): WebdriverIO.Element {
    return this.$date.$(`.//button[@title="Очистить поле"]`);
  }
  /** Компоненты "Последний раз замечано" в расширенном режиме */
  private get $last_seen(): WebdriverIO.Element {
    return this.$date.$$(`.//div[contains(@class, 'Filter_fromToRow')]`)[0];
  }
  /** Компонент "Опубликовано" в расширенном режиме */
  private get $published(): WebdriverIO.Element {
    return this.$date.$$(`.//div[contains(@class, 'Filter_fromToRow')]`)[1];
  }
  /** Начальная дата */
  private get $start_date(): WebdriverIO.Element {
    return this.$date.$(`.//input[@placeholder='Начальная дата']`);
  }
  /** Конечная дата */
  private get $end_date(): WebdriverIO.Element {
    return this.$date.$(`.//input[@placeholder='Конечная дата']`);
  }
  /** Панель с календарем */
  private get $calendar_panel(): WebdriverIO.Element {
    return browser.$(`//div[@class='ant-calendar-panel']`);
  }
  /** Начальная дата в панели календаря */
  private get $start_date_in_calendar(): WebdriverIO.Element {
    return this.$calendar_panel.$(
      `.//input[@placeholder='Начальная дата' and contains(@class, "ant-calendar-input ")]`
    );
  }
  /** Конечная дата в панели календаря */
  private get $end_date_in_calendar(): WebdriverIO.Element {
    return this.$calendar_panel.$(
      `.//input[@placeholder='Конечная дата' and contains(@class, "ant-calendar-input ")]`
    );
  }

  //---------------------------------------------------- Методы --------------------------------------------------------

  /** Нажать на кнопку сайта из внешних источников */
  goToExternalSource(source: BaikalEnumExternalSources) {
    let target: WebdriverIO.Element = this.$externalSources.$(
      `./a/button[contains(text(), ("${source}"))]`
    );
    target.waitForClickable({
      timeoutMsg: `Кнопка с внешним источником = ${source} не кликабельна!`,
    });
    debugLogging(`Нажатие на кнопку с внешним источником = ${source} в фильтре Байкала`);
    target.click();
  }

  /** Перейти в расширенный режим */
  goToAdvanceMode() {
    let target: WebdriverIO.Element = this.$advanced_mode;
    target.scrollIntoView();
    target.waitForClickable({
      timeoutMsg: `Кнопка "Расширенный режим" не кликабельна`,
    });
    browser.pause(1000); // Кнопка "Расширенный режим не всегда "кликается" поэтому здесь костыль с паузой в 1 сек
    target.click();
    browser.waitUntil(
      () => target.getAttribute(`ant-click-animating-without-extra-node`).match(`true`) !== null,
      {
        timeoutMsg: `После клика по кнопке "Расширенный режим" расширенный режим всё равно не открылся.`,
      }
    );
    debugLogging(`Перешел в "Расширенный режим" фильтра по дате`);
    browser.waitUntil(() => this.$last_seen.isDisplayed(), {
      timeoutMsg: `Компонент "Последний раз замечано" в расширенном режиме не отображается на странице`,
    });
    browser.waitUntil(() => this.$published.isDisplayed(), {
      timeoutMsg: `Компонент "Опубликовано" в расширенном режиме не отображается на странице`,
    });
    this.$start_date.waitForClickable({
      timeoutMsg: `Поле для ввода начальной даты не кликабельно`,
    });
  }

  /** Установить дату */
  setData(start_date: string, end_date: string) {
    this.$clearData.waitForClickable({
      timeoutMsg: `Поле "Очистить поле" не кликабельно`,
    });
    this.$clearData.click();
    debugLogging(`Нажал по кнопке "Очистить поле"`);
    this.$start_date.waitForClickable({
      timeoutMsg: `Поле "Начальная дата" не кликабельно`,
    });
    this.$start_date.click();
    debugLogging(`Кликнул по полю "Начальная дата"`);
    if (this.$start_date_in_calendar.getValue().length !== 0) {
      throw new Error(`Поле "Начальная дата" должно быть пустое. Но сейчас оно не пустое.
      Значение внутри поля = ${this.$start_date_in_calendar.getValue()}`);
    }
    this.$start_date_in_calendar.setValue(start_date);
    debugLogging(`Установил новую начальную дату = ${start_date}`);
    browser.keys(EnumKeyboardButtons.ENTER);
    debugLogging(`После установки начальной даты нажал Enter`);
    this.$end_date.waitForClickable({
      timeoutMsg: `Поле "Конечная дата" не кликабельно`,
    });
    this.$end_date.click();
    debugLogging(`Кликнул по полю "Конечная дата"`);
    this.$end_date_in_calendar.setValue(end_date);
    debugLogging(`Установил новую конечную дату = ${end_date}`);
    browser.keys(EnumKeyboardButtons.ENTER);
    debugLogging(`После установки конечной даты нажал Enter`);
  }

  /** Сбросить дату */
  resetData() {
    this.$clearData.waitForClickable({
      timeoutMsg: `Поле "Очистить поле" не кликабельно`,
    });
    this.$clearData.click();
    debugLogging(`Нажал по кнопке "Очистить поле"`);

    if (this.$start_date.getValue().length !== 0) {
      throw new Error(`Поле "Начальная дата" должно быть пустое. Но сейчас оно не пустое.
      Значение внутри поля = ${this.$start_date.getValue()}`);
    }
  }

  /** Селектор для инпутов полей, в которых указывается начальное значение
   *
   * @param name_field Имя поля для которого введется начальное значение "От"
   * */

  anyFromField(name_field: BaikalEnumFilterFields) {
    return this.$filter_content.$(`.//span[contains(@class, "${name_field}_from")]/input`);
  }

  /** Селектор для инпутов полей, в которых указывается конечное значение
   *
   * @param name_field Имя поля для которого введется конечное значение "До"
   * */
  anyToField(name_field: BaikalEnumFilterFields) {
    return this.$filter_content.$(`.//span[contains(@class, "${name_field}_to")]/input`);
  }

  /** Установить начальное и конечное значение в поле в фильтре Байкала
   *
   * @param name_field Имя поля для которого будут введены начальное и конечное значение
   * @param from_value Начальное значение "От"
   * @param to_value Конечное значение "До"
   * */
  setValueInField(name_field: BaikalEnumFilterFields, from_value: string, to_value: string) {
    this.anyFromField(name_field).waitForClickable({
      timeoutMsg: `Поле "От" = ${name_field} не кликабельно!`,
    });
    this.anyFromField(name_field).scrollIntoView();
    this.anyFromField(name_field).click();
    this.anyFromField(name_field).setValue(from_value);
    let valueFromField = this.anyFromField(name_field).getValue();
    browser.waitUntil(() => valueFromField == from_value, {
      timeoutMsg: `В поле ${name_field} "От" ожидалось значение = ${from_value},
      а по итогу там оказалось значение = ${valueFromField}`,
    });
    debugLogging(`В поле ${name_field} "От" засетили значение = ${from_value}`);

    this.anyToField(name_field).waitForClickable({
      timeoutMsg: `Поле = "До" ${name_field} не кликабельно!`,
    });
    this.anyToField(name_field).scrollIntoView();
    this.anyToField(name_field).click();
    this.anyToField(name_field).setValue(to_value);
    let valueToField = this.anyToField(name_field).getValue();
    browser.waitUntil(() => valueToField == to_value, {
      timeoutMsg: `В поле ${name_field} "До" ожидалось значение = ${to_value},
      а по итогу там оказалось значение = ${valueToField}`,
    });
    debugLogging(`В поле ${name_field} "До" засетили значение = ${to_value}`);
  }

  waitForLoad() {
    this.$filter_content.waitForExist({
      timeoutMsg: `Компонент "Фильтр" из левой панели отсутствует в DOM`,
    });
    this.$filter_content.waitForDisplayed({ timeoutMsg: `Компонент "Фильтр" не отрисовался` });
    debugLogging(`Фильтр из левой панели открылся`);
  }
}

export const baikalLeftPanelBetaFilter = new BaikalLeftPanelBetaFilter();

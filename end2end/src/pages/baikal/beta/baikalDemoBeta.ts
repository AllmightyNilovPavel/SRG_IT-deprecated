import { baikalMap } from "../index";
import { BaikalEnumDemoModeHousingType } from "../enums";
import { baikalHeaderBeta } from "../beta/index";
import { options } from "../../../options";
import { debugLogging } from "modules";

export class BaikalDemoBeta {
  path = "/demo";

  //---------------------------------------------- Геттеры -------------------------------------------------------------

  /** Кнопка "Перейти к поиску аналогов" */
  get $button_search() {
    return browser.$(`//button[@type="submit"]`);
  }

  /** Поле для ввода адреса */
  get $address_field() {
    return browser.$(`//input[contains(@class, 'BaikalDemo_address')]`);
  }

  /** Выбрать тип недвижимости */
  get $select_type_field() {
    return browser.$(`//div[contains(@class, 'BaikalDemo_select')]`);
  }

  get $button_beta() {
    return browser.$(`//div[contains(@title, "Перейти на бету")]`);
  }

  //---------------------------------------------- Методы --------------------------------------------------------------

  search_for_realty(address: string, realtyType: BaikalEnumDemoModeHousingType) {
    this.$address_field.waitForClickable({
      timeoutMsg: `Поле "Адрес" не кликабельно`,
    });
    this.$address_field.click();
    debugLogging(`Клик по полю "Адрес"`);
    this.$address_field.setValue(address);
    browser.waitUntil(() => this.$address_field.getValue() === address, {
      timeoutMsg: `В поле "Адрес" не засетилось значение. Должно было быть значение = ${address}.
        А по факту ${this.$address_field.getValue()}`,
    });
    debugLogging(`В поле "Адрес" засетилось значение = ${address}`);
    this.$select_type_field.waitForClickable({
      timeoutMsg: `Выпадающее меню "Тип" не кликабельно`,
    });
    this.$select_type_field.click();
    debugLogging(`Клик по выпадающему меню "Тип"`);
    browser.waitUntil(
      () =>
        this.$select_type_field
          .$(`./div[contains(@class, 'ant-select')]`)
          .getAttribute(`class`)
          .match(`ant-select-open`) !== null,
      {
        timeoutMsg: `После нажатия по выпадающему меню "Тип" выпадающее меню не раскрылось`,
      }
    );
    debugLogging(`Открылось выпадающее меню "Тип"`);

    let target: WebdriverIO.Element = browser.$(`//li[contains(text(), "${realtyType}")]`);
    target.waitForExist();
    target.scrollIntoView();
    target.waitForClickable({
      timeoutMsg: `Тип недвижимости ${realtyType} не кликабельный`,
    });
    target.click();
    debugLogging(`Клик по типу недвижимости ${realtyType}`);

    browser.waitUntil(
      () =>
        this.$select_type_field
          .$(`.//div[contains(@class, 'ant-select-selection-selected-value')]`)
          .getText() === realtyType,
      {
        interval: 1000,
        timeoutMsg: `Выбранный тип недвижимости должен быть = ${realtyType}.
        А по факту выбралось значение = ${this.$select_type_field
          .$(`.//div[contains(@class, 'ant-select-selection-selected-value')]`)
          .getText()}`,
      }
    );
    debugLogging(`В поле "Тип" засетилось значение = ${realtyType}`);
    this.$button_search.waitForClickable({
      timeoutMsg: `Кнопка "Перейти к поиску аналогов" не кликабельна`,
    });
    this.$button_search.click();
    debugLogging(`Клик по кнопке "Перейти к поиску аналогов"`);
    baikalMap.waitForLoad();
    debugLogging(`Карта Байкала открылась`);
  }

  openBeta() {
    debugLogging(`Ждем появления кнопки для перехода в Байкал-beta`);
    this.$button_beta.waitForClickable({
      timeoutMsg: `Кнопка для перехода в Байкал-beta не кликабельна`,
    });
    debugLogging(`Клик по кнопке "beta"`);
    this.$button_beta.click();
    debugLogging(`Перехожу в Байкал-beta`);
  }

  open() {
    browser.url(options.Baikal.host + this.path);
    debugLogging(`Переход по урл ${browser.getUrl()}`);
  }

  waitForLoad(username: string) {
    debugLogging("Ожидание загрузки страницы с /demo режимом");
    baikalHeaderBeta.$user_name.waitForDisplayed({
      timeoutMsg: `Логин пользователя не отображается в Header'e Байкала`,
    });
    browser.waitUntil(() => baikalHeaderBeta.$user_name.getText() === username, {
      timeoutMsg: `В header'e Байкала имя пользователя не совпадает с тем, под которым происходил логин в Байкал.
        Ожидаемое имя пользователя = ${username}. Имя пользователя по факту = ${baikalHeaderBeta.$user_name.getText()}`,
    });
    this.$button_search.waitForClickable({
      timeoutMsg: `Страница с /demo режимом не прогрузилась!`,
    });
    debugLogging(`Страница с /demo режимом успешно прогрузилась`);
  }
}
/** Демо-мод Байкала */
export const baikalDemoBeta = new BaikalDemoBeta();

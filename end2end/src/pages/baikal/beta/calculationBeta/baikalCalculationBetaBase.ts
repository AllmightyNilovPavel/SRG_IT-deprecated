import { debugLogging } from "modules";
import { BaikalEnumCalculationLeftMenu, BaikalEnumAddToCalculation } from "../../enums";

/** Класс описывает общие элементы и методы для раздела "Расчетник" */
export class BaikalCalculationBetaBase {
  path = "/baikal/calculations";

  //---------------------------------------------- Геттеры -------------------------------------------------------------

  /** Грубо говоря header расчетника */
  protected get $calculationMenu(): WebdriverIO.Element {
    return browser.$(`//div[contains(@class, 'Calculation_menu_')]`);
  }
  protected get $calculationWrap(): WebdriverIO.Element {
    return browser.$(`//div[@id=0]`);
  }
  /** Правая панель меню в расчетнике */
  protected get $calculationMenuRight(): WebdriverIO.Element {
    return this.$calculationMenu.$(`.//div[contains(@class, 'Calculation_menuRight')]`);
  }
  /** Кнопка "Добавить в расчет" */
  protected get $addToCalculation(): WebdriverIO.Element {
    return this.$calculationMenuRight.$(`.//i[@title="Добавить в расчет"]`);
  }
  /** Элемент, который меняет свои классы при открытии выпадающего меню "Добавить в расчет" */
  protected get $cascader(): WebdriverIO.Element {
    return browser.$(`//div[contains(@class, 'ant-cascader-menus')]`);
  }
  protected get $loader() {
    return this.$calculationMenuRight.$(`./div[contains(@class,'Calculation_loadMessage')]`);
  }

  //--------------------------------------------- Методы --------------------------------------------------------------

  goToSection(section: BaikalEnumCalculationLeftMenu) {
    let target = this.$calculationMenu.$(`.//div[contains(@id, "tab:${section}")]`);
    target.waitForClickable({
      timeoutMsg: `После перехода в расчетник раздел ${section} не кликабельный.`,
    });
    target.click();
    browser.waitUntil(() => target.getAttribute(`class`).match(`ant-menu-item-selected`) !== null, {
      interval: 1000,
      timeout: 20000,
      timeoutMsg: `В расчетнике не произошел переход в раздел ${section}.`,
    });
    debugLogging(`Кликнул раздел ${section} в расчетнике Байкала`);
  }

  /** Возвращает селектор раздела в расчетнике */
  section(section: BaikalEnumCalculationLeftMenu) {
    return this.$calculationMenu.$(`.//div[contains(@id, "tab:${section}")]`);
  }

  /** Добавление нового пустого аналога в расчетнике Байкала
   * @param housing_type - Тип добавляемого жилья
   * */
  addNewAnalogToCalculation(housing_type: BaikalEnumAddToCalculation) {
    this.$addToCalculation.waitForClickable({
      timeoutMsg: `Кнопка добавления нового аналога в расчетник не кликабельна`,
    });
    this.$addToCalculation.click();
    debugLogging(`Нажатие по кнопке "Добавить в расчет"`);
    browser.waitUntil(
      () => this.$cascader.getAttribute(`class`).match(`ant-cascader-menus-hidden`) == null,
      {
        interval: 1000,
        timeout: 10000,
        timeoutMsg: `После клика по кнопке "Добавить в расчет" в элементе $cascader не пропал класс ant-cascader-menus-hidden`,
      }
    );
    let target: WebdriverIO.Element = this.$cascader.$(`.//li[@title="${housing_type}"]`);
    target.waitForDisplayed({
      timeout: 10000,
      timeoutMsg: `После клика по кнопке "Добавить в расчет" не открылось выпадающее меню`,
    });
    target.waitForClickable({
      timeout: 10000,
      timeoutMsg: `В выпадающем меню вариант "Вторичное жилье" не кликабелен`,
    });
    target.click();
    debugLogging(`В выпадающем меню нажатие по кнопке ${housing_type}`);
    this.waitForLoad();
  }

  waitForLoad(section: BaikalEnumCalculationLeftMenu = BaikalEnumCalculationLeftMenu.CALCULATION) {
    this.$calculationWrap.waitForDisplayed({
      timeout: 60000,
      timeoutMsg: `Расчетник не прогрузился`,
    });
    this.$calculationMenu.$(`.//div[contains(@id, "tab:${section}")]`).waitForDisplayed({
      timeout: 60000,
      timeoutMsg: `Расчетник не прогрузился`,
    });
    debugLogging(`Раздел ${section} из расчетника Байкала прогрузился`);
  }
}

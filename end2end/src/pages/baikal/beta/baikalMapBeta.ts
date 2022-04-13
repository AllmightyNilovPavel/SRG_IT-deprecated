import { baikalOffersBeta } from "./baikalOffersBeta";
import { EnumKeyboardButtons } from "../../../shared/enums/enum.keyboardButtons";
import { debugLogging } from "modules";

class BaikalMap {
  path = "/baikal/map";

  //---------------------------------------------------- Геттеры -------------------------------------------------------

  get $maps() {
    return browser.$(`ymaps`);
  }

  private get $center_block(): WebdriverIO.Element {
    return browser.$(`//div[contains(@class, 'CenterBlock_root')]`);
  }

  private get $search_control(): WebdriverIO.Element {
    return this.$center_block.$(`.//div[contains(@class, 'OffersMap_searchControl')]`);
  }

  get $search_field(): WebdriverIO.Element {
    return this.$search_control.$(`.//input[contains(@class, 'ant-input-lg')]`);
  }

  get $suggest_dropdown(): WebdriverIO.Element {
    return browser.$(`//ul[contains(@class, 'ant-select-dropdown-menu-root')]`);
  }

  get $header() {
    return browser.$(`div[class*=CoreLayout_header]`);
  }

  get $right_panel() {
    return $(`div[class*=Panel_right]`);
  }

  get $offers_short_list() {
    return this.$right_panel.$(`div[class*=OfferShortList]`);
  }

  get $offers_short_list_table() {
    return this.$offers_short_list.$(`div[class*=tableContent] tbody`);
  }

  //-------------------------------------------------- Методы ----------------------------------------------------------

  goToOffers() {
    this.$header.$(`a[href*=offers]`).click();
    baikalOffersBeta.waitForLoad();
  }

  search(search_query: string) {
    this.$search_field.waitForClickable({
      timeout: 10000,
      timeoutMsg: `Поле поиска не кликабельно`,
    });
    this.$search_field.setValue(search_query);
    browser.waitUntil(() => this.$search_field.getValue() === search_query, {
      interval: 1000,
      timeout: 20000,
      timeoutMsg: `В поле поиска значение должно быть = ${search_query}.
        Но по факту там значение = ${this.$search_field.getValue()}`,
    });
    debugLogging(`В поле поиска засетили значение = ${search_query}`);
    browser.keys(EnumKeyboardButtons.ENTER);
    debugLogging(`Нажатие клавиши Enter для выполнения поиска`);
  }

  waitForLoad() {
    this.$maps.waitForDisplayed({
      timeoutMsg: `Раздел с картой не прогрузился`,
    });
    debugLogging(`Раздел "Карта" прогрузился`);
  }
}

export const baikalMapBeta = new BaikalMap();

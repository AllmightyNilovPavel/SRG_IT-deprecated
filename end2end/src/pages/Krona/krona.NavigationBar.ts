import { debugLogging } from "modules";
import {
  KronaNavigationButtons,
  KronaNavigationButtonsPrimary,
  SettingsKronaNavigationButtons,
  KronaNavigationButtonsAdvanced,
  UserListKronaNavigationButtons,
} from "./Enums";
import { kronaFooter } from "./krona.Footer";

class KronaNavigationBar {
  /** Основной блок меню */
  private get $topMenuOld() {
    return $(`body > div.menu`);
  }
  private get $topMenu(): WebdriverIO.Element {
    return $(`div.header_menu#header_menu`);
  }
  private get $block_advActions() {
    return this.$topMenu.$(`div[class*="rightMenu"]`);
  }
  /** кнопка "выход" */
  private get $button_logout() {
    return this.$block_advActions.$("#logout");
  }
  private get $icon_user() {
    return this.$block_advActions.$(`#user_list`);
  }
  private get $icon_settings() {
    return this.$block_advActions.$(`#settings`);
  }
  private get $icon_statistics() {
    return this.$block_advActions.$(`#statistic`);
  }
  private get $modal_browserInform(): WebdriverIO.Element {
    return $(`#decisionForm`);
  }
  private get $button_browserInformClose(): WebdriverIO.Element {
    return $(`#getMassage`);
  }
  // -------------------------------------------------------------------------------
  //                                    Функции
  // -------------------------------------------------------------------------------

  waitForLoad(): void {
    kronaFooter.waitForLoad();
    debugLogging("Ждём загрузку блока навигации");

    browser.waitUntil(() => this.$topMenu.isDisplayed() || this.$topMenuOld.isDisplayed(), {
      timeout: 20000,
      timeoutMsg: "Хэдер КРОНЫ не загрузился! (не старый, не новый)",
      interval: 3,
    });

    // Если иконка юзера не отображается на экране в НОВОМ меню КРОНЫ, то пробуем обновить страницу
    let refresh_counter = 3;
    while (
      this.$icon_user.isExisting() == false &&
      this.$topMenu.isDisplayed() &&
      refresh_counter > 0
    ) {
      debugLogging(`Иконка юзера не отображается на экране.
      Обновляем страницу в надежде того, что реакт менюшка прогрузится.
      Осталось попыток = ${refresh_counter}`);
      browser.refresh();
      refresh_counter = refresh_counter - 1;
      this.waitForLoad();
    }
    if (this.$icon_user.isExisting() == false) {
      throw new Error(
        `Иконка юзера не отображается на экране. Скорее всего не отрендерилось новое меню КРОНЫ!`
      );
    }

    // Если загрузилось новое меню и иконка юзера
    if (this.$topMenu.isExisting()) {
      debugLogging("Блок навигации загрузился в новом меню.");
      // this.$icon_user.waitForExist();
      if (this.$modal_browserInform.isDisplayed()) this.$button_browserInformClose.click();
      // this.$icon_user.waitForClickable();
    }
    // Если загрузилось старое меню
    else {
      debugLogging("Блок навигации требует перехода в новое меню.");
      kronaFooter.$button_switchToNewMenu.scrollIntoView();
      kronaFooter.$button_switchToNewMenu.waitForClickable();
      kronaFooter.$button_switchToNewMenu.click();
      kronaFooter.$button_switchToOldMenu.waitForExist({
        timeout: 30000,
        timeoutMsg: `Кнопка перехода на старое меню должна была пропасть с экрана!`,
        reverse: false,
      });
      this.waitForLoad();
    }
  }
  /** Функция выхода */
  logout() {
    this.$block_advActions.waitForExist();
    this.$block_advActions.waitForDisplayed();
    this.$block_advActions.scrollIntoView();
    this.$icon_user.waitForClickable();
    this.$icon_user.click();
    this.$button_logout.waitForDisplayed({
      timeoutMsg: `Кнопка логаута из кроны не отображается на странице`,
    });
    this.$button_logout.click();
    debugLogging(`Сделал логаут из КРОНЫ`);
  }
  /**
   * Фукнция перехода по кнопкам основного (верхнего меню)
   *
   * @param button - кнопка на которую надо перейти (`KronaNavigationButtons`)
   */
  navigate_to(button: KronaNavigationButtons) {
    let target: WebdriverIO.Element;
    debugLogging(`В КРОНЕ кликаю на кнопку ${button}`);
    if (KronaNavigationButtonsPrimary.has(button)) return this.$topMenu.$(`${button}`).click();
    else if (KronaNavigationButtonsAdvanced.has(button)) {
      switch (button) {
        case KronaNavigationButtons.REPORTS_NEW:
          target = this.$topMenu.$(`${KronaNavigationButtons.REGISTRY_REPORTS}`);
          target.waitForClickable();
          target.scrollIntoView();
          target.click();
          break;
        case KronaNavigationButtons.REPORTS_OLD:
          target = this.$topMenu.$(`${KronaNavigationButtons.REGISTRY_REPORTS}`);
          target.waitForClickable();
          target.scrollIntoView();
          target.click();
          break;
        case KronaNavigationButtons.REQUESTS_NEW:
          target = this.$topMenu.$(`${KronaNavigationButtons.REGISTRY_REQUESTS}`);
          target.waitForClickable();
          target.scrollIntoView();
          target.click();
          break;
        case KronaNavigationButtons.REQUESTS_OLD:
          target = this.$topMenu.$(`${KronaNavigationButtons.REGISTRY_REQUESTS}`);
          target.waitForClickable();
          target.scrollIntoView();
          target.click();
          break;
        case KronaNavigationButtons.FA_ORDERS_NEW:
          target = this.$topMenu.$(`${KronaNavigationButtons.REGISTRY_FEDERAL_APPRAISER}`);
          target.waitForClickable();
          target.scrollIntoView();
          target.click();
          break;
        case KronaNavigationButtons.FA_ORDERS_OLD:
          target = this.$topMenu.$(`${KronaNavigationButtons.REGISTRY_FEDERAL_APPRAISER}`);
          target.waitForClickable();
          target.scrollIntoView();
          target.click();
          break;
        case KronaNavigationButtons.FA_ORDERS_PUBLIC_NEW:
          target = this.$topMenu.$(`${KronaNavigationButtons.REGISTRY_FEDERAL_APPRAISER_PUBLIC}`);
          target.waitForClickable();
          target.scrollIntoView();
          target.click();
          break;
        case KronaNavigationButtons.FA_ORDERS_PUBLIC_OLD:
          target = this.$topMenu.$(`${KronaNavigationButtons.REGISTRY_FEDERAL_APPRAISER_PUBLIC}`);
          target.waitForClickable();
          target.scrollIntoView();
          target.click();
          break;
        case KronaNavigationButtons.COMMERCIAL_REPORTS:
          target = this.$topMenu.$(`${KronaNavigationButtons.COMMERCIAL_REALTY}`);
          target.waitForClickable();
          target.scrollIntoView();
          target.click();
          break;
        case KronaNavigationButtons.ORDERS_DPA_NEW:
          this.$topMenu.$(`${button}`).click();
          target = $(`${KronaNavigationButtons.ORDERS_DPA_NEW_CREATE_RESIDENTIAL}`);
          target.waitForClickable();
          target.click();
          return;
        default:
          throw new Error(`В метод навигации не передана кнопка.`);
      }
      target = this.$topMenu.$(`${button}`);
      target.waitForClickable();
      target.click();
      return;
    } else if (SettingsKronaNavigationButtons.has(button)) {
      this.$icon_settings.click();
      this.$block_advActions.$(`${button}`).waitForDisplayed({});
      return this.$block_advActions.$(`${button}`).click();
    } else if (UserListKronaNavigationButtons.has(button)) {
      this.$icon_user.click();
      this.$block_advActions.$(`${button}`).waitForDisplayed({});
      return this.$block_advActions.$(`${button}`).click();
    }
  }
}
/** Верхнее меню с кнопками */
export const kronaNavigationBar = new KronaNavigationBar();

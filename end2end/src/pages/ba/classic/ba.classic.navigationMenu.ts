// import {BaNavMenuButtons} from "./enums";
import {
  BaNavigationButtons,
  BaNavigationButtonsOrders,
  BaNavigationButtonsPrimary,
  BaNavigationButtonsSecondary,
} from "./enums/ba.enum.navigationMenu.buttons";

class BaClassicNavigationMenu {
  private get $navMenu_root() {
    return browser.$(`#navbar`);
  }
  private get $navMenu_primary() {
    return this.$navMenu_root.$(`div.navbar-inner > ul.nav`);
  }
  private get $navMenu_secondary() {
    return this.$navMenu_root.$(`div[class*="menu2"]`);
  }
  get $input_reportSearch() {
    return $(`input[placeholder="Поиск…"]`);
  }
  get $reportSearch_loader() {
    return this.$navMenu_primary.$(`#search-loader`);
  }
  get $reportSearch_result() {
    return $(`a.tt-link`);
  }
  // ---------------------- xPath --------------------------------
  private get $root() {
    return $(`//*[@id='navbar']`);
  }

  private get $reportsList() {
    return this.$root.$(`//a[contains(text(),'Список отчетов')]`);
  }
  private get $ordersList() {
    // return this.$root.$(`//a[contains(text(),'Список заказов')]`);
    return $(`li.dropdown[data-bind="visible: ordersMenuVisible"]`);
  }
  private get $summaryList() {
    return this.$root.$(`//a[contains(text(),'Список отчетов')]`);
  }
  // ------------------------------------------------------
  waitForEnabled() {
    this.$navMenu_root.waitForExist();
    this.$navMenu_root.scrollIntoView();
    this.$input_reportSearch.waitForClickable();
  }
  /**
   * Поиск отчёта через строку поиска
   * и переход в этот отчёт если он один
   *
   * @param report_number - `точный` номер отчёта
   */
  search_report(report_number: string) {
    this.$input_reportSearch.scrollIntoView();
    this.$input_reportSearch.waitForClickable();
    this.$input_reportSearch.click();
    this.$input_reportSearch.setValue(report_number);
    this.$reportSearch_result.waitForDisplayed({ timeout: 5000 });
    this.$reportSearch_result.isClickable();
    this.$reportSearch_result.click();
  }
  navigateTo(button: BaNavigationButtons) {
    let target: WebdriverIO.Element;
    if (BaNavigationButtonsPrimary.has(button)) {
      target = this.$navMenu_primary.$(`a[href*="${button}"]`);

      target.scrollIntoView();
      target.waitForClickable();
      target.click();
    } else if (BaNavigationButtonsSecondary.has(button)) {
      target = this.$navMenu_secondary.$(`a[href*="${button}"]`);

      target.scrollIntoView();
      target.waitForClickable();
      target.click();
    } else if (BaNavigationButtonsOrders.has(button)) {
      target = this.$ordersList.$(`li[data-bind="visible: ${button}"]`);

      this.$ordersList.moveTo();
      target.waitForDisplayed({});
      target.click();
    } else throw new Error(`Нету кнопочки навигации ${button} на страничке ${browser.getUrl()}`);
  }
  // navigateToReports(button: BaNavMenuButtons) {
  //   this.$reportsList.moveTo();
  // }
}
/** БО. КЛАССИКА. Меню переходов */
export const baClassicNavMenu = new BaClassicNavigationMenu();

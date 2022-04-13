import {
  FA_RoomsType,
  FA_CreditAmount,
  FA_repairState,
  FA_specialOfferDialogButtons,
} from "../enum";

class ZalogOrder {
  private get $main() {
    return $(`div[class*=Main_regionBlock]`);
  }
  private get $order_region() {
    return this.$main.$(`div[class*="Order_row"][class*="Order_module"]`);
  }
  private get $order_street() {
    return this.$main.$(`div[class*="Order_row"][class*="Order_module"][class*="Order_street"]`);
  }
  /** `#credit` */
  get $button_newCredit() {
    return this.$main.$(`#credit`);
  }
  /** `#refinance` */
  get $button_refinance() {
    return this.$main.$(`label[for="refinance"]`);
  }
  get $refinance_buttonChecker() {
    return this.$main.$(`#refinance`);
  }
  /** `#title` */
  get $button_title() {
    return this.$main.$(`#title`);
  }
  /** `#apartment` */
  get $button_apartment() {
    return this.$main.$(`#apartment`);
  }
  /** `#countryside` */
  get $button_countryside() {
    return this.$main.$(`#countryside`);
  }
  // ------------------------ Тип Кредитования ------------------------------
  /** Элемент `label[for="individualCredit"]` */
  get $button_individualCredit() {
    return this.$main.$(`label[for="individualCredit"]`);
  }
  /** Элемент radioButton для проверки */
  get $individualCredit_buttonChecker() {
    return this.$main.$(`#individualCredit`);
  }
  /** Элемент `label[for="credit"]` */
  get $button_credit() {
    return this.$main.$(`label[for="credit"]`);
  }
  /** Элемент radioButton для проверки */
  get $credit_buttonChecker() {
    return this.$main.$(`#credit`);
  }
  /** `#smallBusiness` */
  get $button_smallBusiness() {
    return this.$main.$(`label[for="smallBusiness"]`);
  }
  get $smallBusiness_buttonChecker() {
    return this.$main.$(`#smallBusiness`);
  }
  // ------------------- Поля "Регион, Населённый пункт" -----------------------
  private get $autocomplete_root_region() {
    return this.$order_region.$(`div[class^="Autocomplete_root"]`);
  }
  /** `#regionSelect` */
  get $input_region() {
    return this.$autocomplete_root_region.$(`#regionSelect`);
  }
  private get $autocomplete_menu_region() {
    return this.$autocomplete_root_region.$(`div[class^="Autocomplete_menu"]`);
    // return this.$autocomplete_root.$(`div[class^="Autocomplete_open"]`)
  }
  private get $autocomplete_item_region() {
    return this.$autocomplete_menu_region.$(`div[class^="Autocomplete_item"]`);
  }
  // ------------------------- Поля "Улица, Дом" -------------------------------
  private get $autocomplete_root_street() {
    return this.$order_street.$(`div[class^="Autocomplete_root"]`);
  }
  /** `#streetSelect` */
  get $input_street() {
    return this.$main.$(`#streetSelect`);
  }
  private get $autocomplete_menu_street() {
    return this.$autocomplete_root_street.$(`div[class^="Autocomplete_menu"]`);
    // return this.$autocomplete_root.$(`div[class^="Autocomplete_open"]`)
  }
  private get $autocomplete_item_street() {
    return this.$autocomplete_menu_street.$(`div[class^="Autocomplete_item"]`);
  }
  // ---------------------------------------------------------------------------
  /** `#flatNumber` */
  get $input_flatNumber() {
    return this.$main.$(`#flatNumber`);
  }
  // ----------------------------------------------------------
  /** `#objectRooms` */
  get $selector_objectRooms() {
    return this.$main.$(`#objectRooms`);
  }
  private get $$objectRooms_values() {
    return this.$selector_objectRooms.$$(`div > div.item`);
  }
  // ----------------------------------------------------------
  /** `#objectFloorByUser` */
  get $input_floor() {
    return this.$main.$(`#objectFloorByUser`);
  }
  // ---------------- Ожидаемая сумма кредита -----------------
  /** `#creditAmountMore` */
  private get $button_creditAmountMore() {
    return this.$main.$(`label[for="creditAmountMore"]`);
  }
  get $creditAmmountMore_buttonChecker() {
    return this.$main.$(`#creditAmountMore`);
  }
  /** `#creditAmountLess` */
  private get $button_creditAmountLess() {
    return this.$main.$(`label[for="creditAmountLess"]`);
  }
  get $creditAmmountLess_buttonChecker() {
    return this.$main.$(`#creditAmountLess`);
  }
  get $input_contractBuySellPrice() {
    return this.$main.$(`#contractBuySellPrice`);
  }
  // ----------------------------------------------------------
  /** `label[for="ObjectWithoutRepairs"]` */
  private get $button_objectWithoutRepairs() {
    return this.$main.$(`label[for="ObjectWithoutRepairs"]`);
  }
  get $objectWithoutRepairs_buttonChecker() {
    return this.$main.$(`#ObjectWithoutRepairs`);
  }
  /** `label[for="ObjectWithRepairs"]` */
  private get $button_objectWithRepairs() {
    return this.$main.$(`label[for="ObjectWithRepairs"]`);
  }
  get $objectWithRepairs_buttonChecker() {
    return this.$main.$(`#ObjectWithRepairs`);
  }
  // ----------------------------------------------------------
  /** `#declineSpecialOfferButton` */
  get $button_declineSpecialOffer() {
    return this.$main.$(`#declineSpecialOfferButton`);
  }
  /** `#approveSpecialOfferButton` */
  get $button_approveSpecialOffer() {
    return this.$main.$(`#approveSpecialOfferButton`);
  }
  /** Кнопка "заказать Оценку" */
  get $button_Order() {
    return this.$main.$(`#makeOnlineOrderButton`);
  }
  // ------------------------------------------------------
  /** Функция ожидания загрузки страницы. */
  waitForLoad() {
    this.$button_refinance.waitForExist({ timeout: 1000, reverse: false });
    this.$button_apartment.waitForExist({ timeout: 1000, reverse: false });
  }
  /** Функция ввода Региона\города.
   * Выбирает первый параметр из автокомплита.
   *
   * @param region - `string`
   */
  input_region(region: string) {
    this.$input_region.click();
    this.$input_region.setValue(region);
    browser.pause(500);
    this.$autocomplete_menu_region.waitForDisplayed({});
    this.$autocomplete_item_region.waitForClickable();
    this.$autocomplete_item_region.click();
  }
  /** Функция ввода улицы.
   * Выбирает первый параметр из автокомплита.
   *
   * @param street - `string`
   */
  input_street(street: string) {
    this.$input_street.click();
    this.$autocomplete_menu_street.waitForDisplayed({});
    this.$input_street.setValue(street);
    browser.pause(1000);
    this.$autocomplete_menu_street.waitForDisplayed({});
    this.$autocomplete_item_street.waitForClickable();
    this.$autocomplete_item_street.click();
  }
  select_rooms(roomType: FA_RoomsType) {
    this.$selector_objectRooms.waitForClickable();
    this.$selector_objectRooms.click();
    this.$$objectRooms_values[roomType].scrollIntoView();
    this.$$objectRooms_values[roomType].click();
  }
  select_creditAmount(creditAmount: FA_CreditAmount) {
    creditAmount === FA_CreditAmount.MORE
      ? this.$button_creditAmountMore.click({ button: 0, x: 0, y: 0 })
      : this.$button_creditAmountLess.click({ button: 0, x: 0, y: 0 });
  }
  select_repairState(repairState: FA_repairState) {
    repairState === FA_repairState.WITHOUT_REPAIRS
      ? this.$button_objectWithoutRepairs.click({ button: 0, x: 0, y: 0 })
      : this.$button_objectWithRepairs.click({ button: 0, x: 0, y: 0 });
  }
  select_specialOffer(answer: FA_specialOfferDialogButtons) {
    let target = this.$main.$(`${answer}`);

    browser.waitUntil(() => target.isDisplayedInViewport(), {
      timeout: 3000,
      timeoutMsg: "Не могу принять спецпредложение",
    });
    target.scrollIntoView({ block: "center", inline: "center" });
    target.click();
    browser.waitUntil(() => target.isDisplayedInViewport() === false, {
      timeout: 3000,
      timeoutMsg: "Спецпредложение зависло",
    });
  }
}

export const zalogOrder = new ZalogOrder();

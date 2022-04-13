import options from "options";

import { KronaAccreditationType, KronaCompanyName, KronaAccreditationTypeIndex } from "./Enums";

/** Карточка Аккредитации */
class KronaAccreditationCard {
  path_newAcc = "/accreditation/new";
  path_created = "/accreditation/company/";

  /** Поле "Инн" */
  get $input_Inn() {
    return $("#inn");
  }
  /** Поле "Кпп" */
  get $input_Kpp() {
    return $("#kpp");
  }
  /** Поле "ИД из БО" */
  get $input_BaCompanyId() {
    return $("#baCompanyId");
  }
  /** Поле "Наименование" */
  get $input_Name() {
    return $("#name");
  }
  /** Галочка "все регионы" */
  public get $checkbox_allRegions() {
    return $(`#allRegions`);
  }
  /** Выбор банка */
  get $selector_bank() {
    return $(`#companyId_chosen`);
  }
  private get $selectorBank_list() {
    return this.$selector_bank.$(`div.chosen-drop`);
  }
  private get $selectorBank_input() {
    return this.$selectorBank_list.$(`div.chosen-search > input`);
  }
  get $checkbox_redZone() {
    return $(`//label[contains(text(),'Красная')]/../input[@type='checkbox']`);
  }

  /** селектор "Тип аккредитации" */
  get $selector_accreditationType() {
    return $(`select[data-bind*='аккредитации']`);
  }
  /** Кнопка "Добавить Аккредитацию" (+) */
  get $button_addAccType() {
    return $(`span.glyphicon-plus`);
  }

  /** Кнопка "+" */
  get $button_create() {
    return $(`button.btn-primary[type="submit"]`);
  }
  /** Заемщик заказчик
   * Начало аккредитации
   */
  get $datapicker_borrower() {
    return $(`input[name*="reportsStartDate"]`);
  }
  /** Банк балансодержатель
   * Начало аккредитации
   */
  get $datapicker_bank() {
    return $(`input[name*="ordersStartDate"]`);
  }

  // -----------------------------------------------------------------------------------------
  //                                      Функции
  // -----------------------------------------------------------------------------------------
  /**
   * Функция выбора типа аккредитации
   *
   * @param accType
   */
  select_accreditationType(accType: KronaAccreditationType | KronaAccreditationTypeIndex) {
    this.$selector_accreditationType.scrollIntoView();
    this.$selector_accreditationType.waitForEnabled();
    this.$selector_accreditationType.click();
    browser.pause(500);
    this.$selector_accreditationType.selectByVisibleText(`${accType}`);
    this.$button_addAccType.waitForEnabled();
    this.$button_addAccType.waitForClickable();
    this.$button_addAccType.click();
    this.$checkbox_redZone.waitForDisplayed({});
  }

  choose_bank(bankName: KronaCompanyName) {
    this.$selector_bank.waitForClickable();
    this.$selector_bank.click();
    this.$selectorBank_list.waitForDisplayed({});
    this.$selectorBank_input.waitForClickable();
    this.$selectorBank_input.click();
    this.$selectorBank_input.waitForEnabled();

    if (options.debug) browser.pause(1000);

    this.$selectorBank_input.setValue(bankName);
    browser.keys("Enter");
    browser.keys("Enter");
  }

  open_newAccreditationForm() {
    browser.url(options.krona.host + this.path_newAcc);
    browser.waitUntil(() => browser.getUrl().match(this.path_newAcc) != null);
    this.$input_Inn.waitForDisplayed({});
  }
}

/** Карточка аккредитации */
export const kronaAccreditationCard = new KronaAccreditationCard();

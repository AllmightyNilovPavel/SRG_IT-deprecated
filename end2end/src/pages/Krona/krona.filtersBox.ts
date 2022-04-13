import { debugLogging } from "modules";
import {
  CountryPropertyStatus,
  KronaCommercialVtbVerificationStatus,
  KronaCommercialOpenbankVerificationStatus,
  KronaResidentialReportStatuses,
  KronaResidentialRequestStatus,
  KronaVtbOrdersOrderStatus,
  KronaRequestObjectType,
} from "./Enums";
import { kronaResultTable } from "./krona.ResultTable";

class KronaFiltersBox {
  private get $root() {
    return $(`div#filter_box`);
  }

  /** Статус */
  get $select_status() {
    return this.$root.$(`select#status`);
  }
  /** Тип объекта */
  get $select_objectType() {
    return this.$root.$(`select#objectType`);
  }
  /** Список App_id заявок */
  get $select_app_id() {
    return this.$root.$(`input#appReqIds`);
  }
  /** Список Id заявок (rfv) */
  get $select_rfv_id() {
    return this.$root.$(`input#rfvIds`);
  }
  /** Ограничения */
  get $select_encumberance() {
    return this.$root.$(`select#encumberance`);
  }
  get $select_orderPurpose() {
    return this.$root.$(`select#orderPurpose`);
  }
  get $input_orderNumber() {
    return this.$root.$(`input#orderNumber`);
  }
  get $select_agreement() {
    return this.$root.$(`select#agreement`);
  }
  /** Кнопка "Показать" */
  get $button_filterReestr() {
    return this.$root.$(`#filterReestr`);
  }
  /** Кнопка "Отфильтровать" */
  get $buttonSearchFormSubmit() {
    return this.$root.$(`button#searchFormSubmit`);
  }
  get $button_showResults() {
    return $(`button#reportListDataTableSubmitButton`);
  }
  get $input_reportNumber() {
    return this.$root.$(`input#reportNumber`);
  }
  get $inputDateBegin() {
    return this.$root.$(`input#dateBegin`);
  }
  get $selectVerificationStatus() {
    return this.$root.$(`select#verificationStatus`);
  }
  get $inputOrderBegin() {
    return this.$root.$(`#orderBegin`);
  }
  get $inputCustomField1() {
    return this.$root.$(`#custom1`);
  }
  get $inputCustomField2() {
    return this.$root.$(`#custom2`);
  }
  get $inputCustomField3() {
    return this.$root.$(`#custom3`);
  }

  /*
  get $() {
    return this.$root.$(``);
  }
  get $() {
    return this.$root.$(``);
  } */
  // ----------------------------------------------------
  waitForLoad() {
    this.$root.waitForExist({ timeoutMsg: `Ошибка загрузки блока фильтров.` });
    this.$root.waitForDisplayed({ timeoutMsg: `Ошибка отрисовки блока фильтров.` });
  }
  /**
   * Метод выбора значения для поля "Статус отчёта"
   * @param status
   */
  selectStatus(
    status:
      | CountryPropertyStatus
      | KronaResidentialReportStatuses
      | KronaResidentialRequestStatus
      | KronaVtbOrdersOrderStatus
  ) {
    this.$select_status.scrollIntoView();
    this.$select_status.selectByAttribute("value", status);
  }
  /** Фильтрация по типу объекта */
  selectObjectType(objectType: KronaRequestObjectType) {
    debugLogging(`В фильтре выбираю тип объекта = ${objectType}`);
    return this.$select_objectType.selectByAttribute("value", objectType);
  }
  /** Фильтрация по App-Id */
  selectByAppId(id: string) {
    this.$select_app_id.waitForClickable({
      timeoutMsg: `Поле "Список App_Id заявок" не кликабельно`,
    });
    this.$select_app_id.click();
    debugLogging(`Клик по полю "Список App_Id заявок"`);
    this.$select_app_id.setValue(id);
    debugLogging(`В поле "Список App_Id заявок" введено значение - ${id}`);
  }
  /** Фильтрация по Rfv-Id */
  selectByRfvId(id: string) {
    this.$select_rfv_id.waitForClickable({
      timeoutMsg: `Поле "Список Id заявок" не кликабельно`,
    });
    this.$select_rfv_id.click();
    debugLogging(`Клик по полю "Список Id заявок"`);
    this.$select_rfv_id.setValue(id);
    debugLogging(`В поле "Список Id заявок" введено значение - ${id}`);
  }
  /**
   *
   * @param verifStatus
   */
  selectVerificationStatus(
    verifStatus: KronaCommercialVtbVerificationStatus | KronaCommercialOpenbankVerificationStatus
  ) {
    let target = this.$selectVerificationStatus;
    target.scrollIntoView();
    target.waitForClickable();
    target.selectByAttribute("value", verifStatus);

    browser.waitUntil(() => target.getValue() === verifStatus);
  }
  /**
   * Метод заполнения поля "Номер отчёта"
   * @param reportNumber
   */
  inputReportNumber(reportNumber: string) {
    let target = this.$input_reportNumber;
    target.scrollIntoView();
    target.waitForClickable();
    target.clearValue();
    target.click();
    target.setValue(reportNumber);

    browser.waitUntil(() => target.getValue() === reportNumber, {
      timeout: 5000,
      timeoutMsg: `Ошибка при установлении значения в поле "номер отчёта".`,
    });
  }
  inputCustomField(value: string, fieldId: number) {
    let target: WebdriverIO.Element;
    target = this[`$inputCustomField${fieldId}`];

    target.waitForClickable();
    target.click();
    target.setValue(value);
    browser.waitUntil(() => target.getText() !== null);
  }
  showResults() {
    let buttonToShowResults: WebdriverIO.Element;

    if (
      this.$button_filterReestr.isExisting() &&
      this.$button_filterReestr.isEnabled() &&
      this.$button_filterReestr.isClickable()
    )
      buttonToShowResults = this.$button_filterReestr;
    else if (
      this.$button_showResults.isExisting() &&
      this.$button_showResults.isEnabled() &&
      this.$button_showResults.isClickable()
    )
      buttonToShowResults = this.$button_showResults;
    else if (
      this.$buttonSearchFormSubmit.isExisting() &&
      this.$buttonSearchFormSubmit.isEnabled() &&
      this.$buttonSearchFormSubmit.isClickable()
    )
      buttonToShowResults = this.$buttonSearchFormSubmit;
    else throw new Error("Нет кнопки для применения фильтров");

    buttonToShowResults.scrollIntoView();
    buttonToShowResults.waitForClickable();
    buttonToShowResults.click();
  }
}

export const kronaFiltersBox = new KronaFiltersBox();

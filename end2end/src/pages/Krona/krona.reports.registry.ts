import { KronaResidentialRequestStatus, KronaReportObjectType } from "./Enums";
import { KronaCompanyName } from "./Enums/enum.company.name";

class KronaReports {
  path = "/Reports";

  /** Фильтр "Адрес" */
  get $filter_Address() {
    return browser.$("#address");
  }
  /** Фильтр "№ Отчёта" */
  get $filter_reportNumber() {
    return browser.$("#reportNumber");
  }
  /** фильтр "Тип объекта" */
  get $filter_objectType() {
    return browser.$("#type");
  }
  /** фильтр "Банк" */
  get $filter_Bank() {
    return browser.$("#companyIds_chosen > ul > li > input");
  }
  /** фильтр "Статус" */
  get $filter_Status() {
    return browser.$("#status");
  }
  /** фильтр "Пользователь" */
  get $filter_User() {
    return browser.$("#author");
  }
  /** фильтр "ID заказа дельты" */
  get $filter_deltaId() {
    return browser.$("#deltaOrderId");
  }
  /** фильтр "Наименование ОК" */
  get $filter_appraiserCompany() {
    return browser.$("#appraiserCompanyName");
  }
  /** фильтр "Заёмщик" */
  get $filter_Customer() {
    return browser.$("#borrowerName");
  }
  /** фильтр "Дата от..." */
  get $filter_dataFrom() {
    return browser.$("#dateBegin");
  }
  /** фильтр "Дата до..." */
  get $filter_dataTo() {
    return browser.$("#dateEnd");
  }
  /** фильтр "Отклонение от..." */
  get $filter_deviationFrom() {
    return browser.$("#deviationFrom");
  }
  /** фильтр "Отклонение до..." */
  get $filter_deviationTo() {
    return browser.$("#deviationTo");
  }
  /** кнопка "Показать" */
  get $button_showResult() {
    return browser.$("#reportListDataTableSubmitButton");
  }
  /** кнопка "В эксель" */
  get $button_excelExport() {
    return browser.$("#exportRequestReestr");
  }
  /** чекбокс "Только мои отчёты" */
  get $checkbox_currentUserRequests() {
    return browser.$("#myOwnOnly");
  }
  /** чекбокс "Только ЭЦП" */
  get $checkbox_CryptoSignOnly() {
    return browser.$("#withSignatureOnly");
  }
  get $base_modalRevoke() {
    return $(`#reject_form`);
  }
  get $base_modalApprove() {
    return $(`#approve_form`);
  }
  get $button_modalApproveSend() {
    return $(`#send_approve`);
  }
  get $button_modalApproveCancel() {
    return this.$base_modalRevoke.$(`#cancel_approve`);
  }
  get $input_modalRevokeComment() {
    return this.$base_modalRevoke.$(`#reject_comment`);
  }
  private get $button_modalRevokeSend() {
    return this.$base_modalRevoke.$(`#send_reject`);
  }
  private get $button_modalRevokeCancel() {
    return this.$base_modalRevoke.$(`#cancel_reject`);
  }
  // ---------------------------------------------------------------------------
  //                                    Функции
  // ---------------------------------------------------------------------------
  setReportNumber(reportNumber: string) {
    this.$filter_reportNumber.scrollIntoView();
    this.$filter_reportNumber.waitForClickable();
    this.$filter_reportNumber.clearValue();
    this.$filter_reportNumber.setValue(reportNumber);
  }
  /** Функция выбора значения фильтра по статусу */
  select_status(Status: KronaResidentialRequestStatus) {
    this.$filter_Status.scrollIntoView({ block: "center", inline: "center" });
    this.$filter_Status.waitForClickable();
    this.$filter_Status.selectByAttribute("value", Status);
  }
  /** функция выбора значения фильтра по типу объекта */
  select_objectType(objectType: KronaReportObjectType) {
    this.$filter_objectType.scrollIntoView({ block: "center", inline: "center" });
    this.$filter_objectType.waitForClickable();
    this.$filter_objectType.selectByAttribute("value", objectType);
  }
  reportRevoke(commentText: string) {
    this.$input_modalRevokeComment.waitForClickable();
    this.$input_modalRevokeComment.setValue(commentText);
    this.$button_modalRevokeSend.click();
  }
  /** Функция выбора банка */
  select_bank(bank: KronaCompanyName) {
    this.$filter_Bank.click();
    this.$filter_Bank.setValue(bank);
    browser.keys(["\uE007"]);
    browser.pause(50);
    browser.keys(["\uE007"]);
  }
}
/** Реестр Отчётов */
export const kronaReports = new KronaReports();

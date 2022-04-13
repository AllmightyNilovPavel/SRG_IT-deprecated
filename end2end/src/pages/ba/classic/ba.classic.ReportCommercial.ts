import { BaCommercialObjectType, BaReportsActionButtons } from "./enums";
import { ICommercialReport } from "options/testData/ba";

class BaReportCommercial {
  path = "/commercial_report.html";
  private get $report_body() {
    return $(`#report-form`);
  }
  // --------------------------------------------------
  // ----------- Кнопки управления ---------------------
  // --------------------------------------------------
  private get $report_container() {
    return $(`#report-container`);
  }
  /** Кнопки оплатить\сохранить\... */
  private get $action_buttons() {
    return this.$report_container.$(`div.one-line-block`);
  }
  /** Панель с табами */
  private get $main_panel() {
    return this.$report_container.$(`div.tabpanel`);
  }
  /** Кнопка "Добавить объект"  */
  get $button_addObject() {
    return this.$report_container.$(`#addRealEstateObjectBtn`);
  }
  /** Перейти к Объекту 1 */
  get $tab_object1() {
    return this.$main_panel.$(`a[href="#tabs-0"]`);
  }
  /** Форма реквизитов отчета */
  private get $form_requisites() {
    return this.$main_panel.$(`#requisistes`);
  }
  private get $tabs_control() {
    return;
  }
  // --------------------------------------------------
  // ----------- Реквизиты отчёта ---------------------
  // --------------------------------------------------
  /** Номер отчета */
  private get $input_reportNumber() {
    return this.$report_body.$(`#reportNumber`);
  }
  /** Номер кредитной заявки */
  private get $input_creditNumber() {
    return this.$report_body.$(`#creditRequestNumber`);
  }
  /** Дата составления отчета */
  private get $date_composedDate() {
    return this.$report_body.$(`#composedDate`);
  }
  /** Дата оценки */
  private get $date_appraisalDate() {
    return this.$report_body.$(`#appraisalDate`);
  }
  /** Подписант от лица организации */
  private get $selector_signatory() {
    return this.$report_body.$(`#signatory`);
  }
  /** Оценщик */
  private get $selector_appraisalSygnatory() {
    return this.$report_body.$(`#appraiserSignatory`);
  }
  // --------------------------------------------------
  // ----------- Договор на оценку ---------------------
  // --------------------------------------------------
  /** Номер договора */
  private get $input_agreementNumber() {
    return this.$report_body.$(`#agreementNumber`);
  }
  /** Дата договора */
  private get $date_agreementDate() {
    return this.$report_body.$(`#agreementDate`);
  }
  /** Цель оценки */
  private get $input_appraisalPurpose() {
    return this.$report_body.$(`#appraisalPurpose`);
  }
  /** Предполагаемое использование результатов оценки */
  private get $input_intendedUseComm() {
    return this.$report_body.$(`#intendedUseComm`);
  }
  /** Оцениваемые права */
  private get $input_appraisalOwnershipComm() {
    return this.$report_body.$(`#appraisalOwnershipComm`);
  }
  /** Стоимость оказания услуг по Договору, руб. */
  private get $input_servicesPriceByContract() {
    return this.$report_body.$(`#servicesPriceByContract`);
  }
  /** Наличие НДС */
  private get $selector_nds() {
    return this.$report_body.$(`#ndsPresence`);
  }
  // --------------------------------------------------
  // ----------- Сведения о заемщике/заказчике ---------------------
  // --------------------------------------------------
  /** Заёмщик / заказчик */
  private get $selector_participantType() {
    return this.$report_body.$(`#participantType`);
  }
  /** ФИО \ Наименование */
  private get $input_participantFullName() {
    return this.$report_body.$(`#participantFullName`);
  }
  /** ИНН */
  private get $input_participantInn() {
    return this.$report_body.$(`#participantInn`);
  }
  /** Паспортные данные */
  private get $input_participantPassportData() {
    return this.$report_body.$(`#participantPassportData`);
  }
  /** Организационно-правовая форма */
  private get $input_participantLiabilityForm() {
    return this.$report_body.$(`#participantLiabilityForm`);
  }
  /** ОГРН */
  private get $input_participantOgrn() {
    return this.$report_body.$(`#participantOgrn`);
  }
  /** Дата присвоения ОГРН */
  private get $date_participantOgrnDate() {
    return this.$report_body.$(`#participantOgrnDate`);
  }
  /** Место нахождения */
  private get $input_participantAddress() {
    return this.$report_body.$(`#participantAddress`);
  }
  // --------------------------------------------------
  // ----------- Сведения о собственнике объекта оценки ---------------------
  // --------------------------------------------------
  private get $checkbox_customerAndOwnerSamePerson() {
    return this.$report_body.$(`#customerAndOwnerSamePerson`);
  }
  private get $button_addOwner() {
    return this.$report_body.$(`#addOwnerBtn`);
  }
  private get $selector_ownerType() {
    return this.$report_body.$(`#participantType0`);
  }
  private get $input_ownerFullName() {
    return this.$report_body.$(`#participantFullName0`);
  }
  private get $input_ownerInn() {
    return this.$report_body.$(`#participantInn0`);
  }
  private get $input_ownerPassportData() {
    return this.$report_body.$(`#participantPassportData0`);
  }
  private get $input_ownerOrgn() {
    return this.$report_body.$(`#participantOgrn0`);
  }
  private get $date_ownerOgrnDate() {
    return this.$report_body.$(`#participantOgrnDate0`);
  }
  private get $input_ownerAddress() {
    return this.$report_body.$(`#participantAddress0`);
  }
  // --------------------------------------------------
  // ----------- Сведения об объекте оценки ---------------------
  // --------------------------------------------------
  /** Тип объекта оценки */
  private get $selector_BaCommercialObjectType() {
    return this.$report_body.$(`#appraisalObjectType`);
  }
  /** Содержание объекта оценки */
  private get $selector_BaCommercialObjectContent() {
    return this.$report_body.$(`#appraisalObjectContentType`);
  }
  /** Описание объекта ИНОЕ */
  private get $input_commercialObjectName() {
    return this.$report_body.$(`#appraisalObjectName`);
  }
  private get $checkbox_unknownPrice() {
    return this.$report_body.$(`#purchasePriceIsUnknown`);
  }
  private get $date_purchaseDate() {
    return this.$report_body.$(`#purchaseDate`);
  }
  /** Стоимость приобретения объекта */
  private get $input_purchasePrice() {
    return this.$report_body.$(`#purchasePrice`);
  }
  private get $checkbox_inspectionNotConducted() {
    return this.$report_body.$("#inspectionNotConducted");
  }
  /** Сравнительный подход, руб. с НДС */
  private get $input_approachComparativeNds() {
    return this.$report_body.$(`#approachComparativeNds`);
  }
  /** Доходный подход, руб. с НДС */
  private get $input_approachIncomeNds() {
    return this.$report_body.$(`#approachIncomeNds`);
  }
  /** Затратный подход, руб. с НДС */
  private get $input_approachExpensesNds() {
    return this.$report_body.$(`#approachExpensesNds`);
  }
  // --------------------------------------------------
  // ----------- Банк ---------------------
  // --------------------------------------------------
  private get $selector_bank() {
    return this.$report_body.$(`select#bankId`);
  }
  private get $selector_department() {
    return this.$report_body.$(`select#department`);
  }
  private get $input_bankUser() {
    return this.$report_body.$(`#bankUser`);
  }
  // ---------------------- Вложенный файл -----------------
  private get $file_reportFile() {
    return this.$report_body.$(`div.qq-upload-button`);
  }
  // ---------------------------------------------------------------------------
  //                                Функции
  // ---------------------------------------------------------------------------
  actionWithReport(action: BaReportsActionButtons) {
    this.$action_buttons.$(`${action}`).click();
  }
  /** Функция ожидания загрузки страницы. */
  waitForLoad() {
    this.$main_panel.waitForDisplayed({ timeout: 10000, reverse: false });
  }
  selectCommercialObject(object: BaCommercialObjectType) {
    this.$selector_BaCommercialObjectType.selectByAttribute("value", object);
  }
  /** Функция заполнения реквизитов отчёта */
  fillReportDetails(data: ICommercialReport) {
    let fields = data.requisites;
    this.$input_reportNumber.waitForClickable();
    this.$input_reportNumber.setValue(fields.reportNumber);
    this.$input_creditNumber.setValue(fields.creditNumber);
    this.$date_composedDate.click();
    this.$date_composedDate.setValue("d");
    browser.keys("Tab");
    this.$date_appraisalDate.click();
    this.$date_appraisalDate.setValue("d");
    browser.keys("Tab");
  }
  /** Функция заполнения данных договора на оценку */
  fillAgreementDetails(data: ICommercialReport) {
    let fields = data.agreement;
    this.$input_agreementNumber.setValue(fields.agreementNumber);
    this.$date_agreementDate.click();
    this.$date_agreementDate.setValue("d");
    browser.keys("Tab");
    this.$input_appraisalPurpose.setValue(fields.appraisalPurpose);
    this.$input_intendedUseComm.setValue(fields.intendedUseComm);
    this.$input_appraisalOwnershipComm.setValue(fields.appraisalOwnershipComm);
    this.$input_servicesPriceByContract.setValue(fields.servicesPriceByContract);
    this.$selector_nds.selectByIndex(fields.nds_index);
  }
  /** Функция заполнения сведений о заемщике/заказчике */
  fillParticipantFullName(data: ICommercialReport) {
    let fields = data.participant;
    this.$input_participantFullName.setValue(fields.fullName);
  }
  /** Функция заполнения сведений об объекте оценки */
  fillCommercialObjectData(data: ICommercialReport) {
    let fields = data.commercialObject;
    this.$selector_BaCommercialObjectType.selectByIndex(fields.commercialObjectType_index);
    this.$selector_BaCommercialObjectContent.selectByIndex(fields.commercialObjectContent_index);
    this.$checkbox_unknownPrice.click();
    this.$checkbox_inspectionNotConducted.click();
    this.$input_approachComparativeNds.setValue(fields.approachComparativeNds);
    this.$input_approachIncomeNds.setValue(fields.approachIncomeNds);
    this.$input_approachExpensesNds.setValue(fields.approachExpensesNds);
  }
  /** Функция заполнения сведений о банке */
  fillBankData(data: ICommercialReport) {
    let fields = data.bankData;
    this.$selector_bank.selectByVisibleText(fields.bank);
  }
  /** Функция заполнения отчета */
  fillData(data: ICommercialReport) {
    this.waitForLoad();
    this.fillReportDetails(data);
    this.fillAgreementDetails(data);
    this.fillParticipantFullName(data);
    this.fillCommercialObjectData(data);
    this.fillBankData(data);
    this.$button_addObject.click();
    this.$tab_object1.waitForDisplayed({ timeout: 1000, reverse: false });
    this.$tab_object1.click();
  }
}
/** Карточка отчёта коммерческой недвижимости */
export const baReportCommercial = new BaReportCommercial();

import { BaResidentialReportBase } from "../declarations/ba.residential.report.base";

export class BaResidentialReportPartAssesmentTask {
  residentialReportBase = new BaResidentialReportBase();

  protected get $root() {
    return $(`div.tab-content > div#tab1`);
  }
  /** номер заказа
   * `input#kronaId`
   */
  get $input_orderNumber() {
    return this.$root.$(`input#kronaId`);
  }
  // -------------------------- Договор на оценку ------------------------------
  /** номер договора
   * `input#agreementNumber`
   */
  get $input_agreementNumber() {
    return this.$root.$(`input#agreementNumber`);
  }
  /** дата договора
   * `input#agreementDate`
   */
  get $input_agreementDate() {
    return this.$root.$("input#agreementDate");
  }
  /** Банк */
  get $selector_bank() {
    return this.$root.$(`#bank`);
  }
  /** Цель оценки */
  get $input_appraisalPurpose() {
    return this.$root.$(`#appraisalPurpose`);
  }
  /** строка ввода "предполагаемое использование результатов" для всех Банков */
  get $input_intendedUse() {
    return this.$root.$(`#intendedUse`);
  }
  /** Оцениваемые права
   * `#appraisalOwnership`
   */
  get $input_appraisalOwnership() {
    return this.$root.$(`#appraisalOwnership`);
  }
  /** Обременения
   * `#encumbrances`
   */
  get $input_encumbrances() {
    return this.$root.$(`#encumbrances`);
  }
  /** Источник информации по Обременениям
   * `#encumbrancesInfoSource`
   */
  get $input_encumbrancesInfoSource() {
    return this.$root.$(`#encumbrancesInfoSource`);
  }
  // ------------------------ Сведения о заказчике -----------------------------
  get $selector_customerType() {
    return this.$root.$("#customerType");
  }
  /** "ФИО заказчика" - физЛицо \ "Наименование" - юрЛицо */
  get $input_customerFullName() {
    return this.$root.$("#customerFullName");
  }
  /** "Адрес заказчика" - физЛицо \ "Место нахождения" - юрЛицо */
  get $input_customerAddress() {
    return this.$root.$("#customerAddress");
  }
  get $input_customerPassportSerial() {
    return this.$root.$("#customerPassportSeries");
  }
  get $input_customerPassportNum() {
    return this.$root.$("#customerPassportNumber");
  }
  get $input_customerPassportDate() {
    return this.$root.$("#customerPassportDate");
  }
  get $input_customerPassportIssuer() {
    return this.$root.$("#customerPassportIssuer");
  }
  // ------------------------ Подписанты по отчёту -----------------------------
  /** Оценщик
   * `#appraiserSignatory`
   */
  get $selector_appraiserSignatory() {
    return this.$root.$(`#appraiserSignatory`);
  }
  /** Подписант от лица организации
   * `#signatory`
   */
  get $selector_directorSignatory() {
    return this.$root.$(`#signatory`);
  }
  // --------------------------- Тип объекта оценки -----------------------------
  /** Вид объекта
   * `#reportType`
   */
  get $selector_objectType() {
    return this.$root.$(`#reportType`);
  }
  /** Стадия строительства
   * `#valuationObjectType`
   */
  get $selector_buildingStage() {
    return this.$root.$(`#valuationObjectType`);
  }
  /** Объект оценки является таунхаусом
   * `#isValuationObjectTownhouse`
   */
  get $selector_isTownhouse() {
    return this.$root.$(`#isValuationObjectTownhouse`);
  }
  get $selector_registeredOwnership() {
    return this.$root.$(`select#registeredOwnership`);
  }
  /** Указать в отчёте стоимость
   * `#share`
   */
  get $selector_objectSharePart() {
    return this.$root.$(`#share`);
  }
  /** Текущее использование Объекта оценки
   * `#currentUse`
   */
  get $input_currentUse() {
    return this.$root.$(`#currentUse`);
  }
  // -------------------------- Адрес объекта оценки ----------------------------
  /** Адрес по документам
   * `#addressDoc`
   */
  get $input_addressDoc() {
    return this.$root.$(`#addressDoc`);
  }
  /** Адрес по ФИАС
   * `#dadataAddress`
   */
  get $input_fiasAddress() {
    return this.$root.$(`#dadataAddress`);
  }
  protected get $addressAutocomplete_root() {
    return this.$root.$(`ul.ui-autocomplete.ui-menu.ui-corner-all`);
  }
  /** Строчка выбора адреса из подсказки */
  protected get $select_addressSuggest() {
    return this.$addressAutocomplete_root.$(`a.ui-corner-all`);
  }
  /** Область (Субъект РФ) */
  get $input_region() {
    return this.$root.$(`#region`);
  }
  /** Административный район */
  get $input_area() {
    return this.$root.$(`#area`);
  }
  /** Населённый пункт */
  get $input_city() {
    return this.$root.$(`#city`);
  }
  /** Улица */
  get $input_street() {
    return this.$root.$(`#street`);
  }
  /** Номер дома */
  get $input_houseNumber() {
    return this.$root.$(`#houseNumber`);
  }
  /** Номер квартиры
   * `#appartment`
   */
  get $input_appartment() {
    return this.$root.$(`#appartment`);
  }
  /** Кадастровый / Условный номер
   * `#cadastralNumber`
   */
  get $input_cadastralNumber() {
    return this.$root.$(`#cadastralNumber`);
  }
  /** Наименование банка
   * `#forBank`
   */
  get $input_bankName() {
    return this.$root.$(`#forBank`);
  }
  /** Печатная форма
   * `#printForm`
   */
  get $selector_printForm() {
    return this.$root.$(`#printForm`);
  }
  /** Отделение\сотрудник банка
   * `#bankUser`
   */
  get $input_bankUser() {
    return this.$root.$(`#bankUser`);
  }
  /** ФИО Заёмщика
   * `#borrowerName`
   */
  get $input_borrowerName() {
    return this.$root.$(`#borrowerName`);
  }
  get $button_copyCustomerToBorrower() {
    return this.$root.$(`button[onclick*="copyCustomerNameToBorrowerName"]`);
  }
  /**  */
  get $selector_marketResearch() {
    return this.$root.$(`#marketResearch`);
  }
  /** Глава "Физический износ"
   * `#wearoutAlgorithm`
   */
  get $selector_wearoutAlgorithm() {
    return this.$root.$(`#wearoutAlgorithm`);
  }
  /** Глава "Ликвидационная стоимость"
   * `#liquidationAlgorithm`
   */
  get $selector_liquidationAlgorithm() {
    return this.$root.$(`#liquidationAlgorithm`);
  }
  /** Весовые коэффициенты
   * `#calculationAlgorithm`
   */
  get $selector_calculationAlgorithm() {
    return this.$root.$(`#calculationAlgorithm`);
  }
  /** Учитываемая при расчёте площадь объекта
   * `#whatSpaceToChoose`
   */
  get $selector_whatSpaceToChoose() {
    return this.$root.$(`#whatSpaceToChoose`);
  }
  /** Карта
   * `#mapType`
   */
  get $selector_mapType() {
    return this.$root.$(`#mapType`);
  }
  /** Округлять стоимость
   * `#roundValueVariants`
   */
  get $selector_roundValueVariants() {
    return this.$root.$(`#roundValueVariants`);
  }
  // ----------------------------- Ревизиты отчёта ------------------------------
  /** * номер отчёта
   * `input#reportNumber`
   */
  get $input_reportNumber() {
    return this.$root.$("input#reportNumber");
  }
  get $button_copyAgreementNumberToReportNumber() {
    return this.$root.$(`button[onclick="reportModel.copyContractNumberToReportNumber()"]`);
  }
  /** Кнопка "Дата из договора" */
  get $button_copyDate() {
    return this.$root.$(`button[onclick="reportModel.copyDate()"]`);
  }
  /** Чекбокс "Осмотр не проводился" */
  get $checkbox_noInspection() {
    return this.$root.$(`#inspectionDateNo`);
  }
  /** Включить стоимость в $
   * `#includeDollarPrice`
   */
  get $checkbox_includeDollarPrice() {
    return this.$root.$(`#includeDollarPrice`);
  }
  get $input_dollarRate() {
    return this.$root.$(`input#dollarRate`);
  }
  // --------------------------- Особенности осмотра ----------------------------
  /** Особенности отсутствуют
   * `#inspectionFeaturesMiss`
   */
  get $checkbox_inspectionFeaturesMiss() {
    return this.$root.$(`#inspectionFeaturesMiss`);
  }
  /** Препятствия к осмотру отсутствуют */
  get $checkbox_difficultyMiss() {
    return this.$root.$(`#difficultyMiss`);
  }
  // -------------------------- Материалы и информация --------------------------
  /** Необходимые для оценки материалы и информация переданы
   * `#customerInformationMiss`
   */
  get $checkbox_customerInformationMiss() {
    return this.$root.$(`#customerInformationMiss`);
  }
  // -------------------------- Привлечение экспертов ---------------------------
  // --------------------- Ограничения и пределы применения ---------------------
  get $input_finalPriceLimits() {
    return this.$root.$(`#costLimit`);
  }
  get $button_costLimitForCredit() {
    return this.$root.$(`a[onclick="reportModel.costLimitForCredit()"]`);
  }
  get $button_costLimitForValuation() {
    return this.$root.$(`a[onclick="reportModel.costLimitForValuation()"]`);
  }
  // -------------------- Допущения и ограничивающие условия --------------------
  /**  */
  get $checkbox_includeEncumbranceChapter() {
    return this.$root.$("#includeEncumbranceChapter");
  }
  get $input_spacePlanningDocs() {
    return this.$root.$("#spacePlanningDocuments");
  }
  get $input_constitutiveDocs() {
    return this.$root.$("#constitutiveDocuments");
  }
  get $input_encumbrancesExistDocs() {
    return this.$root.$("#encumbrancesExistDocuments");
  }
}

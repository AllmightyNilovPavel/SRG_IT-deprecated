import { ICommercialReport } from "options/testData/ba";

class BaReportCommercialObjectTab {
  path = "/commercial_report.html";
  private get $object_tabs_body() {
    return $(`#tabs`);
  }
  // --------------------------------------------------
  // ----------- Табы для объекта под номером id-------
  // --------------------------------------------------
  /** Панель табов */
  private $tabs_button(id: number) {
    return this.$object_tabs_body.$(`#tabs-${id} ul[class*="object-tabs-header"]`);
  }
  /** Таб местоположение и карта */
  private $tab_map(id: number) {
    return this.$tabs_button(id).$(`a[href="#tab2-${id}"]`);
  }
  /** Таб Физические характеристики */
  private $tab_physical(id: number) {
    return this.$tabs_button(id).$(`a[href="#tab3-${id}"]`);
  }
  /** Таб Дополнительная информация */
  private $tab_addition(id: number) {
    return this.$tabs_button(id).$(`a[href="#tab4-${id}"]`);
  }
  /** Таб Расчетник */
  private $tab_calculation(id: number) {
    return this.$tabs_button(id).$(`a[href="#tab7-${id}"]`);
  }
  // ---------------------------------------------------------------
  // ----------- Подтабы для физ.хар-к объекта под номером id-------
  // ---------------------------------------------------------------
  /** табы физических хар-к */
  private get $subtab_buttons() {
    return this.$object_tabs_body.$("#switch_comm_object_physical");
  }
  /** Подтаб Арендопригодная площадь */
  private $button_leasableSpace(id: number) {
    return this.$object_tabs_body.$(`a[href="#leasable_space_tab-${id}"]`);
  }
  /** Подтаб Общая площадь */
  private $button_totalSpace(id: number) {
    return this.$object_tabs_body.$(`a[href="#total_space_tab-${id}"]`);
  }
  // --------------------------------------------------
  // ----------- Таб Результаты оценки ----------------
  // --------------------------------------------------
  /** Тип объекта недвижимости */
  private $select_commercialType(id: number) {
    return this.$object_tabs_body.$(`#commercialType_${id}`);
  }
  /** Подтип объекта */
  private $select_commercialSubType(id: number) {
    return this.$object_tabs_body.$(`#commercialSubType_${id}`);
  }
  // --------------------------------------------------
  // ----------- Таб Местоположение и карта------------
  // --------------------------------------------------
  /** поле ввода адреса */
  private $select_address_autocomplete(id: number) {
    return this.$object_tabs_body.$(`#address_autocomplete_${id}`);
  }
  /** Выпадашка с подсказками */
  private get $addressInput_suggestDropdown() {
    return $(`#commercial-report .ui-autocomplete`);
  }
  /** Первый вариант из подсказки */
  private get $addressInput_activeSuggestions() {
    return this.$addressInput_suggestDropdown.$("li:first-child");
  }
  /** Кадастровый/условный номер: */
  private $input_cadastralNumber(id: number) {
    return this.$object_tabs_body.$(`#cadastralNumber_${id}`);
  }
  /** Статус населенного пункта: */
  private $select_localityStatus(id: number) {
    return this.$object_tabs_body.$(`#localityStatus_${id}`);
  }
  /** Местонахождение в пределах города: */
  private $select_locationWithinLocality(id: number) {
    return this.$object_tabs_body.$(`#locationWithinLocality_${id}`);
  }
  /** Линия домов: */
  private $select_buildingLine(id: number) {
    return this.$object_tabs_body.$(`#buildingLine_${id}`);
  }
  /** Доступ к объекту (расположение на закрытой территории): */
  private $select_objectAccess(id: number) {
    return this.$object_tabs_body.$(`#objectAccess_${id}`);
  }
  // --------------------------------------------------
  // ----------- Таб Физические характеристики ---------------------
  // --------------------------------------------------
  /** форма общая площадь */
  private get $totalSpace_subTab_body() {
    return this.$object_tabs_body.$("#physicalTotalSpace");
  }
  /** Общая площадь */
  private $input_spaceTotal(id: number) {
    return this.$totalSpace_subTab_body.$(`#spaceTotal_${id}`);
  }
  /** Офисная площадь, кв.м. */
  private $input_spaceOffice(id: number) {
    return this.$totalSpace_subTab_body.$(`#spaceOffice_${id}`);
  }
  /** Первая строка таблицы */
  private get $physical_table() {
    return this.$totalSpace_subTab_body.$("table tbody:nth-child(2) tr:nth-child(1)");
  }
  /** Состояние отделки */
  private get $input_condition() {
    return this.$physical_table.$("td:nth-child(3) table tbody tr:first-child input");
  }
  /** Наличие отопления */
  private get $input_heat() {
    return this.$physical_table.$("td:nth-child(4) table tbody tr:first-child input");
  }
  /** Этаж расположения */
  private get $input_floor() {
    return this.$physical_table.$("td:nth-child(5) table tbody tr:first-child input");
  }
  /** Материал стен: */
  private $select_buildingWalls(id: number) {
    return this.$totalSpace_subTab_body.$(`#buildingWalls_${id}`);
  }
  /** Класс объекта: */
  private $select_objectClass(id: number) {
    return this.$totalSpace_subTab_body.$(`#objectClass_${id}`);
  }
  /** Организованная парковка: */
  private $select_parkingAvailable(id: number) {
    return this.$totalSpace_subTab_body.$(`#parkingAvailable_${id}`);
  }
  /** форма Арендопригодная площадь */
  private get $leasableSpace_subTab_body() {
    return this.$object_tabs_body.$("#physicalLeasableSpace");
  }
  /** Арендопригодная площадь, кв.м. */
  private $input_spaceLeasable(id: number) {
    return this.$leasableSpace_subTab_body.$(`#spaceLeasable_${id}`);
  }
  /** Офисная площадь, кв.м. */
  private $input_spaceLeasableOffice(id: number) {
    return this.$leasableSpace_subTab_body.$(`#spaceLeasableOffice_${id}`);
  }
  /** Первая строка таблицы - офисная часть */
  private get $physicalLeasable_table() {
    return this.$leasableSpace_subTab_body.$("table tbody:nth-child(2) tr:nth-child(1)");
  }
  /** Состояние отделки */
  private get $input_conditionLeasable() {
    return this.$physicalLeasable_table.$("td:nth-child(3) table tbody tr:first-child input");
  }
  /** Наличие отопления */
  private get $input_heatLeasable() {
    return this.$physicalLeasable_table.$("td:nth-child(4) table tbody tr:first-child input");
  }
  /** Этаж расположения */
  private get $input_floorLeasable() {
    return this.$physicalLeasable_table.$("td:nth-child(5) table tbody tr:first-child input");
  }
  // --------------------------------------------------
  // ----------- Таб Дополнительная информация --------
  // --------------------------------------------------
  /** форма с чекбоксами */
  private get $form_additional() {
    return this.$object_tabs_body.$("#additional-0 fieldset div");
  }
  /** выбор первого чекбокса в каждом варианте ответа */
  private checkbox_yes(i: number) {
    return this.$form_additional.$(`.control-group:nth-child(${i}) div:first-child input`);
  }
  /** выбор второго чекбокса в каждом варианте ответа */
  private checkbox_no(i: number) {
    return this.$form_additional.$(`.control-group:nth-child(${i}) div:nth-child(2) input`);
  }
  /** выбор чекбокса 10 с ответом нет */
  private get $checkbox_inConstructionVtb_no() {
    return this.$form_additional.$("#additionalAnswers\\.0\\.IN_CONSTRUCTION_VTB\\.no");
  }
  /** степень износа */
  private get $input_depreciation() {
    return this.$form_additional.$(
      ".control-group:nth-child(9) div.options-block label:nth-child(4) input"
    );
  }
  // --------------------------------------------------
  // ----------- Таб Расчетник ------------------------
  // --------------------------------------------------
  /** кнопка Расчет */
  private get $button_calculation() {
    return this.$object_tabs_body.$("#baikalBtn");
  }
  /** модальное окно Соранить и Открыть в Байкале */
  private get $modal_openCalculation() {
    return $(`.bootbox`);
  }
  /** Кнопка согласен сохранить и перейти в Байкал */
  private get $button_saveAndOpen() {
    return this.$modal_openCalculation.$(`.modal-footer .btn-primary`);
  }
  // --------------------------------------------------
  // ----------- Функции ------------------------------
  // --------------------------------------------------
  /** Функция ожидания загрузки страницы. */
  waitForLoad() {
    this.$object_tabs_body.waitForDisplayed({ timeout: 10000, reverse: false });
  }
  /**
   * Функция заполнения таба Результаты оценки для объекта
   *
   * @param objectNum - номер объекта, нумерация с нуля
   */
  fillResultTab(data: ICommercialReport, objectNum: number) {
    let field = data.realty;
    this.$select_commercialType(objectNum).waitForClickable();
    this.$select_commercialType(objectNum).selectByIndex(field.commercialType_index);
    this.$select_commercialSubType(objectNum).selectByIndex(field.commercialSubType_index);
  }
  /**
   * Функция заполнения таба Местоположение и карты
   *
   * @param objectNum - номер объекта, нумерация с нуля
   */
  fillLocationAndMapTab(data: ICommercialReport, objectNum: number) {
    let field = data.location;
    this.$tab_map(objectNum).waitForClickable();
    this.$tab_map(objectNum).click();
    this.$select_address_autocomplete(objectNum).waitForDisplayed({});
    this.$select_address_autocomplete(objectNum).click();
    this.$select_address_autocomplete(objectNum).setValue(field.address);
    this.$addressInput_suggestDropdown.waitForDisplayed({ timeout: 2000, reverse: false });
    this.$addressInput_activeSuggestions.click();
    this.$input_cadastralNumber(objectNum).setValue(field.cadastralNumber);
    this.$select_localityStatus(objectNum).selectByIndex(field.localityStatus_index);
    this.$select_locationWithinLocality(objectNum).selectByIndex(
      field.locationWithinLocality_index
    );
    this.$select_buildingLine(objectNum).selectByIndex(field.buildingLine_index);
    this.$select_objectAccess(objectNum).selectByIndex(field.objectAccess_index);
  }
  /**
   * Функция заполнения таба Физические характеристики
   *
   * @param objectNum - номер объекта, нумерация с нуля
   */
  fillPhysicalDataTab(data: ICommercialReport, objectNum: number) {
    this.$tab_physical(objectNum).waitForClickable();
    this.$tab_physical(objectNum).click();
    this.fillTotalSpace(data, objectNum);
    this.$button_leasableSpace(objectNum).click();
    this.$input_spaceLeasable(objectNum).waitForDisplayed({});
    this.fillLeasableSpace(data, objectNum);
  }
  /**
   * Функция заполнения общей площади
   *
   * @param objectNum - номер объекта, нумерация с нуля
   */
  private fillTotalSpace(data: ICommercialReport, objectNum: number) {
    let field = data.totalSpace;
    this.$input_spaceTotal(objectNum).waitForDisplayed({ timeout: 10000, reverse: false });
    this.$input_spaceTotal(objectNum).setValue(field.spaceTotal);
    this.$input_spaceOffice(objectNum).setValue(field.spaceOffice);
    this.$input_condition.setValue(field.condition);
    this.$input_heat.setValue(field.heat);
    this.$input_floor.setValue(field.floor);
    this.$select_buildingWalls(objectNum).selectByIndex(field.buildingWalls_index);
    this.$select_objectClass(objectNum).selectByIndex(field.objectClass_index);
    this.$select_parkingAvailable(objectNum).selectByIndex(field.parkingAvailable_index);
  }
  /**
   * Функция заполнения арендопригодной площади
   *
   * @param objectNum - номер объекта, нумерация с нуля
   */
  private fillLeasableSpace(data: ICommercialReport, objectNum: number) {
    let field = data.leasableSpace;
    this.$input_spaceLeasable(objectNum).setValue(field.spaceTotal);
    this.$input_spaceLeasableOffice(objectNum).setValue(field.spaceOffice);
    this.$input_conditionLeasable.setValue(field.condition);
    this.$input_heatLeasable.setValue(field.heat);
    this.$input_floorLeasable.setValue(field.floor);
  }
  /**
   * Функция заполнения таба Дополнительная информация
   *
   * @param objectNum - номер объекта, нумерация с нуля
   */
  fillAdditionTab(data: ICommercialReport, id: number) {
    let field = data.addition;
    this.$tab_addition(id).waitForClickable();
    this.$tab_addition(id).click();
    this.checkbox_yes(1).waitForClickable();
    for (let i = 1; i <= 13; i++) {
      this.checkbox_yes(i).click();
    }
    this.$checkbox_inConstructionVtb_no.click();
    this.$input_depreciation.setValue(field.depreciation);
  }
  /** Функция ныряния :) в Байкал */
  goToBaikal() {
    let objectNum = 0; // переход всегда из табов первого объекта
    this.$tab_calculation(objectNum).waitForClickable();
    this.$tab_calculation(objectNum).click();
    this.$button_calculation.waitForClickable();
    this.$button_calculation.click();
    this.$modal_openCalculation.waitForDisplayed({ timeout: 1000, reverse: false });
    this.$button_saveAndOpen.waitForClickable();
    this.$button_saveAndOpen.click();
  }
  /**
   * Функция заполнения объекта
   *
   * @param objectNum - номер объекта, нумерация с нуля
   */
  fillData(data: ICommercialReport, id: number) {
    this.waitForLoad();
    this.fillResultTab(data, id);
    this.fillLocationAndMapTab(data, id);
    this.fillPhysicalDataTab(data, id);
    this.fillAdditionTab(data, id);
  }
}
export const baReportCommercialObjectTab = new BaReportCommercialObjectTab();

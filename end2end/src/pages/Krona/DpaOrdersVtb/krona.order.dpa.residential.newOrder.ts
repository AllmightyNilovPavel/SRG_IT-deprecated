export class KronaOrderDpaResidentialNewOrder {
  protected path = "/valuation/dpa/order/auto/ver2";
  protected path_new = "/valuation/dpa/order/auto/ver2/new";

  /**  */
  private get $root_newOrder() {
    return $(`#dpaOrderForm`);
  }
  /** Номер заказа */
  protected get $info_orderNumber() {
    return this.$root_newOrder.$(`#orderNumber`);
  }
  /** Автор заказа */
  protected get $info_orderAuthor() {
    return this.$root_newOrder.$(`#author`);
  }
  /** Департамент */
  protected get $info_department() {
    return this.$root_newOrder.$(`#department`);
  }
  /** Работа с проблемной задолженностью */
  protected get $selector_dpaWork() {
    return this.$root_newOrder.$(`#dpaWork`);
  }
  /** Предполагаемое использование */
  protected get $selector_intendedUse() {
    return this.$root_newOrder.$(`#intendedUse`);
  }
  /** Департамент */
  protected get $info_orderType() {
    return this.$root_newOrder.$(`#orderType`);
  }
  /** Тип объекта */
  protected get $selector_objectType() {
    return this.$root_newOrder.$(`#objectType`);
  }
  /** Описание объекта оценки */
  protected get $input_valuableObjectDescription() {
    return this.$root_newOrder.$(`#valuableObjectDescription`);
  }
  /** Кадастровый номер */
  protected get $input_cadastralNumber() {
    return this.$root_newOrder.$(`#cadastralNumber`);
  }
  /** Кадастровый номер ЗУ */
  protected get $input_landCadastralNumber() {
    return this.$root_newOrder.$(`#landCadastralNumberDiv`);
  }
  /** Адрес объекта */
  protected get $input_objectAddress() {
    return this.$root_newOrder.$(`#objectAddress`);
  }
  protected get $dropdownAddressSuggest() {
    return $(
      `//*[@id='dpaOrderForm']//*[@id='objectAddress']/..//div[@class='tt-menu tt-open']/div[@class='tt-dataset tt-dataset-0']/div`
    );
  }
  /** Субъект РФ */
  protected get $info_addressSubject() {
    return this.$root_newOrder.$(`#region`);
  }
  /** Внешний осмотр */
  protected get $selector_externalInspection() {
    return this.$root_newOrder.$(`#externalInspection`);
  }
  /** Внутренний осмотр */
  protected get $selector_internalInspection() {
    return this.$root_newOrder.$(`#internalInspection`);
  }
  /** Причины отсутствия осмотра */
  protected get $input_inspectionAbsenceReason() {
    return this.$root_newOrder.$(`#inspectionAbsenceReason`);
  }
  /** Допущение о состоянии отделки */
  protected get $selector_flatRepairs() {
    return this.$root_newOrder.$(`#flatRepairs`);
  }
  /** Адрес доставки отчёта */
  protected get $input_deliveryAddress() {
    return this.$root_newOrder.$(`#deliveryAddress`);
  }
  /** Контакты для осмотра */
  protected get $selector_inspectionContacts() {
    return this.$root_newOrder.$(`#inspectionContacts`);
  }
  /** Наименование организации */
  protected get $input_inspectionContactCompany() {
    return this.$root_newOrder.$(`#inspectionContactCompany`);
  }
  /** ФИО контактного лица */
  protected get $input_inspectionContactFIO() {
    return this.$root_newOrder.$(`#inspectionContactFio`);
  }
  /** Контактный имейл */
  protected get $input_inspectionContactEmail() {
    return this.$root_newOrder.$(`#inspectionContactEmail`);
  }
  /** Контактный телефон для осмотра */
  protected get $input_inspectionContactPhone() {
    return this.$root_newOrder.$(`#inspectionContactPhone`);
  }
  /** Оценщик */
  protected get $selector_appraiser() {
    return this.$root_newOrder.$(`#appraiser`);
  }
  /** Комментарий */
  protected get $input_comment() {
    return this.$root_newOrder.$(`#comment`);
  }
  /** Кнопка "Сохранить" */
  protected get $button_saveOrder() {
    return $(`#saveOrder`);
  }
  /** Кнопка "Отправить" */
  protected get $button_sendOrder() {
    return $(`#sendOrder`);
  }
  /** Кнопка "Отказаться от заказа" */
  protected get $button_cancelOrder() {
    return $(`#cancelOrder`);
  }
}

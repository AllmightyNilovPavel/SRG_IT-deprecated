import { options } from "options";

import {
  BaQualifiedRepairState,
  BaResidentialBanks,
  BaActionsWorkJournal,
  BaResidentialObjectType,
  BuildingStage,
  BaResidentialIsTownhouse,
  BaResidentialValuationPart,
  BaResidentialOwnership,
  CloneOptions,
  BaResidentialSignType,
  BaResidentialIntendedUse,
  BaResidentialUserDepartment,
  BaDocumentVersionForLoading,
} from "./enums";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";
import { debugLogging, FindElementByText } from "modules";
import { EnumKeyboardButtons } from "pages/baikal";

export class BaReportPage {
  path = "/report.html";

  // ------------------------- Шапки модальных окон ----------------------------
  header_payConfirm = "Подтверждение оплаты отчета";
  header_paySuccess = "Оплата прошла успешно";
  // ---------------------------------------------------------------------------
  //                              общие элементы
  // ---------------------------------------------------------------------------
  private get $base() {
    return $(`#report-container`);
  }
  private get $overlay_loading() {
    // окно загрузки
    return browser.$(".blockUI.blockOverlay");
  }
  get $text_reportNumber() {
    return $(`#reportEditor > span[data-bind="text: reportNumber"]`).getText();
  }
  get $info_revokeComment() {
    return this.$base.$(`#revokeCommentBlock`);
  }
  get $info_revokeCommentText() {
    return this.$info_revokeComment.$(`span`);
  }
  /** модальное окно, что успешно сохранилось */
  private get $overlay_saveConfirm() {
    return browser.$("#body > div.bootbox.modal.in");
  }
  private get $overlay_reportVersionChoice() {
    return browser.$("#body > div.bootbox.modal.in");
  }
  private get $button_versionServer() {
    return this.$overlay_reportVersionChoice.$(`a.btn.null`);
  }
  /** Окно подписи отчёта */
  private get $overlay_signReport() {
    return $(`#digitalSignModal`);
  }

  private get $button_startEcsSign() {
    return this.$overlay_signReport.$(`button[data-bind*='onDigitalSign']`);
  }
  private get $selector_signatureType() {
    return this.$overlay_signReport.$(`select`);
  }
  /** подтверждение сохранения отчёта */
  private get $button_saveConfirm() {
    return this.$overlay_saveConfirm.$("a.btn-success");
  }
  /** модальное окно подтверждения удаления */
  get $overlay_confirm() {
    return $("div.bootbox.modal.in");
  }
  get $text_overlayConfirmHeader() {
    return this.$overlay_confirm.$(`div.modal-header > h3`).getText();
  }
  /** кнопка подтверждения удаления */
  get $button_deleteConfirm() {
    return this.$overlay_confirm.$("div.modal-footer > a.btn.btn-primary");
  }
  get $button_payConfirm() {
    return $(`a[data-handler="1"]`);
  }
  /** модальное окно с инфо об успешном удалении */
  private get $overlay_deleteSuccess() {
    return this.$overlay_confirm.$(`div.modal-body`);
  }
  /** кнопка подтвеждения успешного удаления */
  private get $button_deleteSuccessConfirm() {
    return this.$overlay_confirm.$("div.modal-footer > a");
  }
  /** Базовый элемент содержащий первичные кнопки управления */
  private get $base_reportActionButtons() {
    return $(`#reportActionButtons`);
  }
  /** кнопка ОПЛАТИТЬ отчёт */
  get $button_payReport() {
    return this.$base_reportActionButtons.$(`a.payBtn.btn-warning`);
  }
  /** кнопка ИЗМЕНИТЬ отчёт */
  get $button_changeReport() {
    return this.$base_reportActionButtons.$("a.changeBtn.btn-warning");
  }
  /** кнопка ЗАВЕРШИТЬ И ОТПРАВИТЬ отчёт */
  get $button_sendToFa() {
    return this.$base_reportActionButtons.$("a.completeOrderFaBtn");
  }
  /** кнопка ПОДПИСАТЬ отчёт */
  get $button_signReport() {
    return this.$base_reportActionButtons.$("a.signBtn.btn-success");
  }
  /** кнопка СОХРАНИТЬ отчёт */
  get $button_saveReport() {
    return this.$base_reportActionButtons.$("a.saveBtn.btn-primary");
  }
  /** Кнопка "проверить отчёт" */
  get $button_checkReportForErrors() {
    return this.$base_reportActionButtons.$(`a.btn.validateBtn.btn-primary`);
  }
  get $button_revokeReport() {
    return this.$base_reportActionButtons.$(`a.btn.revokeBtn.btn-warning`);
  }
  /** кнопка ПЕЧАТЬ отчёта */
  get $button_printReport() {
    return this.$base_reportActionButtons.$(`a.printBtn`);
  }
  /** Базовый элемент содержащий вторичные кнопки управления */
  private get $base_reportActionButtons2() {
    return $(`#reportActionButtons2`);
  }
  /** Удалить отчёт */
  private get $button_deleteReport() {
    return this.$base_reportActionButtons2.$(`a.delBtn`);
  }
  /** Заполнить из */
  protected get $button_cloneFrom() {
    return this.$base_reportActionButtons2.$(`a.cloneFromBtn`);
  }
  /** Клонировать отчёт */
  private get $button_clone() {
    return this.$base_reportActionButtons2.$(`a.cloneBtn`);
  }
  /** Кнопка "Открыть Журнал действий" */
  get $button_workJournal() {
    return this.$base_reportActionButtons2.$(`a.auditBtn`);
  }
  private get $modal_cloneReportOptions() {
    return $(`#cloneModal`);
  }
  private get $button_cloneReportOptionsConfirm() {
    return this.$modal_cloneReportOptions.$(`button[onclick="sendCloneJSON()"]`);
  }

  /** Пароль для подписи */
  private get $input_signPwd() {
    return $(`#signPassword`);
  }
  private get $button_signReportWithPassword() {
    return $(`button[data-bind="click: onPasswordSign"]`);
  }

  private get $selector_ecs() {
    return this.$overlay_signReport.$(`select[data-bind*='Выберите сертификат']`);
  }
  // ---------------------------------------------------------------------------
  //                            Окно Журнала Действий
  // ---------------------------------------------------------------------------
  /** Модальное окно "Журнала работы" */
  get $modal_workJournal() {
    return $(`div#journalModal`);
  }
  /** Текст в шапке для проверок */
  get $text_workJournalHeader() {
    return this.$modal_workJournal.$(`div.modal-header > h3`).getText();
  }
  /** Кнопка "закрыть журнал работы" */
  get $button_closeWorkJournal() {
    return this.$modal_workJournal.$(`div.modal-header > button.close`);
  }
  /** `#audits_wrapper` */
  private get $table_workJournalData() {
    return this.$modal_workJournal.$(`#audits_wrapper`);
  }
  private get $loader_workJournalData() {
    return this.$modal_workJournal.$(`#audits_processing`);
  }
  // ---------------------------------------------------------------------------
  //                            Окно печати отчёта
  // ---------------------------------------------------------------------------
  get $base_modalPrintReport() {
    return $(`#printReportModal`);
  }
  get $button_jsonPreview() {
    return this.$base_modalPrintReport.$(`#json-preview-list`);
  }
  get $button_wordAgreement() {
    return this.$base_modalPrintReport.$(`#word-agreement`);
  }
  get $button_printQualityMax() {
    return this.$base_modalPrintReport.$(`#word-max`);
  }
  get $button_printQualityMiddle() {
    return this.$base_modalPrintReport.$(`#word-middle`);
  }
  get $button_printQualityMin() {
    return this.$base_modalPrintReport.$(`#word-min`);
  }
  get $button_conclusion() {
    return this.$base_modalPrintReport.$(`#word-conclusion`);
  }
  get $button_calculations() {
    return this.$base_modalPrintReport.$(`#word-calculations`);
  }
  //----------------------------------------------------------------------------
  //                     Модальное окно "заполнить из"
  // --------------------------------------------------
  private get $modalCloneFromRoot() {
    return $(`//h4[@class='fl'][contains(text(),'Заполнить')]/..`);
  }
  get $modalCloneFromInputReportNumber() {
    return this.$modalCloneFromRoot.$(`.//input[@class='search-query search-for-clone tt-input']`);
  }
  // ---------------------------------------------------------------------------
  //                            Задание на оценку
  // ---------------------------------------------------------------------------
  /** номер заказа
   * `input#kronaId`
   */
  get $input_orderNumber() {
    return this.$base.$(`input#kronaId`);
  }

  // -------------------------- Договор на оценку ------------------------------
  /** номер договора
   * `input#agreementNumber`
   */
  get $input_agreementNumber() {
    return this.$base.$(`input#agreementNumber`);
  }
  /** дата договора
   * `input#agreementDate`
   */
  get $input_agreementDate() {
    return this.$base.$("input#agreementDate");
  }
  get $selector_bank() {
    return $(`#bank`);
  }
  /** Цена услуг по договору (Только ВТБ) */
  get $input_appraisalServicePrice() {
    return $(`#appraisalServicePrice`);
  }
  /** Цель оценки */
  get $input_appraisalPurpose() {
    return $(`#appraisalPurpose`);
  }
  /** строка ввода "предполагаемое использование результатов" для всех Банков */
  get $input_intendedUse() {
    return $(`#intendedUse`);
  }
  /** выпадающий список "предполагаемое исп. рез-ов" для ВТБ */
  get $selector_intendedUseVTB() {
    return $("#intendedUseVTB");
  }
  /** Оцениваемые права
   * `#appraisalOwnership`
   */
  get $input_appraisalOwnership() {
    return $(`#appraisalOwnership`);
  }
  /** Обременения
   * `#encumbrances`
   */
  get $input_encumbrances() {
    return $(`#encumbrances`);
  }
  /** Источник информации по Обременениям
   * `#encumbrancesInfoSource`
   */
  get $input_encumbrancesInfoSource() {
    return $(`#encumbrancesInfoSource`);
  }
  // ------------------------ Сведения о заказчике -----------------------------
  get $selector_customerType() {
    return $("#customerType");
  }
  /** "ФИО заказчика" - физЛицо \ "Наименование" - юрЛицо */
  get $input_customerFullName() {
    return $("#customerFullName");
  }
  /** "Адрес заказчика" - физЛицо \ "Место нахождения" - юрЛицо */
  get $input_customerAddress() {
    return $("#customerAddress");
  }
  get $input_customerPassportSerial() {
    return $("#customerPassportSeries");
  }
  get $input_customerPassportNum() {
    return $("#customerPassportNumber");
  }
  get $input_customerPassportDate() {
    return $("#customerPassportDate");
  }
  get $input_customerPassportIssuer() {
    return $("#customerPassportIssuer");
  }
  // ------------------------ Подписанты по отчёту -----------------------------
  /** Оценщик
   * `#appraiserSignatory`
   */
  get $selector_appraiserSignatory() {
    return $(`#appraiserSignatory`);
  }
  /** Подписант от лица организации
   * `#signatory`
   */
  get $selector_directorSignatory() {
    return $(`#signatory`);
  }
  // --------------------------- Тип объекта оценки -----------------------------
  /** Вид объекта
   * `#reportType`
   */
  get $selector_objectType() {
    return $(`#reportType`);
  }
  /** Стадия строительства
   * `#valuationObjectType`
   */
  get $selector_buildingStage() {
    return $(`#valuationObjectType`);
  }
  /** Объект оценки является таунхаусом
   * `#isValuationObjectTownhouse`
   */
  get $selector_isTownhouse() {
    return $(`#isValuationObjectTownhouse`);
  }
  get $selector_registeredOwnership() {
    return $(`select#registeredOwnership`);
  }
  /** Указать в отчёте стоимость
   * `#share`
   */
  get $selector_objectSharePart() {
    return $(`#share`);
  }
  /** Текущее использование Объекта оценки
   * `#currentUse`
   */
  get $input_currentUse() {
    return $(`#currentUse`);
  }
  // -------------------------- Адрес объекта оценки ----------------------------
  /** Адрес по документам
   * `#addressDoc`
   */
  get $input_addressDoc() {
    return $(`#addressDoc`);
  }
  /** Адрес по ФИАС
   * `#dadataAddress`
   */
  get $input_fiasAddress() {
    return $(`#dadataAddress`);
  }
  private get $addressAutocomplete_root() {
    return $(`ul.ui-autocomplete.ui-menu.ui-corner-all`);
  }
  /** Строчка выбора адреса из подсказки */
  get $select_addressSuggest() {
    return this.$addressAutocomplete_root.$(`a.ui-corner-all`);
  }
  /** Область (Субъект РФ) */
  get $input_region() {
    return $(`#region`);
  }
  /** Административный район */
  get $input_area() {
    return $(`#area`);
  }
  /** Населённый пункт */
  get $input_city() {
    return $(`#city`);
  }
  /** Улица */
  get $input_street() {
    return $(`#street`);
  }
  /** Номер дома */
  get $input_houseNumber() {
    return $(`#houseNumber`);
  }
  /** Номер квартиры
   * `#appartment`
   */
  get $input_appartment() {
    return $(`#appartment`);
  }
  /** Кдастровый / Условный номер
   * `#cadastralNumber`
   */
  get $input_cadastralNumber() {
    return $(`#cadastralNumber`);
  }

  // --------------------------- Банк и форма отчёта ----------------------------
  /** Департамент
   * `#division`
   */
  get $selector_division() {
    return $(`#division`);
  }
  /** Отделение\сотрудник банка
   * `#bankUser`
   */
  get $input_bankUser() {
    return $(`#bankUser`);
  }
  protected get $dropdown_bankUser() {
    return $(`//*[contains(text(),"Якубов Александр")]`);
  }
  /** Наименование банка
   * `#forBank`
   */
  get $input_bankName() {
    return $(`#forBank`);
  }
  /** Печатная форма
   * `#printForm`
   */
  get $selector_printForm() {
    return $(`#printForm`);
  }
  /** ФИО Заёмщика
   * `#borrowerName`
   */
  get $input_borrowerName() {
    return $(`#borrowerName`);
  }
  get $button_copyCustomerToBorrower() {
    return $(`button[onclick*="copyCustomerNameToBorrowerName"]`);
  }
  /***/
  get $selector_marketResearch() {
    return $(`#marketResearch`);
  }
  /** Глава "Физический износ"
   * `#wearoutAlgorithm`
   */
  get $selector_wearoutAlgorithm() {
    return $(`#wearoutAlgorithm`);
  }
  /** Глава "Ликвидационная стоимость"
   * `#liquidationAlgorithm`
   */
  get $selector_liquidationAlgorithm() {
    return $(`#liquidationAlgorithm`);
  }
  /** Весовые коэффициенты
   * `#calculationAlgorithm`
   */
  get $selector_calculationAlgorithm() {
    return $(`#calculationAlgorithm`);
  }
  /** Учитываемая при расчёте площадь объекта
   * `#whatSpaceToChoose`
   */
  get $selector_whatSpaceToChoose() {
    return $(`#whatSpaceToChoose`);
  }
  /** Карта
   * `#mapType`
   */
  protected get $selector_mapType() {
    return $(`#mapType`);
  }
  /** Округлять стоимость
   * `#roundValueVariants`
   */
  get $selector_roundValueVariants() {
    return $(`#roundValueVariants`);
  }
  // ----------------------------- Ревизиты отчёта ------------------------------
  /** * номер отчёта
   * `input#reportNumber`
   */
  get $input_reportNumber() {
    return this.$base.$("input#reportNumber");
  }
  get $button_copyAgreementNumberToReportNumber() {
    return this.$base.$(`button[onclick="reportModel.copyContractNumberToReportNumber()"]`);
  }
  /** Кнопка "Дата из договора" */
  get $button_copyDate() {
    return $(`button[onclick="reportModel.copyDate()"]`);
  }
  /** Чекбокс "Осмотр не проводился" */
  get $checkbox_noInspection() {
    return $(`#inspectionDateNo`);
  }
  /** Включить стоимость в $
   * `#includeDollarPrice`
   */
  get $checkbox_includeDollarPrice() {
    return $(`#includeDollarPrice`);
  }

  // --------------------------- Особенности осмотра ----------------------------
  /** Особенности отсутствуют
   * `#inspectionFeaturesMiss`
   */
  get $checkbox_inspectionFeaturesMiss() {
    return $(`#inspectionFeaturesMiss`);
  }
  /** Препятствия к осмотру отсутствуют */
  get $checkbox_difficultyMiss() {
    return $(`#difficultyMiss`);
  }
  // -------------------------- Материалы и информация --------------------------
  /** Необходимые для оценки материалы и информация переданы
   * `#customerInformationMiss`
   */
  get $checkbox_customerInformationMiss() {
    return $(`#customerInformationMiss`);
  }
  // -------------------------- Привлечение экспертов ---------------------------
  // --------------------- Ограничения и пределы применения ---------------------
  // -------------------- Допущения и ограничивающие условия --------------------
  /**  */
  get $checkbox_includeEncumbranceChapter() {
    return $("#includeEncumbranceChapter");
  }
  get $input_spacePlanningDocs() {
    return $("#spacePlanningDocuments");
  }
  get $input_constitutiveDocs() {
    return browser.$("#constitutiveDocuments");
  }
  get $input_encumbrancesExistDocs() {
    return browser.$("#encumbrancesExistDocuments");
  }

  // ---------------------------------------------------------------------------
  //                               Объект оценки
  // ---------------------------------------------------------------------------

  /** Источник инфо о характеристиках */
  get $input_flatDataSource() {
    return $(`#flatDataSource`);
  }
  /** Кол-во комнат */
  get $input_rooms() {
    return $(`#rooms`);
  }
  /** Комнаты - "Нет данных" */
  get $checkbox_rooms_noData() {
    return $(`#rooms_noData`);
  }
  /** Общая площадь */
  get $input_spaceTotal() {
    return $(`#spaceTotal`);
  }
  /** Жилая площадь */
  get $input_spaceLiving() {
    return $(`#spaceLiving`);
  }
  /** Жилая площадь - нет данных */
  get $checkbox_spaceLiving_noData() {
    return $(`#spaceLiving_noData`);
  }
  /** Площадь кухни */
  get $input_spaceKitchen() {
    return $(`#spaceKitchen`);
  }
  /** Площадь кухни - нет данных */
  get $checkbox_spaceKitchen_noData() {
    return $(`#spaceKitchen_noData`);
  }
  /** Площадь летних помещений */
  get $input_spaceBalcony() {
    return $(`#spaceBalcony`);
  }
  /** Площадь летних помещений - нет данных */
  get $checkbox_spaceBalcony_noData() {
    return $(`#spaceBalcony_noData`);
  }
  /** Поле "Тип комнат" */
  get $input_adjacentRooms() {
    return $(`#adjacentRooms`);
  }
  /** Поле "Высота потолков" */
  get $input_flatHeight() {
    return $(`#height`);
  }
  /** Поле "Вид из окна" */
  get $input_windowView() {
    return $(`#windowView`);
  }
  /** Летние помещения */
  get $input_balconyType() {
    return $(`#balconyType`);
  }
  /** Селектор "Общее состояние помещений" */
  private get $selector_qualifiedRepairsState() {
    return $(`#qualifiedRepairsState`);
  }
  /** Описание отделки если ИНОЕ */
  private get $input_repairState() {
    return $(`#state`);
  }
  /** Конструктивные Элементы - Полы */
  get $input_floorDescription() {
    return $(`#descriptionOfFloring`);
  }
  /** Конструктивные Элементы - Потолок */
  get $input_ceilingDescription() {
    return $(`#descriptionOfCeilling`);
  }
  /** Конструктивные Элементы - Стены */
  get $input_wallDescription() {
    return $(`#descriptionOfWalls`);
  }
  /** Конструктивные Элементы - Окна */
  get $input_windowsDescription() {
    return $(`#descriptionOfWindows`);
  }
  /** Конструктивные Элементы - Входная дверь */
  get $input_doorDescription() {
    return $(`#descriptionOfDoor`);
  }
  /** Конструктивные Элементы - Внутренние двери */
  get $input_innerDoorsDescription() {
    return $(`#descriptionOfInnerDoor`);
  }
  /** Кондиционирование */
  get $input_conditioner() {
    return $(`#conditioner`);
  }
  /** Отопительные приборы */
  get $input_heaters() {
    return $(`#heaters`);
  }
  /** Противопожарная безопасность */
  get $input_fireproof() {
    return $(`#fireproof`);
  }
  /** Дополнительные удобства */
  get $input_facilities() {
    return $(`#facilities`);
  }
  // ---------------------------------------------------------------------------
  // Здание и подъезд
  // ---------------------------------------------------------------------------
  /** Серия Здания
   * `#buldingSeries`
   */
  get $input_buldingSeries() {
    return $(`#buldingSeries`);
  }
  /** Этажность
   * `#storeys`
   */
  get $input_storeys() {
    return $(`#storeys`);
  }
  /** Материал наружных стен
   * `#buildingWalls`
   */
  get $input_buildingWalls() {
    return $(`#buildingWalls`);
  }
  /** Материал стен БТИ
   * `#buildingWallsBTI`
   */
  get $input_buildingWallsBTI() {
    return $(`#buildingWallsBTI`);
  }
  /** Материал наружных стен
   * `#buildingCeillings`
   */
  get $input_buildingCeillings() {
    return $(`#buildingCeillings`);
  }
  /** Тип перегородок
   * `#partitionType`
   */
  get $input_partitionType() {
    return $(`#partitionType`);
  }
  /** Год постройки
   * `#builtInYear`
   */
  get $input_builtInYear() {
    return $(`#builtInYear`);
  }
  /** Здание является аварийным\ветхим
   * `select[data-bind*='dilapidated']`
   */
  get $selector_dilapidated() {
    return $(`select[data-bind*='dilapidated']`);
  }
  /** Здание участвует в реновации
   * `#involvedInTheRenovation`
   */
  get $selector_renovation() {
    return $(`#involvedInTheRenovation`);
  }
  /** Общее состояние здания
   * `#stateOfBuilding`
   */
  get $input_stateOfBuilding() {
    return $(`#stateOfBuilding`);
  }
  /** Состояние кровли
   * `#stateOfRoof`
   */
  get $input_stateOfRoof() {
    return $(`#stateOfRoof`);
  }
  /** Кол-во квартир на этаже
   * `#numberOfFlatsOnTheFloor`
   */
  get $input_floorFlatsCount() {
    return $(`#numberOfFlatsOnTheFloor`);
  }
  /** Наличие втроенныо-пристроенных нежилых помещений
   * `#extensions`
   */
  get $input_extensions() {
    return $(`#extensions`);
  }
  /** Наличие дополнительных услуг для жильцов
   * `#services`
   */
  get $input_services() {
    return $(`#services`);
  }
  /** Прочие особенности дома
   * `#features`
   */
  get $input_features() {
    return $(`#features`);
  }
  // ---------------------------------------------------------------------------
  // Местоположение и карта
  // ---------------------------------------------------------------------------
  /** Административный округ
   * `#administrativeRegion`
   */
  get $input_administrativeRegion() {
    return $(`#administrativeRegion`);
  }
  /** Район города
   * `#district`
   */
  get $input_district() {
    return $(`#district`);
  }
  /** Средняя стоимость объектов этого класса
   * `#averagePrice`
   */
  get $input_averagePrice() {
    return $(`#averagePrice`);
  }
  /** Эстетичность окружающей застройки
   * `#esthetic`
   */
  get $input_esthetic() {
    return $(`#esthetic`);
  }
  /** Ликвидность
   * `#liquidity`
   */
  get $input_liquidity() {
    return $(`#liquidity`);
  }
  /** Наличие расположенных рядом объектов
   * `#nearPlantDescriptions`
   */
  get $input_nearPlantDescriptions() {
    return $(`#nearPlantDescriptions`);
  }
  // ---------------------------------------------------------------------------
  // Аналоги
  // ---------------------------------------------------------------------------
  /** Кнопка "Копир" у аналога №1 */
  get $button_copyMainObjToAnalog1() {
    return $(`#copy0`);
  }
  /** Кнопка "Копир" у аналога №2 */
  get $button_copyMainObjToAnalog2() {
    return $(`#copy1`);
  }
  /** Кнопка "Копир" у аналога №2 */
  get $button_copyMainObjToAnalog3() {
    return $(`#copy2`);
  }
  // ---------------------------------------------------------------------------
  // Корректировки
  // ---------------------------------------------------------------------------
  /**  */
  get $() {
    return $(``);
  }
  // ---------------------------------------------------------------------------
  // Ликвидационная стоимость
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Изображения и документы
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  //                                    Функции
  // ---------------------------------------------------------------------------
  private closeMapModalWindow() {
    browser.pause(1000);
    if ($(`//*[contains(text(),'Карта устарела или была изменена.')]`).isDisplayed()) {
      let target = $(`//div[@class='modal-footer']/a[contains(text(),'ОК')]`);
      target.waitForClickable();
      target.click();
    }
  }
  fillReportFromAnother(reportNumber: string) {
    let target = $(`a.cloneFromBtn`);
    target.waitForClickable();
    target.click();
  }
  waitForWorkjournalLoad() {
    this.$modal_workJournal.waitForExist();
    this.$loader_workJournalData.waitForDisplayed({ timeout: 2000, reverse: true });
  }
  /** Загрузка страницы */
  waitForLoad(documentVersion?: BaDocumentVersionForLoading) {
    browser.waitUntil(() => browser.getUrl().match(/report\.html/) !== null, {
      timeout: 30000,
      timeoutMsg: `Карточка отчёта не прогрузилась.`,
    });
    browser.pause(3000);
    let loadFromServer: WebdriverIO.Element = $(
      `//a[contains(text(),'Последняя версия на сервере')]`
    );
    let loadFromLocal: WebdriverIO.Element = $(`//a[contains(text(),'Автосохраненная версия')]`);

    if (loadFromLocal.isDisplayed() || loadFromServer.isDisplayed()) {
      debugLogging(`Элемент найденный методом: ${loadFromLocal.elementId}`);
      debugLogging(`Элемент найденный селектором: ${loadFromServer.elementId}`);
      if (documentVersion)
        documentVersion === BaDocumentVersionForLoading.SERVER
          ? loadFromServer.click()
          : loadFromLocal.click();
      else loadFromServer.click();
    }

    browser.waitUntil(
      () => this.$button_saveReport.isClickable() || this.$button_revokeReport.isClickable(),
      { timeout: 20000, timeoutMsg: `Страница ${browser.getUrl()} не прогрузилась.` }
    );

    debugLogging("Открыт отчёт ", browser.getUrl());
  }
  /** Сохранить отчёт */
  saveReport() {
    debugLogging("Сохранение отчёта");
    this.$button_saveReport.scrollIntoView();
    this.$button_saveReport.waitForClickable();
    this.$button_saveReport.click();
    this.closeMapModalWindow();
    this.$overlay_saveConfirm.waitForDisplayed({});
    this.$button_saveConfirm.click();
    browser.refresh();
    this.waitForLoad();
  }
  /** Оплатить отчёт */
  payReport() {
    debugLogging("Оплата отчёта");

    this.$button_payReport.scrollIntoView();
    this.$button_payReport.isDisplayed();
    this.$button_payReport.click();
    this.$overlay_confirm.waitForDisplayed({});

    this.$button_payConfirm.waitForClickable({ reverse: false });
    this.$button_payConfirm.click();
    this.$overlay_confirm.waitForDisplayed({});

    this.$button_deleteConfirm.waitForClickable({ reverse: false });
    this.$button_deleteConfirm.click();
    debugLogging("Оплата отчёта прошла успешно");
  }
  /** Удалить отчёт */
  deleteReport() {
    debugLogging("Удаление отчёта");
    let temp: string;

    this.$button_deleteReport.scrollIntoView();
    this.$button_deleteReport.waitForDisplayed({});
    this.$button_deleteReport.click();
    this.$overlay_confirm.waitForDisplayed({});
    this.$button_deleteConfirm.click();
    this.$overlay_deleteSuccess.waitForDisplayed({});
    temp = this.$overlay_deleteSuccess.getText();
    if (temp === "Отчет успешно удален!") this.$button_deleteSuccessConfirm.click();
  }
  /** Клонировать отчёт */
  cloneReport(cloneOption: CloneOptions) {
    debugLogging("Клонирование отчёта");

    this.$button_clone.scrollIntoView();
    this.$button_clone.waitForDisplayed({});
    this.$button_clone.click();

    browser.pause(1000);
    if (FindElementByText("Отчет не может быть изменен.").isDisplayed()) {
      let target = FindElementByText("Отчет не может быть изменен.");
      target.$(`/..//a`).click();
      target.waitForDisplayed({ reverse: true });
    }
    this.$modal_cloneReportOptions.waitForDisplayed({});
    this.$modal_cloneReportOptions.$(`${cloneOption}`).click();
    this.$button_cloneReportOptionsConfirm.click();

    if (browser.isAlertOpen()) browser.acceptAlert();
  }
  /** Подписать отчёт */
  signReport(signType: BaResidentialSignType, password: string) {
    debugLogging("Подпись отчёта");
    browser.refresh();
    this.waitForLoad();
    this.$button_checkReportForErrors.waitForClickable();
    this.$button_checkReportForErrors.click();
    debugLogging(`Проверили отчёт на ошибки и сделали скриншот.`);

    this.$button_signReport.scrollIntoView();
    this.$button_signReport.waitForDisplayed({
      timeoutMsg: `Кнопка "Подписать отчёт" недоступна.`,
    });
    this.$button_signReport.click();

    this.$overlay_signReport.waitForDisplayed({});

    if (signType === BaResidentialSignType.PASSWORD) {
      this.$selector_signatureType.waitForClickable({
        reverse: false,
        timeoutMsg: `Нет возможности выбрать тип подписи "${signType}"`,
      });
      this.$selector_signatureType.selectByIndex(signType);
      this.$input_signPwd.waitForClickable({ reverse: false });
      this.$input_signPwd.setValue(password);
      this.$button_signReportWithPassword.waitForClickable({ reverse: false });
      this.$button_signReportWithPassword.click();
      this.$overlay_confirm.waitForDisplayed({ timeout: 50000, reverse: false });
      this.$button_deleteConfirm.waitForClickable({ reverse: false });
      this.$button_deleteConfirm.click();
    } else if (signType === BaResidentialSignType.ECS) {
      this.$selector_signatureType.waitForClickable({
        reverse: false,
        timeoutMsg: `Нет возможности выбрать тип подписи "${signType}"`,
      });
      this.$selector_signatureType.selectByIndex(signType);

      this.$selector_ecs.selectByIndex(1);
      this.$button_startEcsSign.click();
      this.$overlay_confirm.waitForDisplayed({ timeout: 50000, reverse: false });
      this.$button_deleteConfirm.waitForClickable({ reverse: false });
      this.$button_deleteConfirm.click();
    }
  }
  select_repairState(repairState: BaQualifiedRepairState) {
    if (repairState !== BaQualifiedRepairState.OTHER)
      this.$selector_qualifiedRepairsState.selectByAttribute("value", repairState);
    else {
      this.$selector_qualifiedRepairsState.selectByAttribute("value", repairState);
      this.$input_repairState.setValue("Хорошее");
    }
  }

  setSignUsers(appraiser?: string, director?: string) {
    if (!appraiser) {
      this.$selector_appraiserSignatory.scrollIntoView();
      this.$selector_appraiserSignatory.selectByAttribute(
        "value",
        TestDataBa.Users.ids.Zarnitsa.admin
      );
    } else {
      this.$selector_appraiserSignatory.scrollIntoView();
      this.$selector_appraiserSignatory.selectByAttribute("value", appraiser);
    }
    debugLogging("Оценщик = ", this.$selector_appraiserSignatory.getValue());
    if (!director) {
      this.$selector_directorSignatory.scrollIntoView();
      this.$selector_directorSignatory.selectByAttribute(
        "value",
        TestDataBa.Users.ids.Zarnitsa.admin
      );
    } else {
      this.$selector_directorSignatory.scrollIntoView();
      this.$selector_directorSignatory.selectByAttribute("value", director);
    }
    debugLogging("Директор = ", this.$selector_directorSignatory.getValue());
  }

  getSignUser() {
    return this.$selector_appraiserSignatory.getValue();
  }

  select_bank(bank: BaResidentialBanks) {
    let target = this.$selector_bank;
    target.scrollIntoView();
    target.selectByAttribute("value", bank);

    switch (bank) {
      case BaResidentialBanks.VTB:
        browser.waitUntil(() => this.$input_appraisalServicePrice.isDisplayedInViewport() === true);
        break;

      default:
        browser.pause(2000);
        break;
    }
  }
  input_agreementNumber(agreementNumber: string) {
    this.$input_agreementNumber.scrollIntoView();
    this.$input_agreementNumber.waitForClickable();
    this.$input_agreementNumber.setValue(agreementNumber);
  }
  /**
   * Функция ввода номера отчёта
   *
   * @param copyAgreementNum - копировать номер Договора? (`boolean`)
   * @param reportNumber - номер отчёта (`string`)
   */
  input_reportNumber(copyAgreementNum: boolean, reportNumber: string) {
    if (copyAgreementNum === true) {
      this.input_agreementNumber(reportNumber);
      this.$button_copyAgreementNumberToReportNumber.scrollIntoView();
      this.$button_copyAgreementNumberToReportNumber.waitForClickable();
      this.$button_copyAgreementNumberToReportNumber.click();
      browser.waitUntil(() => this.$text_reportNumber.match(reportNumber) !== null);
    } else {
      this.$input_reportNumber.scrollIntoView();
      this.$input_reportNumber.waitForClickable();
      this.$input_reportNumber.setValue(reportNumber);
      this.$base_reportActionButtons.scrollIntoView();
      browser.waitUntil(() => this.$text_reportNumber.match(reportNumber) !== null);
    }
  }

  /**
   * Функция поиска деййствий в Жернале работы
   *
   * @param action - Действие которое необходимо найти
   */
  workjournal_findAction(action: BaActionsWorkJournal) {
    // return this.$table_workJournalData.$(`tbody>tr>td:contains("${action}")`);
    return $(`//*[@id="audits"]//td[contains(text(),"${action}")]`);
  }

  selectObjectType(objectType: BaResidentialObjectType) {
    this.$selector_objectType.scrollIntoView();
    this.$selector_objectType.selectByAttribute("value", objectType);
  }
  selectObjectBuildingStage(buildingStage: BuildingStage) {
    this.$selector_buildingStage.scrollIntoView();
    this.$selector_buildingStage.selectByAttribute("value", buildingStage);
  }
  selectObjectIsTownhouseAttr(data: BaResidentialIsTownhouse) {
    this.$selector_isTownhouse.scrollIntoView();
    this.$selector_isTownhouse.selectByIndex(data);
  }
  selectObjectValuationPart(valuationPart: BaResidentialValuationPart) {
    this.$selector_objectSharePart.scrollIntoView();
    this.$selector_objectSharePart.selectByAttribute("value", valuationPart);
  }
  selectRegisteredOwnership(ownership: BaResidentialOwnership) {
    this.$selector_registeredOwnership.scrollIntoView();
    this.$selector_registeredOwnership.selectByAttribute("value", ownership);
  }
  selectDivision(department: BaResidentialUserDepartment) {
    this.$selector_division.waitForExist();
    this.$selector_division.scrollIntoView();
    this.$selector_division.selectByAttribute("value", department);
  }
  setBankUser(userOrOfficeName?: string) {
    let bankUser: string = userOrOfficeName
      ? userOrOfficeName
      : TestDataBa.ResidentialReport.VTB.bankUser;

    this.$input_bankUser.waitForExist();
    this.$input_bankUser.scrollIntoView();
    this.$input_bankUser.waitForEnabled();
    this.$input_bankUser.setValue(bankUser);
    this.$dropdown_bankUser.waitForExist();
    this.$dropdown_bankUser.waitForDisplayed({ timeout: 1000, reverse: false });
    this.$dropdown_bankUser.click();
    this.$dropdown_bankUser.waitForDisplayed({ timeout: 1000, reverse: true });
  }

  setAppraisalObjectAddress(address?: string) {
    let workingAddress: string = address
      ? address
      : TestDataBa.ResidentialReport.default.AssesmentTask.AppraisalObjectAddress.address;
    this.$input_fiasAddress.waitForExist();
    this.$input_fiasAddress.scrollIntoView();
    this.$input_fiasAddress.click();
    this.$input_fiasAddress.setValue(workingAddress);
    this.$addressAutocomplete_root.waitForDisplayed({ timeout: 10000, reverse: false });
    this.$select_addressSuggest.waitForExist();
    this.$select_addressSuggest.scrollIntoView();
    this.$select_addressSuggest.waitForClickable();
    this.$select_addressSuggest.click();

    if (options.debug) {
      debugLogging("Данные адреса");
      debugLogging("Полный адрес: ", this.$input_fiasAddress.getValue());
      debugLogging("Город: ", this.$input_city.getValue());
      debugLogging("Улица: ", this.$input_street.getValue());
    }

    browser.waitUntil(
      () =>
        this.$input_fiasAddress.getValue() !== null &&
        // this.$input_region.getText() !== null &&
        this.$input_city.getValue() !== null &&
        this.$input_street.getValue() !== null,
      { timeout: 3000, timeoutMsg: "Адрес не был выбран" }
    );

    this.$input_addressDoc.setValue(workingAddress);
  }

  selectIntentedUse(intendedUse: BaResidentialIntendedUse) {
    if (this.$selector_bank.getValue() === BaResidentialBanks.VTB) {
      this.$selector_intendedUseVTB.waitForExist();
      this.$selector_intendedUseVTB.selectByAttribute("value", intendedUse);
    } else {
      this.$input_intendedUse.waitForExist();
      this.$input_intendedUse.setValue(intendedUse);
    }
  }
  /**
   * Функция заполнения обязательных полей отчёта в зависимости от выбранного банка
   *
   * @param bank - обязательный параметр БАНК
   * @param reportNumber - необязательный параметр "номер отчёта"
   */
  setReportData(bank: BaResidentialBanks, reportNumber?: string) {
    let tempDate = new Date();
    // Заполнение поля "номер договора"
    reportNumber != null
      ? this.$input_agreementNumber.setValue(reportNumber)
      : this.$input_agreementNumber.setValue("autotest" + tempDate.toString());
    // Ввод текущей даты (хитрым способом)
    this.$input_agreementDate.click();
    browser.keys(["f", "Tab"]);
    // Выбор банка
    this.select_bank(bank);
    // Для начала будем основываться на ВТБ
    this.$input_appraisalServicePrice.waitForEnabled();
    this.$input_appraisalServicePrice.setValue(
      TestDataBa.ResidentialReport.VTB.appraisalServicePrice
    );
    this.selectIntentedUse(BaResidentialIntendedUse.FOR_COURT);
    this.$input_appraisalOwnership.waitForExist();
    this.$input_appraisalOwnership.scrollIntoView();
    this.$input_appraisalOwnership.setValue(TestDataBa.ResidentialReport.VTB.appraisalOwnership);
    this.$input_encumbrances.waitForExist();
    this.$input_encumbrances.scrollIntoView();
    this.$input_encumbrances.setValue(TestDataBa.ResidentialReport.VTB.encumbrances);
    this.$input_customerFullName.waitForExist();
    this.$input_customerFullName.scrollIntoView();
    this.$input_customerFullName.setValue(TestDataBa.ResidentialReport.VTB.customerFullName);
    this.$input_currentUse.waitForExist();
    this.$input_currentUse.scrollIntoView();
    this.$input_currentUse.setValue(TestDataBa.ResidentialReport.VTB.currentUse);
    // Проставление адреса
    this.setAppraisalObjectAddress();
    // Выбор департамента ВТБ
    this.selectDivision(BaResidentialUserDepartment.DPA);
    this.setBankUser();
    // Заполняем ФИО заёмщика
    this.$button_copyCustomerToBorrower.waitForExist();
    this.$button_copyCustomerToBorrower.scrollIntoView();
    this.$button_copyCustomerToBorrower.click();
  }
  setAgreementDate(date?: string) {
    let target: WebdriverIO.Element = this.$input_agreementDate;

    if (date) {
      target.waitForClickable();
      target.click();
      target.clearValue();
      target.setValue(date);
    } else {
      target.waitForClickable();
      target.click();
      target.clearValue();
      target.setValue("d");
      browser.keys(EnumKeyboardButtons.TAB);
    }
  }
  // TODO
  getReportData() {
    return 1;
  }
}
/** Карточка отчёта */
export const baReportPage = new BaReportPage();

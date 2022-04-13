import { KronaExpertResponseComparableFieldNames } from "./Enums";
import { options } from "../../options";
import { debugLogging } from "modules";

class KronaExpertRequestCard {
  path = "/expert/request/";

  private get $root() {
    return browser.$(`div#request-container`);
  }
  get $selector_address() {
    // первый вариант из подсказки адреса
    return this.$root.$(
      `//*[@id="expert_comparable_table_0"]/tbody/tr[2]/td[2]/div/span/div/div/div[1]`
    );
  }
  /** Яндекс карта */
  get $map() {
    return this.$root.$(`#YMapsID > ymaps`);
  }
  // ---------------------------------------------------------------------------
  /** Таблица исходных данных по Объекту Оценки */
  get $table_requestSourceInfo() {
    return this.$root.$(`.table-blue`);
  }
  /** История верификаций */
  get $button_verifyHistory() {
    return this.$root.$(`#verificationHistory`);
  }
  /** Кнопка "Отчёт об оценке" */
  get $button_downloadReport() {
    return this.$root.$(`#view_report`);
  }
  /** "Стоимость по отчёту" */
  get $info_objectPriceInReport() {
    return this.$root.$(
      `//div[@class='table-blue']//*[contains(text(),'Стоимость по отчету')]/../..//p`
    );
  }
  get $info_objectTotalSpace() {
    return this.$root.$(
      `//div[@class='table-blue']//*[contains(text(),'Общая площадь, м')]/../..//p`
    );
  }
  // ---------------------------------------------------------------------------
  //           Блок описания модального окна с "Историей по дому"
  // ---------------------------------------------------------------------------
  /** кнопка "Адрес -> (история по дому)" */
  get $button_houseHistory() {
    return this.$root.$(`#houseHistory`);
  }
  /** Корень модального окна с историей по дому */
  get $modalHouseHistoryRoot(): WebdriverIO.Element {
    return $(`//div[@id='house_history_table_modal']`);
  }
  /** кнопка "закрыть" */
  get $houseHistoryButtonClose() {
    return this.$modalHouseHistoryRoot.$(`.//button[@class='close']`);
  }
  /** Таблица истории по дому */
  get $houseHistoryTableRoot() {
    return this.$modalHouseHistoryRoot.$(`.//table[@id='house_history_table']`);
  }
  get $houseHistoryTableData() {
    return this.$houseHistoryTableRoot.$$(`.//tbody/tr`);
  }
  // ---------------------------------------------------------------------------
  //       Блок описания модального окна с дублями
  // ---------------------------------------------------------------------------
  /** Кнопка "дубли" -> "открыть" */
  get $button_duplicateHistory() {
    return this.$root.$(`#dublicateValuation`);
  }
  /** Диалоговое модальное окно с таблицей */
  get $modalDuplicateHistoryRoot() {
    return $(`//div[@id='valuation_dublicate_table_modal']`);
  }
  /** таблица дублей */
  get $table_duplicateHistory() {
    return this.$modalDuplicateHistoryRoot.$(`.//table[@id='valuation_dublicate_table']`);
  }
  get $duplicateTableData() {
    return this.$table_duplicateHistory.$$(`.//tbody/tr`);
  }
  /** кнопка "х" в окне с таблицей дублей */
  get $modalDuplicateHistoryButtonClose() {
    return this.$modalDuplicateHistoryRoot.$(`.//button[@class='close']`);
  }
  // ---------------------------------------------------------------------------
  /** поле ввода номера заявки с аналогами эксперта */
  get $input_autoFillComparables() {
    return this.$root.$(`#fillComparablesFromResponeId`);
  }
  /** Кнопка "заполнить" из другой заявки */
  get $button_fillComparables() {
    return this.$root.$(`#fillComparablesBtn`);
  }
  /** кнопка "сохранить черновик" */
  get $button_saveResponse() {
    return this.$root.$(`#save_response`);
  }

  // ---------------------------------------------------------------------------
  /** окно уведомления об успешном сохранении */
  get $modalSuccessfulDraftSaveRoot() {
    return browser.$(`//div[contains(@class,'saveExpertResponseSuccess')]`);
  }
  get $modalSuccessfulDraftSaveButtonConfirm() {
    return this.$modalSuccessfulDraftSaveRoot.$(`.//button[@class='bootbox-close-button close']`);
  }
  // ---------------------------------------------------------------------------
  /** Модальное окно
   *
   * `Успешное сохранение ответа эксперта`
   */
  get $modalSubmitExpertResponseSuccessRoot() {
    return browser.$(`//div[contains(@class,'submitExpertResponseSuccess')]`);
  }
  /** Кнопка "ок" у модального окна `Успешное сохранение ответа эксперта`*/
  get $modalSubmitExpertResponseSuccessButtonConfirm() {
    return this.$modalSubmitExpertResponseSuccessRoot.$(`.//button[@data-bb-handler="ok"]`);
  }
  // ---------------------------------------------------------------------------

  /** Кнопка "Подтвердить расчёт" */
  get $button_sendResponse() {
    return this.$root.$(`#send_response`);
  }
  // ---------------------------------------------------------------------------
  //        Блок описания функционала Старшего эксперта
  // ---------------------------------------------------------------------------
  /** Кнопка "подтвердить" (старший эксперт) */
  get $button_approveResponse() {
    return this.$root.$(`#approve_response`);
  }
  /** кнопка "Вернуть" (старший эксперт) */
  get $button_declineResponse() {
    return this.$root.$(`#decline_response`);
  }
  // ---------------------------------------------------------------------------
  //        Блок описания модального окна с уведомленим об отсутствии ТОРГа
  // ---------------------------------------------------------------------------
  /** модальное окно "у аналогов №1\2\3\4\5 отсутствует торг" */
  get $modalCalculationMassErrorsRoot() {
    return browser.$(`//div[contains(@class,'requestMassDiffError')]`);
  }
  /** кнопка "ок" */
  get $modalCalculationMassErrorsButtonConfirm() {
    return this.$modalCalculationMassErrorsRoot.$(`.//button[@data-bb-handler="yes"]`);
  }
  /** кнопка "вернуться в расчёт" */
  get $modalCalculationMassErrorsButtonDecline() {
    return this.$modalCalculationMassErrorsRoot.$(`.//button[@data-bb-handler="no"]`);
  }
  // ---------------------------------------------------------------------------
  // Блок описания модального окна с подтверждением заявки эксперта
  // ---------------------------------------------------------------------------
  /** Модальное окно подтверждения заявки эксперта */
  get $modalSubmitExpertResponseRoot() {
    return browser.$(`//div[@id='submit_expert_response_modal']`);
  }
  /** поле "комментарий к заявке" в модальном окне подтверждения */
  get $modalSubmitExpertResponseCommentInput() {
    return this.$modalSubmitExpertResponseRoot.$(`.//div[@class='modal-body']/textarea`);
  }
  /** кнопка "Да" */
  get $modalSubmitExpertResponseButtonOk() {
    return this.$modalSubmitExpertResponseRoot.$(`.//button[@id='submit_expert_response']`);
  }
  /** кнопка "Обратно" */
  get $modalSubmitExpertResponseButtonBack() {
    return this.$modalSubmitExpertResponseRoot.$(`.//button[@data-dismiss="modal"]`);
  }
  // ---------------------------------------------------------------------------
  //   Блок описания модального окна с подтверждением заявки эксперта Старшим
  // ---------------------------------------------------------------------------
  /** Окно подтверждения заявки Старшим Экспертом */
  get $approveResponseModalRoot() {
    return $(`//div[contains(@class,'approveResponseModal')]`);
  }
  /** Кнопка "Да" в окне подтверждения Старшим экспертом */
  get $approveResponseModalButtonYes() {
    return this.$approveResponseModalRoot.$(`.//button[@data-bb-handler='yes']`);
  }
  /** Кнопка "Нет" в окне подтверждения Старшим экспертом */
  get $approveResponseModalButtonNo() {
    return this.$approveResponseModalRoot.$(`.//button[@data-bb-handler='no']`);
  }
  // ---------------------------------------------------------------------------
  //                Блок описания элементов работы с фотками
  // ---------------------------------------------------------------------------
  /** Текст для проверки уведомления о фотках */
  private get $dialog_checkPhotos(): WebdriverIO.Element {
    // return this.$root.$(`div.bootbox-confirm div.modal-dialog`);
    return browser.$(`//*[contains(text(),'требуется посмотреть все фотографии')]/../..`);
  }
  private get $button_checkPhotosYes() {
    return this.$dialog_checkPhotos.$(`//button[@data-bb-handler='confirm']`);
  }
  private get $button_checkPhotosNo() {
    return this.$dialog_checkPhotos.$(`//button[@data-bb-handler='cancel']`);
  }
  // ---------------------------------------------------------------------------
  /** Корень окна просмотра фоток */
  private get $modal_photoViewer() {
    return $(`#photo-viewer`);
  }
  /** Блок просмотра фоток */
  private get $photoViewer_photoBlock() {
    return this.$modal_photoViewer.$(`div[class*="photo-block"]`);
  }
  /** Текущая фотка */
  private get $photoViewer_image() {
    return this.$modal_photoViewer.$(`#photo-viewer_img`);
  }
  /** кнопка перехода к предыдущей фотке */
  private get $button_previousPhoto() {
    return this.$photoViewer_photoBlock.$(`div.photo-viewer--left`);
  }
  /** кнопка перехода к следующей фотке */
  private get $button_nextPhoto() {
    return this.$photoViewer_photoBlock.$(`div.photo-viewer--right`);
  }
  /** Задний фон окна просмотра фоток */
  private get $photoViewer_background() {
    return this.$modal_photoViewer.$(`div.photo-viewer__background`);
  }
  get $button_setExecutorToCurrentUser() {
    return this.$root.$(`button#set-executor-to-current-user`);
  }

  /** Счётчик фоток */
  private photoViewer_imageCounter(num: string) {
    return num === "min"
      ? parseInt(this.$photoViewer_photoBlock.$$('div[class*="counter"] span')[0].getText(), 10)
      : parseInt(this.$photoViewer_photoBlock.$$('div[class*="counter"] span')[1].getText(), 10);
  }

  // ---------------------------------------------------------------------------
  //   Блок описания элементов управления таблицы аналогов
  // ---------------------------------------------------------------------------

  /** Таблица аналогов */
  private get $table_comparables() {
    return this.$root.$(`#expert_comparable_table_0`);
  }

  /** кнопка "Открыть в байкале" */
  get $button_GoToBaikal(): WebdriverIO.Element {
    return this.$table_comparables.$(`th[class*="baikalButton"]`);
  }

  /** кнопка "дополнительные корректировки" */
  get $button_moreOptions() {
    return this.$table_comparables.$(`a[class*="additional-parameters"]`);
  }
  get $statusChangeConfirm() {
    return browser.$(`//*[contains(text(),'Статус заявки успешно изменён.')]`);
  }
  get $button_pauseExpertResponseWork() {
    return this.$root.$(`//button[@class='btn btn-default pause']`);
  }
  // ---------------------------------------------------------------------------
  //   Блок кнопок под таблицей "Исходные данные по объекту"
  // ---------------------------------------------------------------------------
  /** Кнопка "Создать запрос аналитику" */
  get $button_createRequest() {
    return browser.$(`//a[contains(text(), 'Создать запрос аналитику')]`);
  }
  // ---------------------------------------------------------------------------
  //   Модальные окна
  // ---------------------------------------------------------------------------
  private get $modal_alertDuplicate_body(): WebdriverIO.Element {
    return browser.$(`//div[contains(@class,'requestDuplicateAlert')]`);
  }
  private get $button_modalAlertDuplicate_ok(): WebdriverIO.Element {
    return this.$modal_alertDuplicate_body.$(`.//div[@class='modal-footer']/button`);
  }
  private get $modal_alertExecutorOnRequest_body(): WebdriverIO.Element {
    return browser.$("//*[contains(text(),'Исполнитель для данной заявки')]");
  }
  private get $button_modalAlertExecutorOnRequest_ok(): WebdriverIO.Element {
    return browser.$(
      "//*[contains(text(),'Исполнитель для данной заявки')]/../../div[@class='modal-footer']/button"
    );
  }
  // ---------------------------------------------------------------------------
  //                                    Функции
  // ---------------------------------------------------------------------------
  /** Функция доступа к полям данных аналогов
   *
   * @param comparableId - номер аналога ( 1 | 2 | 3 | 4 | 5 )
   * @param comparableData `@see KronaExpertResponseComparableFieldNames`
   */
  comparables(comparableId: number, comparableData: KronaExpertResponseComparableFieldNames) {
    switch (comparableData) {
      case KronaExpertResponseComparableFieldNames.IS_ACTIVE:
        return $$(`//*[contains(text(),'В расчет')]/../input`)[comparableId];
      case KronaExpertResponseComparableFieldNames.INFO_LINK:
        return $(`//*[contains(text(),'Ссылка на')]/..//input`)[comparableId];
      case KronaExpertResponseComparableFieldNames.HYPERLINK:
        return $(
          `//*[contains(text(),'Ссылка на')]/..//td[${
            comparableId + 1
          }]//*[@class='computed-url-link']`
        );
      case KronaExpertResponseComparableFieldNames.REPAIRS_TYPE:
        return $$(`//*[contains(text(),'${comparableData}')]/..//select`)[comparableId - 1];
      case KronaExpertResponseComparableFieldNames.ADDRESS:
        return $(`//*[contains(text(),'${comparableData}')]/..//td[${comparableId + 1}]//textarea`);
      case KronaExpertResponseComparableFieldNames.TOTAL_SPACE:
        return $$(`//*[contains(text(),'Общая площадь')]/..//input[@type='text']`)[
          comparableId - 1
        ];
      case KronaExpertResponseComparableFieldNames.PRICE:
        return $$(`//*[contains(text(),'${comparableData}')]/..//input[@type='text']`)[
          comparableId - 1
        ];
      default:
        return $(`//*[contains(text(),'${comparableData}')]/..//td[${comparableId + 1}]//input`);
    }
  }
  saveResponseDraft() {
    let target: WebdriverIO.Element;
    target = this.$button_saveResponse;
    target.waitForExist();
    target.scrollIntoView();
    target.waitForClickable({ timeout: 30000 });
    target.click();
    browser.pause(500);
    if (target.isClickable()) target.click();

    this.$modalSuccessfulDraftSaveRoot.waitForDisplayed({
      timeout: 100000,
      timeoutMsg: `Окно подтверждения успешного сохранения черновика не появилось`,
    });
    this.$modalSuccessfulDraftSaveButtonConfirm.waitForClickable();
    this.$modalSuccessfulDraftSaveButtonConfirm.click();
    this.$modalSuccessfulDraftSaveRoot.waitForDisplayed({ reverse: true });

    browser.refresh();
    this.waitForLoad();
  }
  /**
   * Функция проверяет наличие кнопки "Назначить текущему пользователю" на странице.
   * Если этой кнопки нет, то нажимает кноку "Создать запрос аналитику",
   * а потом назначает запрос текущему пользователю.
   * */
  setExecutorToCurrentUser() {
    while (this.closeAlertExecutorOnRequest());
    while (this.closeAlertDuplicate());
    let buttonPauseWork: WebdriverIO.Element = $(`//button[@class="btn btn-default pause"]`);

    if (buttonPauseWork.getAttribute("disabled") !== null) {
      if (
        this.$button_setExecutorToCurrentUser.isExisting() &&
        this.$button_setExecutorToCurrentUser.isDisplayed() &&
        this.$button_setExecutorToCurrentUser.isClickable()
      ) {
        this.$button_setExecutorToCurrentUser.scrollIntoView();
        this.$button_setExecutorToCurrentUser.waitForClickable({
          timeoutMsg: `Кнопка "Назначить текущему пользователю" не кликабельна`,
        });
        debugLogging(`Нажатие кнопки "Назначить текущему пользователю"`);
        this.$button_setExecutorToCurrentUser.click();
        this.waitForLoad();
      } else if (!this.$input_autoFillComparables.isExisting()) {
        debugLogging(
          `Кнопка "Назначить текущему пользователю" была не кликабельна, значит создадим запрос аналитику вручную`
        );
        this.$button_createRequest.waitForClickable({
          timeoutMsg: `Кнопка "Создать запрос аналитику" не кликабельна`,
        });
        debugLogging(`Нажатие кнопки "Создать запрос аналитику"`);
        this.$button_createRequest.click();
        this.waitForLoad(false);
        this.setExecutorToCurrentUser();
      }
    }
  }

  checkHouseHistory() {
    while (this.closeAlertDuplicate());
    this.$button_houseHistory.waitForExist();
    this.$button_houseHistory.waitForClickable();
    this.$button_houseHistory.scrollIntoView();
    this.$button_houseHistory.click();
    this.$modalHouseHistoryRoot.waitForDisplayed({
      timeoutMsg: `Окно "ИСТОРИЯ ПО ДОМУ" не отрисовалось.`,
    });
    this.$houseHistoryTableRoot.waitForExist();
    this.$houseHistoryTableRoot.waitForDisplayed({
      timeoutMsg: `Таблица с данными истории по дому не отрисовалась.`,
    });
    browser.pause(2000);
    // this.$houseHistoryTableData[0].waitForDisplayed({timeoutMsg:`Данные таблицы с историей по дому не отрисовались`})

    this.$houseHistoryButtonClose.waitForExist();
    this.$houseHistoryButtonClose.waitForClickable();
    this.$houseHistoryButtonClose.click();
    this.$modalHouseHistoryRoot.waitForDisplayed({
      timeout: 15000,
      reverse: true,
      timeoutMsg: `Окно "ИСТОРИЯ ПО ДОМУ" не исчесзло после закрытия.`,
    });
    this.$button_houseHistory.waitForClickable({});
  }
  checkDoubles() {
    while (this.closeAlertDuplicate());
    this.$button_duplicateHistory.waitForClickable();
    this.$button_duplicateHistory.click();
    this.$modalDuplicateHistoryRoot.waitForDisplayed({ timeoutMsg: `Окно "ДУБЛИ" не появилось` });
    this.$table_duplicateHistory.waitForDisplayed({
      timeoutMsg: `Таблица с данными дублей не отрисовалась`,
    });
    browser.pause(2000);
    // this.$duplicateTableData[0].waitForDisplayed({timeoutMsg:`Данные таблицы с дублями не отрисовались`})

    this.$modalDuplicateHistoryButtonClose.waitForClickable({});
    this.$modalDuplicateHistoryButtonClose.scrollIntoView();
    this.$modalDuplicateHistoryButtonClose.click();
    this.$modalDuplicateHistoryRoot.waitForDisplayed({
      timeout: 15000,
      reverse: true,
      timeoutMsg: `Окно "ДУБЛИ" не исчезло после закрытия`,
    });
    this.$button_duplicateHistory.waitForClickable({});
  }

  fillDataFromAnotherRequest(requestNumber: string) {
    while (this.closeAlertExecutorOnRequest());
    while (this.closeAlertDuplicate());
    let target: WebdriverIO.Element;
    target = this.$input_autoFillComparables;
    target.waitForExist();
    target.scrollIntoView();
    target.waitForClickable();
    target.click();
    target.setValue(requestNumber);
    browser.waitUntil(
      () => target.getValue() === requestNumber || target.getText() === requestNumber
    );
    this.$button_fillComparables.waitForClickable();
    this.$button_fillComparables.click();

    let check = this.comparables(1, KronaExpertResponseComparableFieldNames.ADDRESS);
    browser.waitUntil(() => check.getValue() !== null, {
      interval: 1000,
      timeoutMsg: `Данные из другой заявки не заполнились.`,
    });
    browser.pause(1000);
  }

  /** Подтвердить расчет за старшего эксперта */
  confirmationBySenior() {
    while (this.closeAlertExecutorOnRequest()) while (this.closeAlertDuplicate());

    if (this.$button_approveResponse.isExisting() && this.$button_approveResponse.isClickable()) {
      this.$button_approveResponse.scrollIntoView();
      this.$button_approveResponse.waitForClickable({
        timeoutMsg: `Кнопка "Подтвердить" не кликабельна`,
      });
      debugLogging(`Нажатие кнопки "Подтвердить"`);
      this.$button_approveResponse.click();
      browser.pause(1000);
      if (this.$button_approveResponse.isClickable()) this.$button_approveResponse.click();

      this.$approveResponseModalRoot.waitForDisplayed({
        timeout: 100000,
        timeoutMsg: `Модальное окно "Подтверждение корректности расчёта заявки." не появилось на экране`,
      });
      debugLogging(
        `Нажатие кнопки "Да" на модальном окне "Подтверждение корректности расчёта заявки."`
      );
      this.$approveResponseModalButtonYes.click();
      this.$statusChangeConfirm.waitForDisplayed({
        timeout: 100000,
        timeoutMsg: `Сообщение об успешной смене статуса заявки не появилось.`,
      });
      browser.refresh();

      this.waitForLoad();
    }
  }

  commitJuniorAnalystResponse() {
    while (this.closeAlertExecutorOnRequest()) while (this.closeAlertDuplicate());

    if (this.$button_sendResponse.isExisting() && this.$button_sendResponse.isClickable()) {
      this.$button_sendResponse.waitForExist();
      this.$button_sendResponse.waitForEnabled();
      this.$button_sendResponse.scrollIntoView();
      this.$button_sendResponse.waitForClickable();
      this.$button_sendResponse.click();
      // ждём появиления окна с тем что у нас не заполнен торг или большое отклонение
      browser.pause(2000);
      // browser.$(`//div[contains(@class,'bootbox modal')]`).waitForDisplayed();

      if (this.$modalCalculationMassErrorsRoot.isDisplayed()) {
        this.$modalCalculationMassErrorsButtonConfirm.waitForClickable();
        this.$modalCalculationMassErrorsButtonConfirm.click();
        this.$modalCalculationMassErrorsRoot.waitForDisplayed({
          reverse: true,
          timeout: 5000,
          timeoutMsg: `Окно подтверждения ошибок расчёта не исчезло после подтверждения`,
        });
      }

      this.$modalSubmitExpertResponseRoot.waitForExist();
      this.$modalSubmitExpertResponseRoot.waitForDisplayed();
      this.$modalSubmitExpertResponseCommentInput.waitForClickable();
      this.$modalSubmitExpertResponseCommentInput.setValue(
        `Эта заявка обработана автотестом ${new Date().toString()}`
      );
      this.$modalSubmitExpertResponseButtonOk.waitForClickable();
      this.$modalSubmitExpertResponseButtonOk.click();
      this.$modalSubmitExpertResponseRoot.waitForDisplayed({
        reverse: true,
        timeoutMsg: `Окно подтверждения решения эксперта не исчезло после подтверждения`,
      });

      this.$modalSubmitExpertResponseSuccessRoot.waitForDisplayed({
        timeout: 100000,
        timeoutMsg: `Сообщение об успешном сохранении ответа эксперта не появилось.`,
      });
      this.$modalSubmitExpertResponseSuccessButtonConfirm.waitForClickable();

      browser.refresh();
      this.waitForLoad();
    }
  }
  commitSeniorAnalystResponse() {
    while (this.closeAlertDuplicate());
  }
  /** Функция подтверждения расчёта
   *
   * Выполняется в два этапа:
   *
   * 1) Подтверждение текущим экспертом
   *
   * 2) подтверждение старшим экспертом (только если текущий пользователь является старшим)
   *
   */
  commitExpertResponse() {
    while (this.closeAlertDuplicate());
    this.$button_sendResponse.waitForClickable({
      timeout: 5000,
      timeoutMsg: `Нельзя нажать кнопку "подтвердить расчёт" на странице ${browser.getUrl()}`,
    });
    this.$button_sendResponse.scrollIntoView();
    this.$button_sendResponse.click();
    browser.pause(1000);
    if (
      this.$modalCalculationMassErrorsRoot.isExisting() &&
      this.$modalCalculationMassErrorsRoot.isDisplayed()
    ) {
      this.$modalCalculationMassErrorsButtonConfirm.waitForClickable();
      this.$modalCalculationMassErrorsButtonConfirm.click();
      this.$modalCalculationMassErrorsRoot.waitForDisplayed({ timeout: 10000, reverse: true });
    }
    this.$modalSubmitExpertResponseRoot.waitForExist({ timeout: 5000, reverse: false });
    this.$modalSubmitExpertResponseCommentInput.waitForClickable();
    this.$modalSubmitExpertResponseCommentInput.setValue(
      `Эта заявка обработана автотестом ${new Date().toString()}`
    );
    this.$modalSubmitExpertResponseButtonOk.waitForClickable();
    this.$modalSubmitExpertResponseButtonOk.click();
    this.$modalSuccessfulDraftSaveRoot.waitForDisplayed({ timeout: 50000, reverse: false }); // Конец оценки обычный экспертом
    browser.refresh();
    this.$table_requestSourceInfo.waitForDisplayed({ timeout: 5000, reverse: false });
    while (this.closeAlertDuplicate());
    browser.pause(1000);

    if (
      this.$button_approveResponse.isExisting() &&
      this.$button_approveResponse.isDisplayed() &&
      this.$button_approveResponse.isClickable()
    ) {
      this.$button_approveResponse.scrollIntoView();
      this.$button_approveResponse.click();
      this.$approveResponseModalRoot.waitForDisplayed({ timeout: 5000, reverse: false });
      this.$approveResponseModalButtonYes.click();
      browser.pause(750);
      this.$statusChangeConfirm.waitForDisplayed({
        timeout: 20000,
        timeoutMsg: `Сообщение об успешной смене статуса заявки не появилось. Страница ${browser.getUrl()}`,
      });
      browser.refresh();
      this.$table_requestSourceInfo.waitForDisplayed({ timeout: 5000 });
    } else return;
  }

  // --------------------------------------------------------------------------------------------

  private closeAlertDuplicate(): boolean {
    if (
      this.$modal_alertDuplicate_body.isExisting() &&
      this.$button_modalAlertDuplicate_ok.isDisplayed()
    ) {
      debugLogging(`Отображается модальное окно связанное с дублями`);
      this.$button_modalAlertDuplicate_ok.waitForClickable();
      this.$button_modalAlertDuplicate_ok.click();

      this.$modal_alertDuplicate_body.waitForDisplayed({ reverse: true, timeout: 10000 });
      debugLogging(`Закрытие модального окна`);
      return true;
    }
    return false;
  }
  private closeAlertExecutorOnRequest(): boolean {
    if (
      this.$modal_alertExecutorOnRequest_body.isExisting() &&
      this.$button_modalAlertExecutorOnRequest_ok.isDisplayed()
    ) {
      debugLogging(`Отображается модальное окно "Исполнителем по заявке..."`);
      this.$button_modalAlertExecutorOnRequest_ok.waitForClickable();
      this.$button_modalAlertExecutorOnRequest_ok.click();

      this.$modal_alertExecutorOnRequest_body.waitForDisplayed({ reverse: true, timeout: 10000 });
      debugLogging(`Закрытие модального окна`);
      return true;
    }
    return false;
  }

  /**
   * Функция обработки диалога просмотра фоток.
   *
   * При первом открытии заявки её сначала надо назначить себе
   * поэтому нужно делать сначала `answer = false`
   *
   * @param answer
   * * yes - посмотреть фотки
   * * no - закрыть окно и работать с черновиком
   */
  CheckPhotos(answer: boolean) {
    browser.pause(3000);
    if (this.$dialog_checkPhotos.isDisplayed()) {
      this.$dialog_checkPhotos.waitForDisplayed({
        timeout: 3000,
        timeoutMsg: `Окно проверки фотографий в отчёте не появилось. Страница ${browser.getUrl()}`,
      });
      if (answer) {
        this.$button_checkPhotosYes.click();
        this.$dialog_checkPhotos.waitForDisplayed({ timeout: 10000, reverse: true });
        this.$photoViewer_image.waitForDisplayed({ timeout: 10000, reverse: false });

        let photoCount = this.photoViewer_imageCounter("max");
        for (let i = 0; i <= photoCount; i++) this.$button_nextPhoto.click();

        this.$button_previousPhoto.click();
        this.$root.execute(() => {
          document.getElementsByClassName(`photo-viewer__photo-block`)[0].remove();
        });
        this.$photoViewer_background.click();
      } else {
        this.$button_checkPhotosNo.click();
        this.$dialog_checkPhotos.waitForDisplayed({ timeout: 10000, reverse: true });
      }
      while (this.closeAlertDuplicate());
    } else while (this.closeAlertDuplicate());
  }

  goToBaikal() {
    this.$button_GoToBaikal.waitForClickable({
      timeoutMsg: `Кнопка "Открыть в Байкале" не кликабельна`,
    });
    debugLogging(`Нажитие кнопки "Открыть в Байкале"`);
    this.$button_GoToBaikal.click();
  }

  goToExpertRequestCard(rfvId: string): string {
    browser.url(options.krona.host + kronaExpertRequestCard.path + rfvId);
    let url_expert_card = browser.getUrl();
    browser.waitUntil(() => browser.getUrl().match(kronaExpertRequestCard.path) !== null, {
      timeoutMsg: `У карточки эксперта неправильный URL. Внутри URL ожидается /expert/request/,
        но фактический URL сейчас = ${browser.getUrl()}`,
    });
    debugLogging(`Открытие карточки эксперта: `, url_expert_card);
    return url_expert_card;
  }

  waitForLoad(checkPhotos?: boolean) {
    this.$root.waitUntil(
      () => this.$root.getUrl().match(this.path) !== null && this.$map.isDisplayed()
    );
    while (this.closeAlertExecutorOnRequest());
    while (this.closeAlertDuplicate());
    this.CheckPhotos(checkPhotos ? checkPhotos : false);
    this.$map.waitForExist();
    this.$map.waitForDisplayed({});
    this.$button_houseHistory.waitForClickable();
    debugLogging(`Карточка эксперта открылась`);
  }
}
/** Карточка "экспертной оценки" */
export const kronaExpertRequestCard = new KronaExpertRequestCard();

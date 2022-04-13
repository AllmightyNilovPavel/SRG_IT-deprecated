export class BaResidentialReportBase {
  get $base() {
    return $(`#report-container`);
  }
  get $overlay_loading() {
    // окно загрузки
    return $(".blockUI.blockOverlay");
  }
  get $text_reportNumber() {
    return this.$base.$(`#reportEditor > span[data-bind="text: reportNumber"]`).getText();
  }
  get $info_revokeComment() {
    return this.$base.$(`#revokeCommentBlock`);
  }
  get $info_revokeCommentText() {
    return this.$info_revokeComment.$(`span`);
  }
  /** модальное окно, что успешно сохранилось */
  get $overlay_saveConfirm() {
    return $("#body > div.bootbox.modal.in");
  }
  // ---------------------------------------------------------------------------
  // get $overlay_reportVersionChoice() {
  //   return $("#body > div.bootbox.modal.in");
  // }
  get $overlayReportVersionChoiceRoot() {
    return $(`//div[@class='modal-body'][contains(text(),'Какую версию открыть?')]/..`);
  }
  get $buttonChoseServerVersion() {
    return this.$overlayReportVersionChoiceRoot.$(`.//a[@class='btn null']`);
  }
  // ---------------------------------------------------------------------------
  /** Окно подписи отчёта */
  get $overlay_signReport() {
    return $(`#digitalSignModal`);
  }
  get $mapChangedModalBase() {
    return browser.$(`//strong[contains(text(),'Карта устарела или была изменена.')]/../..`);
  }
  get $mapChangedModalCloseButton() {
    return this.$mapChangedModalBase.$(`//a[@data-handler='1']`);
  }
  // ----------------------------------------------------------------------------------------
  /** Окно подтверждения данных по отчёту при подписи для ВТБ */
  get $overlay_signReportVtb() {
    return $(`#vtb24SignModal`);
  }
  get $checkbox_confirmVtbReportData() {
    return this.$overlay_signReportVtb.$(`#confirmVtb24Sign`);
  }
  get $button_confirmVtbReportData() {
    return this.$overlay_signReportVtb.$(`button.btn.btn-success.btn-confirm`);
  }
  // ----------------------------------------------------------------------------------------
  /** Окно с "согласием" для ВТБ */
  get $overlay_vtbConsentModal() {
    return $(`div#consentModal`);
  }
  get $checkbox_vtbConsentAppraiserAgreed() {
    return this.$overlay_vtbConsentModal.$(`input#appraiserAgreed`);
  }
  get $checkbox_vtbConsentCustomerConfirms() {
    return this.$overlay_vtbConsentModal.$(`input#customerConfirms`);
  }
  get $button_vtbConsentConfirm() {
    return this.$overlay_vtbConsentModal.$(`div.modal-footer > button.btn-primary`);
  }
  // ----------------------------------------------------------------------------------------
  get $button_startEcsSign() {
    return this.$overlay_signReport.$(`button[data-bind*='onDigitalSign']`);
  }
  get $selector_signatureType() {
    return this.$overlay_signReport.$(`select`);
  }
  /** подтверждение сохранения отчёта */
  get $button_saveConfirm() {
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
  //-------------------------------------
  get $modalSignReportSuccessRoot() {
    return $(`//h3[contains(text(),'Отчет готов к печати!')]/../..`);
  }
  /**
   * Кнопка "Ок" в окне подтверждения подписи отчёта.
   *
   * Если на неё нажать - произойдёт переход в реестр отчётов.
   */
  get $buttonSignReportSuccessConfirm() {
    return this.$modalSignReportSuccessRoot.$(`.//a[@class="btn btn-primary btn-success"]`);
  }
  /**
   * Кнопка "Крестик" в окне подтверждения подписи отчёта.
   *
   * Если на неё нажать то произойдёт закрытие окна подтверждения
   * без переходов.
   */
  get $buttonSignReportSuccessModalClose() {
    return this.$modalSignReportSuccessRoot.$(`.//a[@class='close']`);
  }
  //-------------------------------------
  /** модальное окно с инфо об успешном удалении */
  get $overlay_deleteSuccess() {
    return this.$overlay_confirm.$(`div.modal-body`);
  }
  /** кнопка подтвеждения успешного удаления */
  get $button_deleteSuccessConfirm() {
    return this.$overlay_confirm.$("div.modal-footer > a");
  }
  /** Базовый элемент содержащий первичные кнопки управления */
  get $base_reportActionButtons() {
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
  get $button_checkReport() {
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
  get $base_reportActionButtons2() {
    return $(`#reportActionButtons2`);
  }
  /** Удалить отчёт */
  get $button_deleteReport() {
    return this.$base_reportActionButtons2.$(`a.delBtn`);
  }
  /** Заполнить из */
  get $button_cloneFrom() {
    return this.$base_reportActionButtons2.$(`a.cloneFromBtn`);
  }
  /** Заполнить из */
  get $button_autofillForm() {
    return this.$base_reportActionButtons2.$(`a.fillBtn`);
  }
  /** Клонировать отчёт */
  get $button_clone() {
    return this.$base_reportActionButtons2.$(`a.cloneBtn`);
  }
  /** Кнопка "Открыть Журнал действий" */
  get $button_workJournal() {
    return this.$base_reportActionButtons2.$(`a.auditBtn`);
  }
  get $modal_cloneReportOptions() {
    return $(`#cloneModal`);
  }
  get $button_cloneReportOptionsConfirm() {
    return this.$modal_cloneReportOptions.$(`button[onclick="sendCloneJSON()"]`);
  }
  /** Пароль для подписи */
  get $input_signPwd() {
    return $(`#signPassword`);
  }
  get $button_signReportWithPassword() {
    return $(`button[data-bind="click: onPasswordSign"]`);
  }

  get $selector_ecs() {
    return this.$overlay_signReport.$(`select[data-bind*='Выберите сертификат']`);
  }
}

export class KronaRbRequestCard {
  path = "/rbRequests";

  /** Таблица "Исходная информация" */
  private get $root() {
    return $("#rbRequestForm");
  }
  // -----------------------------------------------------------------------------
  ModalSuccessfulSave = "Все изменения сохранены успешно";

  private get $root_saveResultModal() {
    return $(`#saveResultModal`);
  }
  private get $text_saveResultText() {
    return this.$root_saveResultModal.$(`#save_result_text`).getText();
  }
  private get $button_dismissModal() {
    return this.$root_saveResultModal.$(`button.btn-success`);
  }
  // -----------------------------------------------------------------------------
  /** Карта с объектом */
  get $rbRequestCard_Map() {
    return $(`#valuationRequestLatLonMap`);
  }
  /** Кнопка "Произвести расчёт" (иконка в виде файла) */
  get $button_calculate() {
    return browser.$(`#btnBaikal`);
  }

  get $button_cloneRequest() {
    return $(`#btnCopyAppraisalObject`);
  }
  get $button_saveRequestDraft() {
    return $(`#btnSaveDraft`);
  }
  // -----------------------------------------------------------------------------
  waitForLoad() {
    this.$root.waitForExist({ timeout: 10000, reverse: false });
    this.$rbRequestCard_Map.waitForDisplayed({ timeout: 10000, reverse: false });
  }
  saveRequestDraft() {
    this.$button_saveRequestDraft.scrollIntoView();
    this.$button_saveRequestDraft.waitForClickable();
    this.$button_saveRequestDraft.click();
    this.$root_saveResultModal.waitForDisplayed({ timeout: 20000, reverse: false });
    this.$button_dismissModal.waitForClickable();

    let ModalDisplayedText = this.$text_saveResultText;

    this.$button_dismissModal.click();
    this.$root_saveResultModal.waitForDisplayed({ timeout: 5000, reverse: true });

    return ModalDisplayedText;
  }
}
/** Карточка объекта из "Реестра Объектов" */
export const kronaRbRequestCard = new KronaRbRequestCard();

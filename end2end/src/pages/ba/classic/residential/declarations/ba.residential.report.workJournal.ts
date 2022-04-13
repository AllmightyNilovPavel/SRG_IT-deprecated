import { BaActionsWorkJournal } from "./../../enums";

export class BaResidentialReportWorkJournal {
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
  //   ----------------------------------------------------------------------
  waitForLoad() {
    this.$modal_workJournal.waitForExist();
    this.$loader_workJournalData.waitForDisplayed({ timeout: 2000, reverse: true });
  }
  /**
   * Функция поиска деййствий в Жернале работы
   *
   * @param action - Действие которое необходимо найти
   */
  findAction(action: BaActionsWorkJournal) {
    // return this.$table_workJournalData.$(`tbody>tr>td:contains("${action}")`);
    return $(`//*[@id="audits"]//td[contains(text(),"${action}")]`);
  }
}

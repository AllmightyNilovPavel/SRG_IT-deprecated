import { KronaDataType, KronaFileType } from "../../Enums";

export class KronaResultTableBase {
  /** * Корень таблицы результатов.
   * * Сам не используется
   */
  private get $filter_result() {
    return browser.$(`#filter_result`);
  }
  /** таблица с заявками */
  get $result_Table() {
    return this.$filter_result.$("#result_table");
  }
  get $resultTable_Info() {
    return this.$filter_result.$("#result_table_info");
  }
  get $resultTable_emptyBody() {
    return this.$result_Table.$(`td.dataTables_empty`);
  }
  /** картинка при перезагрузке таблицы результатов */
  private get $resultTable_processing() {
    return this.$filter_result.$(`#result_table_processing`);
  }
  /** переключатель страниц */
  private get $paginator() {
    return this.$filter_result.$("#result_table_paginate");
  }
  /** Предыдущая страница результатов */
  private get $paginator_prevPage() {
    return this.$paginator.$(`#result_table_previous`);
  }
  /** Следующая страница результатов */
  private get $paginator_nextPage() {
    return this.$paginator.$(`#result_table_next`);
  }
  get $resultTable_reportRevoke() {
    return this.$filter_result.$(`div.reject-report-button`);
  }
  get $resultTable_reportAccept() {
    return this.$filter_result.$(`div.approve-report-button`);
  }
  get $resultTable_reportRevokeDone() {
    return this.$filter_result.$(`div.reject-report-done`);
  }
  get $resultTable_reportAcceptDone() {
    return this.$filter_result.$(`div.approve-report-done`);
  }

  // ---------------------------------------------------------------------------
  //                                    Функции
  // ---------------------------------------------------------------------------
  /** * Фунцкия возврата ссылки на элемент таблицы данных
   *
   * @param option - enum.DataType
   */
  resultTableGetData(dataType: KronaDataType) {
    return this.$result_Table.$(dataType);
  }
  /**
   * Функция возврата ссылки на файл
   *
   * @param fileType - enum.KronaFileType
   */
  resultTable_download(fileType: KronaFileType) {
    return this.$result_Table.$(fileType);
  }
  /** Функция ожидания прогрузки реестра */
  waitForLoad(iterations?: number) {
    let successLoad = false;
    console.log("Ожидаем загрузку реестра заявок. Url = ", browser.getUrl());

    for (let index = 0; index <= (iterations ? iterations : 3); index++) {
      console.log("Ожидание загрузки реестра №", index + 1);
      browser.pause(1000);

      if (this.$filter_result.isExisting()) {
        if (this.$filter_result.isDisplayed()) {
          this.$resultTable_processing.waitForDisplayed({ timeout: 30000, reverse: true });
          console.log("Реестр загрузился.");

          successLoad = true;
        } else if (this.$resultTable_emptyBody.isDisplayed()) {
          console.log("Реестр загрузился, но не отрисовалась таблица. Пробуем ещё раз.");
          browser.refresh();

          successLoad = false;
        } else {
          console.log("Реестр загрузился, но не отрисовалась таблица. Пробуем ещё раз.");
          browser.refresh();

          successLoad = false;
        }
      } else {
        console.log("Реестр не загрузился. Пробуем ещё раз.");
        browser.refresh();

        successLoad = false;
      }
    }
    if (successLoad === false) throw new Error("Реестр так и не загрузился");
  }
}

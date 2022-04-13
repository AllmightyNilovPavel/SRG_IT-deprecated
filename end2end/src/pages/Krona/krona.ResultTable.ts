import { expect } from "chai";
import { debugLogging } from "modules";
import options from "options";
import { KronaDataType, KronaFileType } from "./Enums";

export class KronaResultTable {
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
  get $result_table_allData() {
    return this.$result_Table.$$(`tbody > tr`);
  }
  get $result_table_columns() {
    return this.$result_Table.$$(`tbody > tr td`);
  }
  get $resultTable_Info() {
    return this.$filter_result.$("#result_table_info");
  }
  get $resultTable_emptyBody() {
    return this.$result_Table.$(`td.dataTables_empty`);
  }
  /** картинка при перезагрузке таблицы результатов */
  get $resultTable_processing() {
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
  /** Проверить статус заявки в реестре объектов */

  /** * Фунцкия возврата ссылки на элемент таблицы данных
   *
   * @param dataType - enum.DataType
   */
  resultTableGetData(dataType: KronaDataType) {
    if (options.debug) debugLogging("Ссылка на тип данных: ", dataType);
    if (dataType === KronaDataType.FA) return $(`${dataType}`);
    else return this.$result_Table.$(`${dataType}`);
  }
  /**
   * Функция возврата ссылки на файл
   *
   * @param fileType - enum.KronaFileType
   */
  resultTable_download(fileType: KronaFileType) {
    return this.$result_Table.$(fileType);
  }

  // TODO подумать над другой реализацией метода получения статуса из таблицы. Селектор по 7 столбцу не надежный.
  /** Функция, возвращающая статус заявки.
   * Перед тем как проверять статус заявки надо отфильтроовать таблицу таким образом,
   * чтобы в результирующей таблице осталась только одна строка.
   * */
  resultTableGetStatus() {
    const tableColumns = kronaResultTable.$result_table_columns;
    const status = tableColumns[7].getText();
    debugLogging("Статус заявки:", status);
    return status;
  }

  /** Функция ожидания прогрузки реестра */
  waitForLoad(customTimeout?: number) {
    if (!this.$filter_result.isExisting()) {
      try {
        this.$filter_result.waitForExist({
          timeout: customTimeout ? customTimeout : 10000,
          timeoutMsg: `Таблица данных реестра ${browser.getUrl()} не загрузилась спустя ${
            (customTimeout ? customTimeout : 10000) / 1000
          } секунд.`,
        });
        this.$filter_result.waitForDisplayed({});
        this.$result_Table.waitForDisplayed({
          timeout: customTimeout ? customTimeout : 10000,
          timeoutMsg: `Данные реестра ${browser.getUrl()} не смогли загрузиться спустя ${
            (customTimeout ? customTimeout : 10000) / 1000
          } секунд.`,
        });
      } catch (error) {
        debugLogging(`Ошибка при загрузке данных реестра ${error}`);
        expect(
          this.$resultTable_processing.isDisplayed(),
          `Ошибка при загрузке данных реестра ${browser.getUrl()}`
        ).to.be.false;
      }
    } else {
      // debugLogging(`Состояние строки загрузки реестра: `,tableProcessingStatus);
      try {
        browser.waitUntil(
          () => {
            let tableProcessingStatus = this.$resultTable_processing.getAttribute("style");
            return tableProcessingStatus.match(/(display: none)/) ? true : false;
          },
          {
            timeout: 20000,
            interval: 500,
            timeoutMsg: `Данные таблицы реестра ${browser.getUrl()} не загрузились`,
          }
        );
      } catch (error) {
        debugLogging(`Ошибка при загрузке данных реестра ${error}`);
        expect(
          this.$resultTable_processing.isDisplayed(),
          `Ошибка при загрузке данных реестра ${browser.getUrl()}`
        ).to.be.false;
      }
    }

    // this.$resultTable_processing.waitForDisplayed({ timeout: 50000, reverse: false });
    // this.$resultTable_processing.waitForDisplayed({
    //   timeout: customTimeout ? customTimeout : 10000,
    //   reverse: true,
    //   timeoutMsg: `Данные реестра ${browser.getUrl()} не смогли загрузиться спустя ${
    //     (customTimeout ? customTimeout : 1000) / 1000
    //   } секунд.`,
    // });
    debugLogging(`Реестр успешно прогрузился`);
  }
}
/** Таблица с данными (общая для всех реестров) */
export const kronaResultTable = new KronaResultTable();

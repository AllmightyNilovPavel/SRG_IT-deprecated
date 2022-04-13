export class ReactReportsTable {
  /** Таблица отчётов */
  private get $table_root() {
    return browser.$(`div[class*="BaseLayout_content"] `);
  }
  private get $table_body() {
    return this.$table_root.$(`div[class*="tableWrap"]`);
  }
  private get $table_header() {
    return this.$table_root.$(`div[class*="Reports_row"]`);
  }
  private get $table_paginationTop() {
    return this.$table_header.$(`div[class*="pagination"]`);
  }
  private get $table_paginationBottom() {
    return this.$table_root.$(`div[class*="pagination"]`);
  }

  private get $table_statistics() {
    return this.$table_header.$(`div[class*="Reports_stats"]`);
  }

  /** Кнопка "В эксель"
   * Открывает модальное окно с настроками выгрузки
   */
  private get $button_exportToExcel() {
    return this.$table_header.$(`i[class*="ExcelModal"]`);
  }

  waitForLoad() {
    this.$table_root.waitForExist({ timeout: 10000, reverse: false });
    this.$table_body.waitForDisplayed({ timeout: 10000, reverse: false });
  }
}

export const reactReportsTable = new ReactReportsTable();

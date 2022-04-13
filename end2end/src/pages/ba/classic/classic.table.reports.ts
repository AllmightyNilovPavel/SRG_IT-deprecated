import { ReportsStatus } from "./enums";

class BaClassicReportsTable {
  private get $table_root() {
    return browser.$(`#index div[class="container-fluid"]`);
  }
  /**  */
  private get $table_body() {
    return browser.$(`#reports_wrapper`);
  }
  /** Пагинатор таблицы */
  private get $table_paginator() {
    return this.$table_body.$(`#reports_paginate`);
  }
  /** Загрузчик таблицы */
  private get $table_loader() {
    return this.$table_body.$(`#reports_processing`);
  }
  /** Фильтры списка отчётов */
  private get $table_statistics() {
    return this.$table_root.$(`#count-reports-bar`);
  }
  /** Содержимое таблицы отчётов */
  private get $table_content_base() {
    return this.$table_body.$(`#reports`);
  }
  get $$table_content() {
    return this.$table_content_base.$$(`tbody tr`);
  }

  getReportsCountByStatus(status: ReportsStatus) {
    this.$table_statistics.$(`${status}`).getText();
  }
  waitForLoad() {
    this.$table_body.waitForExist({ timeout: 10000, reverse: false });
    this.$table_loader.waitForDisplayed({ timeout: 10000, reverse: true });
  }
}
/** БО. КЛАССИКА. Таблица отчётов. */
export const baClassicReportsTable = new BaClassicReportsTable();

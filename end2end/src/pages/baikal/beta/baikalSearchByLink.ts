class BaikalSearchByLink {
  path = "baikal/search-by-url";

  //------------------------------------------------- Геттеры ----------------------------------------------------------

  /** Таблица со списком объектов, которые были найдены по URL */
  get $search_result_table() {
    return browser.$(`//table[contains(@class, 'SearchByUrl_searchResultTable')]`);
  }

  /** Все строки таблицы */
  get $$table_rows() {
    return this.$search_result_table.$$(`.//tbody`);
  }

  //------------------------------------------------- Методы -----------------------------------------------------------

  waitForLoad() {
    console.log(`Ждем загрузку страницы с результатами поиска...`);
    browser.pause(10000); // Костыльное решение. Надо подумать над тем, как понять что страница загрузилась.
    console.log(`Страница ${this.path} загрузилась`);
  }
}

export const baikalSearchByLink = new BaikalSearchByLink();

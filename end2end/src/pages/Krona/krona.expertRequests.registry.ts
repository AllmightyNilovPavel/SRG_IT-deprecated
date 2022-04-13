class KronaExpertRequestsRegistry {
  path = "/expert/requests";

  //------------------------------------------------ Геттеры -----------------------------------------------------------

  private get $root_expertRequestsTable(): WebdriverIO.Element {
    return browser.$(`//div[@id="expertRequestsTable_wrapper"]`);
  }

  private get $experts_table() {
    return $("#expertStatsTable");
  }
  /** картинка при перезагрузке таблицы результатов */
  get $table_processing() {
    return this.$root_expertRequestsTable.$(`.//div[@id="expertRequestsTable_processing"]`);
  }
  get $expertRequestsTable_allData() {
    return this.$root_expertRequestsTable.$$(`.//table/tbody/tr`);
  }

  get $all_requests_row() {
    return this.$experts_table.$("#expert_row_0");
  }

  get $experts_select(): WebdriverIO.Element {
    return $("#expert");
  }

  //------------------------------------------------- Методы -----------------------------------------------------------

  /** Строка в таблице заявок */
  expertRequestsTableRowById(requestId: string) {
    return this.$root_expertRequestsTable.$(`.//a[contains(text(), "${requestId}")]/../..`);
  }

  /** Возвращает имя аналитика на которого назначена заявка */
  whoIsAssigned(requestId: string) {
    return this.expertRequestsTableRowById(requestId).$(`./td[9]`).getText();
  }

  /** Открыть карточку эксперта (клик по Id) */
  goToExpertCard(requestId: string) {
    let target = this.$root_expertRequestsTable
      .$(`.//a[contains(text(), "${requestId}")]/../..`)
      .$(`./td[2]/a`);
    target.scrollIntoView();
    target.waitForClickable({
      timeoutMsg: `У заявки №${requestId} не получается кликнуть по Id`,
    });
    target.click();
    console.log(`Клик по id = ${requestId}`);
  }

  /** Функция ожидания прогрузки реестра */
  waitForLoad(iterations?: number) {
    console.log("Ожидаем загрузку реестра заявок. Url = ", browser.getUrl());

    for (let index = 0; index <= (iterations ? iterations : 3); index++) {
      console.log("Ожидание загрузки реестра. Попытка №", index + 1);

      if (this.$root_expertRequestsTable.waitForExist({ timeout: 15000, reverse: false })) {
        if (this.$root_expertRequestsTable.isDisplayed()) {
          this.$table_processing.waitForDisplayed({ timeout: 30000, reverse: true });
          console.log("Реестр загрузился.");
          break;
        } else {
          console.log("Реестр загрузился, но не отрисовалась таблица. Пробуем ещё раз.");
          browser.refresh();
          // this.waitForLoad();
        }
      } else {
        console.log("Реестр не загрузился. Пробуем ещё раз.");
        browser.refresh();
        // this.waitForLoad();
      }
    }
  }

  /** Показать все заявки */
  chooseAllRequests() {
    this.$all_requests_row.$("td > a").click();
    this.waitForLoad();
  }

  chooseExpert(expertName: string) {
    this.$experts_select.click();
    this.$experts_select.$(`option=${expertName}`).click();
  }

  assignExpertOnRequest(requestId: string, expertName: string) {
    this.expertRequestsTableRowById(requestId).$("input[type*='checkbox']").click();
    this.chooseExpert(expertName);
    $("#change-executor-urgently").click();
  }

  /** Отсортировать таблицу заявок по Id
   *
   * @param sorting_method - Ожидаемый метод сортировки таблицы.
   * Для сортировки по возрастанию в sorting_method передавать значение sorting_asc/по-убыванию sorting_desc.
   *
   * Изначально таблица не отсортирована и поэтому дефолтное значение sorting_method = sorting.
   * */
  sortingById(sorting_method = "sorting") {
    let header_id = this.$root_expertRequestsTable.$(`.//th[contains(text(), "ID")]`);
    browser.waitUntil(() => header_id.getAttribute(`class`).match(`sorting`) !== null, {
      timeoutMsg: `При открытии реестра заявок у элемента header_id класс должен называться sorting, но сейчас это не так.
        Фактическое имя класса = ${header_id.getAttribute(`class`)}`,
    });
    header_id.waitForClickable({
      timeoutMsg: `Заголовок ID не кликабелен`,
    });
    header_id.click();
    console.log(`Клик по заголовку ID в таблице с заявками`);
    this.waitForLoad();
    browser.waitUntil(() => header_id.getAttribute(`class`).match(`sorting_asc`) !== null, {
      timeoutMsg: `Ожидается, что сортировка будет по-возрастанию, что у элемента header_id имя класса будет = sorting_asc.
        А на самом деле фактическое имя класса = ${header_id.getAttribute(`class`)}`,
    });
    console.log(`Таблица заявок отсортирована по возрастающим id`);
    if (sorting_method == "sorting_asc") {
      return;
    }
    header_id.waitForClickable({
      timeoutMsg: `Заголовок ID не кликабелен`,
    });
    header_id.click();
    console.log(`Клик по заголовку ID в таблице с заявками`);
    this.waitForLoad();
    browser.waitUntil(() => header_id.getAttribute(`class`).match(`sorting_desc`) !== null, {
      timeoutMsg: `Ожидается, что сортировка будет по-убыванию, что у элемента header_id имя класса будет = sorting_desc.
        А на самом деле фактическое имя класса = ${header_id.getAttribute(`class`)}`,
    });
    console.log(`Таблица заявок отсортирована по убывающим id`);
    if (sorting_method == "sorting_desc") {
      return;
    }
  }
}

/** Страница "Реестр заявок" */
export const kronaExpertRequestsRegistry = new KronaExpertRequestsRegistry();

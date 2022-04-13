class BaClassicAdminRegistryCompanies {
  path = "/sa_companies.html";

  private get $base_companiesTable() {
    return $(`#companies_wrapper`);
  }
  private get $companiesTable_loader() {
    return this.$base_companiesTable.$(`#companies_processing`);
  }
  private get $companiesTable_data() {
    return this.$base_companiesTable.$(`#companies`);
  }
  /** Поле поиск компании по Наименованию */
  get $companiesTable_searchByTitle() {
    return this.$base_companiesTable.$(`#title`);
  }
  /** Поле поиск компании по ИНН */
  get $companiesTable_searchByInn() {
    return this.$base_companiesTable.$(`#inn`);
  }
  get $companiesTable_paginator() {
    return this.$base_companiesTable.$(`#companies_paginate`);
  }
  get $paginator_firstPage() {
    return this.$companiesTable_paginator.$(`li.first > a`);
  }
  get $paginator_previousPage() {
    return this.$companiesTable_paginator.$(`li.prev > a`);
  }
  get $paginator_activePage() {
    return this.$companiesTable_paginator.$(`li.active > a`);
  }
  get $paginator_nextPage() {
    return this.$companiesTable_paginator.$(`li.next > a`);
  }
  get $paginator_lastPage() {
    return this.$companiesTable_paginator.$(`li.last > a`);
  }
  // -----------------------------------------------------------------------
  waitForLoad() {
    this.$base_companiesTable.waitForExist({ timeout: 2000, reverse: false });
    this.$companiesTable_loader.waitForDisplayed({ timeout: 5000, reverse: true });
    this.$companiesTable_data.waitForDisplayed({ timeout: 5000 });
    this.$companiesTable_paginator.waitForDisplayed({});
    this.$paginator_lastPage.waitForClickable();
  }
  openCompanyData(row?: number) {
    row
      ? this.$companiesTable_data.$(`#row_${row}`).click()
      : this.$companiesTable_data.$(`#row_0`).click();
    // this.$companiesTable_data.$(`#row_${row}`)
  }
}

export const baClassicAdminRegistryCompanies = new BaClassicAdminRegistryCompanies();

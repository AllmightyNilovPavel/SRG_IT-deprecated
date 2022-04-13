export class BaReactDpaOrdersListBase {
  path = "/orders/dpa";
  registryName: string = "Реестр Заказов - Недвижимость ДПА";
  // ----------------------------------------------------------------------
  private get $root() {
    return $(`//div[starts-with(@class,'Orders_root')]`);
  }
  get $tableHeader() {
    return this.$root.$(`./div[starts-with(@class,'Orders_tableHeader')]`);
  }
  get $tableBody() {
    return this.$root.$(
      `./div[starts-with(@class,'Orders_tableWrap')]//table[contains(@class,'Orders_table')]`
    );
  }
  get $tableContents() {
    return this.$tableBody.$(`./tbody`);
  }
}

// export const baReactDpaOrdersList = new BaReactDpaOrdersList()

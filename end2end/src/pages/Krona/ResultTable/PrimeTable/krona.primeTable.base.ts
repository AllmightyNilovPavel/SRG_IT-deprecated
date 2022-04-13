export default class PrimeTableBase {
  private get $root() {
    return $(`//div[starts-with(@class,'PrimeTable_root')]`);
  }
  private get $primeTable_wrapper() {
    return this.$root.$(`/div[starts-with(@class,'PrimeTable_tableWrapper')`);
  }
  protected get $primeTable_header() {
    return this.$root.$(`/div[starts-with(@class,'PrimeTable_tableHeader')`);
  }
  protected get $primeTable_footer() {
    return this.$root.$(`/div[starts-with(@class,'PrimeTable_tableFooter')`);
  }
  protected get $PrimeTable_tableBody() {
    return this.$primeTable_wrapper.$(`//table/tbody`);
  }
  protected get $PrimeTable_tableData() {
    return this.$PrimeTable_tableBody.$$(`/tr`);
  }
}

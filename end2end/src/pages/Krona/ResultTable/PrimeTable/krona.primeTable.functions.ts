import PrimeTableBase from "./krona.primeTable.base";

export default class PrimeTableFunctions extends PrimeTableBase {
  waitForLoad() {
    this.$PrimeTable_tableBody.waitForDisplayed({});
    this.$primeTable_header.waitForDisplayed({});
    this.$primeTable_footer.waitForDisplayed({});
  }
  tableIsEmpty() {
    let element = this.$PrimeTable_tableData;

    // if(element === null || )
  }
}

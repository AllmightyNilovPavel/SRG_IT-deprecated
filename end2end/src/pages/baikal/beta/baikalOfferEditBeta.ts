import { expect } from "chai";

import { baikalOfferFullBeta } from "./baikalOfferFullBeta";

class BaikalOfferEdit {
  path = "/baikal/offer-edit";

  get $header() {
    return browser.$(`div[class*=CoreLayout_header]`);
  }

  get $content() {
    return browser.$(`div[class*='OfferFull_content']`);
  }

  get $action_panel() {
    return browser.$(`div[class*='ActionPanel_actions']`);
  }

  get $table() {
    return browser.$(`table[class*='Calculation_table']`);
  }

  get_row_by_name(fieldName: string) {
    const rows = this.$table.$$(`tr`);
    const needRow = rows.find((row) => {
      const titleCell = row.$("td").$(`div[class*='Calculation_text']`).getText();
      if (titleCell === fieldName) {
        return true;
      }
      return false;
    });

    return needRow;
  }

  goToOfferFull() {
    this.$action_panel.$(`a[href*='offer']`).click();
  }

  changeField(fieldName: string, value: string) {
    const needRow = this.get_row_by_name(fieldName);
    expect(needRow).not.undefined;
    needRow!.$(`textarea[class*='Calculation_input']`).setValue(value);
  }

  waitForLoad() {
    this.$content.waitForDisplayed({});
    baikalOfferFullBeta.waitForLoad();
  }
}

export const baikalOfferEditBeta = new BaikalOfferEdit();

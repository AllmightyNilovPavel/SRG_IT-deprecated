import options from "options";
import { KronaCompanyCardBase } from "./krona.companyCard.base";

export class KronaCompanyCardFunctions extends KronaCompanyCardBase {
  WaitForLoad() {
    this.$root_tabs.waitForDisplayed({});
    this.$root_infoBox.waitForDisplayed({});
  }
  OpenCompanyCard(companyId: string) {
    browser.url(options.krona.host + this.path + companyId);
    console.log("Открыта карточка компании: ", browser.getUrl());
    this.WaitForLoad();
  }
}

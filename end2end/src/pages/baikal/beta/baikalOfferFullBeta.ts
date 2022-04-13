import { baikalOfferEditBeta } from "./baikalOfferEditBeta";

class BaikalOfferFull {
  path = "/baikal/offer";

  //------------------------------------------------- Геттеры ----------------------------------------------------------

  get $header() {
    return browser.$(`div[class*=CoreLayout_header]`);
  }

  get $content() {
    return browser.$(`div[class*='OfferFull_content']`);
  }

  get $action_panel() {
    return browser.$(`div[class*='ActionPanel_actions']`);
  }

  get $offerFullLink() {
    return browser.$(`//a[contains(@class, "OfferFull_link")]`);
  }

  //------------------------------------------------ Методы ------------------------------------------------------------

  get_value_by_name(fieldName: string) {
    const titles = this.$content.$$(`div[class*='OfferFull_row_title']`);

    const needCell = titles.find((title) => {
      const titleCell = title.getText();

      if (!titleCell) return;

      return titleCell === fieldName;
    });

    return needCell?.parentElement();
  }

  goToOfferEdit() {
    this.$action_panel.$(`a[href*='offer-edit']`).click();
    baikalOfferEditBeta.waitForLoad();
  }

  waitForLoad() {
    this.$content.waitForDisplayed({});
  }
}

export const baikalOfferFullBeta = new BaikalOfferFull();

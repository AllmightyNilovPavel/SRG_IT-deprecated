import { KronaRegions } from "./Enums/krona.enum.regions";

class KronaSmartAppraisers {
  path = "/fa_v2/smart_appraisers";

  private get $root() {
    return $(`div[class^='SmartAppraisers_root']`);
  }
  private get $input_region() {
    return this.$root.$(`div#smartRegion > input`);
  }
  private get $button_download() {
    return this.$root.$(`button.ui.primary.button`);
  }
  private get $checkbox_allregions() {
    return this.$root.$(`label[for='smartAllRegion']`);
  }
  private get $error() {
    return this.$root.$(`div.ui.error.message`);
  }
  // -----------------------------------------------------
  waitForLoad() {
    browser.waitUntil(() => browser.getUrl().match(this.path) != null);
    this.$root.waitForExist({ timeout: 10000, reverse: false });
  }
  chooseRegion(region: KronaRegions) {
    if (region != KronaRegions.ALL_REGIONS) {
      this.$input_region.scrollIntoView();
      this.$input_region.click();
      this.$input_region.setValue(region);
      browser.keys("Tab");
    } else {
      this.$checkbox_allregions.scrollIntoView();
      this.$checkbox_allregions.waitForClickable();
      this.$checkbox_allregions.click();
    }
  }
  downloadAnalytics() {
    // константа для поиска нужного класса
    const regex = /loading/g;

    this.$button_download.scrollIntoView();
    this.$button_download.waitForClickable();
    console.log("Проверяем атрибут Класс у кнопки", this.$button_download.getAttribute("class"));
    this.$button_download.click();
    browser.waitUntil(() => this.$button_download.getAttribute("class").search(regex) !== -1, {
      timeout: 5000,
    });
    console.log("Проверяем наличие класса у кнопки", this.$button_download.getAttribute("class"));
    browser.pause(500);
    browser.waitUntil(() => this.$button_download.getAttribute("class").search(regex) === -1, {
      interval: 1000,
      timeout: 100000,
      timeoutMsg: `Ошибка при скачивании выгрузки участников SMART. ${browser.getUrl()}`,
    });
    console.log("Проверяем атрибут Класс у кнопки", this.$button_download.getAttribute("class"));
    browser.pause(2000);
    if (this.$error.isDisplayed()) {
      browser.takeScreenshot();
      throw new Error("Ошибка при скачивании выгрузки участников SMART.");
    }
  }
}

/** Участники SMART */
export const kronaSmartAppraisers = new KronaSmartAppraisers();

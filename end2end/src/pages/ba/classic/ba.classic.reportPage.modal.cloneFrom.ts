import { debugLogging } from "modules";
import { BaReportPage } from ".";

class ModalCloneFromReport extends BaReportPage {
  private get $root() {
    return $(`//div[@class='modal hide clone-from-modal in']`);
  }
  get $inputReportNumber() {
    return this.$root.$(`.//input[@class='search-query search-for-clone tt-input']`);
  }
  /** Кнопка "Выбрать" у первого варианта подсказки с отчётом */
  get $firstSuggestion() {
    return this.$root.$(`.//a[@class='search-for-clone-link']`);
  }
  get $cloningReportReportNumberCheck() {
    return this.$root.$(`.//span[@class='reportNumber']`);
  }
  get $cloningReportAddressCheck() {
    return this.$root.$(`.//span[@class='textAddress']`);
  }
  get $checkboxCloneAllData() {
    return this.$root.$(`.//input[@id='cloneAll']`);
  }
  get $checkboxCloneBuildingData() {
    return this.$root.$(`.//input[@id='cloneChapterBuilding']`);
  }
  get $buttonFillCurrentReport() {
    return this.$root.$(`.//button[@class='btn btn-success']`);
  }
  get $buttonAcceptCurrentReportFill() {
    return $(
      `//div[contains(text(),'В отчете будут перезаписаны данные выбранных разделов.')]/..//a[@class='btn btn-primary']`
    );
  }

  cloneFromReport(reportNumber: string) {
    let target: WebdriverIO.Element;

    if (!this.$root.isDisplayed() && this.$button_cloneFrom.isClickable())
      this.$button_cloneFrom.click();

    this.$root.waitForDisplayed();
    target = this.$inputReportNumber;
    target.waitForClickable();
    target.click();
    target.setValue(reportNumber);

    target = this.$firstSuggestion;
    target.waitForClickable();
    target.click();
    debugLogging(`адрес выбранного отчёта: ${this.$cloningReportAddressCheck.getText()}`);
    browser.waitUntil(() => this.$cloningReportAddressCheck.getText() !== null);

    target = this.$checkboxCloneAllData;
    target.waitForClickable();
    target.click();

    target = this.$buttonFillCurrentReport;
    target.waitForEnabled();
    target.waitForClickable();
    target.click();

    target = this.$buttonAcceptCurrentReportFill;
    target.waitForClickable();
    target.click();

    this.waitForLoad();
  }
}

export const modalCloneFromReport = new ModalCloneFromReport();

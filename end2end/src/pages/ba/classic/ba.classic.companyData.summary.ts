import options from "options";

class BaCompanyDataSummaryPage {
  path = "/info_summary.html";

  private get $root() {
    return $(`div.container-fluid`);
  }
  get $button_infoSummaryCreateReportButton() {
    return this.$root.$(`#infoSummaryCreateReportButton`);
  }
  get $button_infoSummaryAddUserButton() {
    return this.$root.$(`#infoSummaryAddUserButton`);
  }
  private get $countUserReportsBar_root() {
    return this.$root.$(`#count-user-reports-bar`);
  }
  private get $userWaitingReportsContainer_root() {
    return this.$root.$(`#userWaitingReportsContainer`);
  }
  private get $userNotFinishedReportsContainer_root() {
    return this.$root.$(`#userNotFinishedReportsContainer`);
  }
  private get $userListWithReportsCountContainer_root() {
    return this.$root.$(`#userListWithReportsCountContainer`);
  }

  // -----------------------------------------------------------------------------
  open() {
    browser.url(options.ba.host + this.path);
  }
  waitForLoad() {
    browser.waitUntil(() => browser.getUrl().match(this.path) !== null);
    this.$root.waitForDisplayed({ timeout: 10000, reverse: false });
  }
  getCurrentUserReportsCount() {
    this.$countUserReportsBar_root.$(``);
  }
}

export const baCompanyDataSummaryPage = new BaCompanyDataSummaryPage();

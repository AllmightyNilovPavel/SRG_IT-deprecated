class AppraisalHistory {
  path = "appraisal/history/report";

  private get $root() {
    return $(`body > div.container-fluid`);
  }
  get $button_returnToRegistry() {
    return this.$root.$(`button.btn-go-to-report-list`);
  }
  private get $requisites() {
    return this.$root.$(`div#requisites`);
  }

  waitForLoad() {
    // browser.waitUntil(() => browser.getUrl().match(this.path) != null)
    this.$requisites.waitForDisplayed({
      timeout: 10000,
      reverse: true,
      timeoutMsg: "Данные отчёта не прогрузились.",
    });
  }
}

export const appraisalHistory = new AppraisalHistory();

import { BaReportNavigationPanels } from "./../../enums";

export class BaResidentialReportNavBar {
  private get $root() {
    return $(`#report-nav-bar`);
  }
  navigateTo(reportPanel: BaReportNavigationPanels) {
    let tabToGo = this.$root.$(`a[href="${reportPanel}"]`);
    tabToGo.scrollIntoView();
    tabToGo.waitForClickable();
    tabToGo.click();
  }
}

import options from "options";

class BaClassicAdminCompanyData {
  path = "/sa_company.html?id=";

  get $button_saveCompanyData() {
    return $(`a[onclick="saveCompany()"]`);
  }
  get $button_closeAccount() {
    return $(`a[onclick="closeCompany()"]`);
  }
  private get $base_companyBasicInfoPanel() {
    return $(`#info_panel`);
  }
  private get $base_companyBasicInvoicesPanel() {
    return $(`#invoices_panel`);
  }
  private get $base_companyBasicPaymentsPanel() {
    return $(`#payments_panel`);
  }
  private get $base_companyBasicContractFaPanel() {
    return $(`#contract_fa_company_panel`);
  }

  waitForLoad() {
    this.$base_companyBasicInfoPanel.waitForExist({ timeout: 2000, reverse: false });
    this.$base_companyBasicInfoPanel.waitForDisplayed({ timeout: 2000, reverse: false });
  }
  openCompanyCard(id: number) {
    browser.url(options.ba.host + this.path + String(id));
  }
}

export const baClassicAdminCompanyData = new BaClassicAdminCompanyData();

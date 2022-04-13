import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import {
  kronaLoginPage,
  kronaNavigationBar,
  kronaResultTable,
  aijkOrders,
  KronaDataType,
  KronaNavigationButtons,
  kronaFiltersBox,
  AijkOrdersStatus,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. Реестр АИЖК.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });
  it(`Логин в крону`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.srg.superadmin,
      TestDataKrona.Users.password.srg.superadmin
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Открыть реестр`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.AIJK_ORDERS);
    kronaResultTable.waitForLoad();
  });
  it(`Применить фильтр по статусу`, function () {
    allureReporter.generateReport();
    kronaFiltersBox.waitForLoad();
    kronaFiltersBox.$select_status.waitForDisplayed({});
    kronaFiltersBox.$select_status.selectByAttribute("value", AijkOrdersStatus.SRG_READY);
    kronaFiltersBox.$button_filterReestr.click();
    kronaResultTable.waitForLoad();
  });
  it(`Перейти в карточку`, function () {
    allureReporter.generateReport();
    kronaResultTable.resultTableGetData(KronaDataType.AIJK).click();
    kronaNavigationBar.waitForLoad();
    aijkOrders.$aijkOrderCard_HistoryTable.waitForExist({ timeout: 5000, reverse: false });
    expect(aijkOrders.$button_AijkOrderCard_print.isExisting()).to.be.true;
    makeScreenshot("SMOKE_AijkOrderCard_openedSuccessfully");
  });
});

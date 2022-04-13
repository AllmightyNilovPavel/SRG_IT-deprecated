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
  kronaSbdOrders,
  KronaDataType,
  KronaNavigationButtons,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. Отчёты об оценке. Открытие`, function () {
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
    kronaNavigationBar.navigate_to(KronaNavigationButtons.OPENBANK_ORDERS);
    kronaResultTable.waitForLoad();
    makeScreenshot("SMOKE_ОтчётыСбербанк_реестр");
  });
  it(`Перейти в  карточку`, function () {
    allureReporter.generateReport();
    kronaResultTable.resultTableGetData(KronaDataType.OPENBANK_ORDER).click();
    kronaNavigationBar.waitForLoad();
    kronaSbdOrders.$sbdOrderCard_HistoryTable.waitForExist({ timeout: 5000, reverse: false });
    expect(kronaSbdOrders.$button_sbdOrderCard_print.isExisting()).to.be.true;
    makeScreenshot("SMOKE_ОтчётыСбербанк_карточка");
  });
});

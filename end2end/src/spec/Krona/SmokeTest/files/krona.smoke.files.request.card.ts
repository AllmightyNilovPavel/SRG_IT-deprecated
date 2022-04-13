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
  kronaRequestCard,
  KronaDataType,
  KronaResidentialRequestStatus,
  KronaNavigationButtons,
  kronaErrorPage,
  kronaRequestsRegistry,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. SRG. Файлы. Реестр объектов. Карточка отчёта. Заключение.`, function () {
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
  it(`Открыть реестр объектов`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REQUESTS_OLD);
    kronaResultTable.waitForLoad();
  });
  it(`Отфильтровать запросы`, function () {
    allureReporter.generateReport();
    kronaRequestsRegistry.select_status(KronaResidentialRequestStatus.ACCEPTED_AUTO_VALUATION);
    kronaRequestsRegistry.$button_showResult.click();
    kronaResultTable.waitForLoad();
  });
  it(`Открыть карточку объекта`, function () {
    allureReporter.generateReport();
    kronaResultTable.resultTableGetData(KronaDataType.REQUEST).click();
    kronaRequestCard.$table_requestSourceInfo.waitForDisplayed({ timeout: 5000 });
  });
  it(`Скачать файл`, function () {
    allureReporter.generateReport();
    kronaRequestCard.$button_downloadConclusion.click();
    browser.pause(1000);
    expect(kronaErrorPage.$errorBody.isDisplayed()).to.be.false;
  });
  it(`Скриншот скачанных файлов`, function () {
    allureReporter.generateReport();
    browser.url(`chrome://downloads`);
    browser.pause(1000);
    makeScreenshot("SMOKE_Файлы_Заключение_из_карточки_Объекта");
  });
});

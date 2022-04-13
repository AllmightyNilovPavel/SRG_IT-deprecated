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
  kronaVehicleValuationOrdersRegistry,
  KronaFileType,
  KronaNavigationButtons,
  KronaVehicleBzoStatus,
  kronaErrorPage,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. SRG. Файлы. БЗО-ТС. Отчёт.`, function () {
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
  it(`Открыть реестр БЗО.ТС`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REGISTRY_VEHICLE_REPORTS_BZO);
    kronaResultTable.waitForLoad();
  });
  it(`Отфильтровать по статусу "БЗО.Готово"`, function () {
    allureReporter.generateReport();
    kronaVehicleValuationOrdersRegistry.select_status(KronaVehicleBzoStatus.APPROVED);
    kronaVehicleValuationOrdersRegistry.$filterDate_dateBegin.setValue("20.08.2019");
    kronaVehicleValuationOrdersRegistry.$button_showResults.click();
    kronaResultTable.waitForLoad();
    this.retries(3);
  });
  it(`Скачать заключение`, function () {
    allureReporter.generateReport();
    kronaResultTable.resultTable_download(KronaFileType.vehicle_conclusion).scrollIntoView();
    kronaResultTable.resultTable_download(KronaFileType.vehicle_conclusion).click();
    browser.pause(1500);
    expect(kronaResultTable.resultTable_download(KronaFileType.vehicle_conclusion).isClickable()).to
      .be.true;
    expect(kronaErrorPage.$errorBody.isDisplayed()).to.be.false;
  });
  it(`Скриншот скачанных файлов`, function () {
    allureReporter.generateReport();
    browser.url(`chrome://downloads`);
    browser.pause(1000);
    makeScreenshot("SMOKE_Файлы_БЗО-ТС-заключение");
  });
});

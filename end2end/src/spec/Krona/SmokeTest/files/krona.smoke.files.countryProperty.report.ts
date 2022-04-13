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
  KronaFileType,
  KronaNavigationButtons,
  CountryPropertyStatus,
  kronaErrorPage,
  KronaDataType,
  kronaFiltersBox,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. SRG. Файлы. Жилые Дома. Отчёт.`, function () {
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
    kronaNavigationBar.navigate_to(KronaNavigationButtons.REGISTRY_COUNTRY_PROPERTY);
    kronaResultTable.waitForLoad();
    browser.waitUntil(
      () => kronaResultTable.resultTableGetData(KronaDataType.COUNTRY_PROPERTY).isDisplayed(),
      {
        timeout: 10000,
        timeoutMsg: `Данные реестра ${browser.getUrl()} не загрузились`,
      }
    );
  });
  it(`Отфильтровать по статусу "готово"`, function () {
    allureReporter.generateReport();
    let resultTableInfo: string = kronaResultTable.$resultTable_Info.getText();
    kronaFiltersBox.selectStatus(CountryPropertyStatus.READY);
    kronaFiltersBox.showResults();
    browser.pause(2000);
    kronaResultTable.waitForLoad();
    // kronaFiltersBox.showResults(KronaRegistryFilters.STATUS, CountryPropertyStatus.READY)

    expect(resultTableInfo).to.not.equal(kronaResultTable.$resultTable_Info.getText());
  });
  it(`Скачать отчёт по ЖД`, function () {
    allureReporter.generateReport();
    let target = kronaResultTable.resultTable_download(KronaFileType.countryProperty_report);
    target.scrollIntoView();
    target.click();
    browser.pause(2500);
    expect(kronaErrorPage.$errorBody.isDisplayed()).to.be.false;
    makeScreenshot("Krona_smoke_ЖилыеДома-отчёт");
  });
});

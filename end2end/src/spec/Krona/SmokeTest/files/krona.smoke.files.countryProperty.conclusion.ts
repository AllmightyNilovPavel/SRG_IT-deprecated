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
  kronaFiltersBox,
  KronaDataType,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. SRG. Файлы. Жилые Дома. Заключение.`, function () {
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
    // kronaCountryPropertyRegistry.select_status();
    // kronaCountryPropertyRegistry.$button_showResult.click();
    // kronaResultTable.waitForLoad();

    expect(resultTableInfo).to.not.equal(kronaResultTable.$resultTable_Info.getText());
  });
  it(`Открыть заключение в новой вкладке и сделать скриншот`, function () {
    allureReporter.generateReport();
    let target = kronaResultTable.resultTable_download(KronaFileType.countryProperty_conclusion);

    target.scrollIntoView();
    target.click();
    browser.pause(250);
    expect(kronaErrorPage.$errorBody.isDisplayed()).to.be.false;

    browser.switchWindow(`country_property/download/conclusion`);
    browser.pause(2500);
    makeScreenshot(`SMOKE_заключениеЖД`);
  });
});

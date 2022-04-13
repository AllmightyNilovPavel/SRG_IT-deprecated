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
  kronaAccreditationsRegistry,
  kronaAccreditationCard,
  KronaDataType,
  KronaNavigationButtons,
} from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. ВТБ. Проверка реестра Аккредитаций.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
  });

  it(`Логин в крону под юзером ВТБ`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    kronaLoginPage.waitForLoad();
    kronaLoginPage.login(
      TestDataKrona.Users.login.vtb.autotest_accred,
      TestDataKrona.Users.password.vtb.autotest_accred
    );
    kronaNavigationBar.waitForLoad();
  });
  it(`Открытие реестра Аккредитаций`, function () {
    allureReporter.generateReport();
    kronaNavigationBar.navigate_to(KronaNavigationButtons.ACCREDITATIONS);
    kronaResultTable.waitForLoad();

    browser.waitUntil(
      () => kronaResultTable.resultTableGetData(KronaDataType.ACCREDITATION).isDisplayed(),
      {
        timeout: 10000,
        timeoutMsg: `Данные реестра ${browser.getUrl()} не загрузились`,
      }
    );

    expect(kronaResultTable.resultTableGetData(KronaDataType.ACCREDITATION).isDisplayed()).to.be
      .true;
    makeScreenshot("SMOKE_РеестрАккредитаций_ВТБ");
  });
  it(`Фильтр записей по ИНН`, function () {
    allureReporter.generateReport();
    kronaAccreditationsRegistry.$filter_Inn.setValue("5902300019");
    kronaAccreditationsRegistry.$button_filter.click();
    kronaResultTable.waitForLoad();
    expect(kronaResultTable.resultTableGetData(KronaDataType.ACCREDITATION).isDisplayed()).to.be
      .true;
  });
  it(`Переход в карточку аккредитации`, function () {
    allureReporter.generateReport();
    kronaResultTable.resultTableGetData(KronaDataType.ACCREDITATION).click();
    kronaAccreditationCard.$input_BaCompanyId.waitForDisplayed({ timeout: 10000, reverse: false });
    expect(kronaAccreditationCard.$button_addAccType.isExisting()).to.be.true;
    makeScreenshot("SMOKE_КарточкаАккредитации_ВТБ");
  });
});

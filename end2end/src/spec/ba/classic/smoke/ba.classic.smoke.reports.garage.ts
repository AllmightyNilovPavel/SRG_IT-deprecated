import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";

import {
  baLoginPage,
  baMainPage,
  BaNavigationButtons,
  baClassicReportsTable,
  baClassicNavMenu,
} from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

describe(`BA. CLASSIC. SMOKE. Реестр отчётов. Гаражи.`, function () {
  let testTitle: string = this.title;
  let screenshotName: string = testTitle;

  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.BA,
    story: testTitle,
  });
  it(`Логин в БО`, function () {
    allureReporter.generateReport();
    baLoginPage.open();
    baLoginPage.waitForLoad();
    expect(baLoginPage.$input_login.isExisting()).to.be.true;
    expect(baLoginPage.$input_password.isExisting()).to.be.true;
    baLoginPage.login(
      TestDataBa.Users.login.zarnitsa.admin,
      TestDataBa.Users.password.zarnitsa.admin
    );

    baMainPage.waitForLoad();
    expect(baMainPage.$button_newReportToModal.isExisting()).to.be.true;
  });
  it(`Перейти на вкладку "Гаражи"`, function () {
    allureReporter.generateReport();
    baClassicNavMenu.navigateTo(BaNavigationButtons.GARAGE);
    baClassicReportsTable.waitForLoad();
    expect(browser.getUrl()).to.include("/garage");
  });
  it(`Проверка наличия данных в таблице`, function () {
    allureReporter.generateReport();
    let temp = baClassicReportsTable.$$table_content;
    expect(temp).to.be.not.null;
    makeScreenshot(screenshotName);
  });
});

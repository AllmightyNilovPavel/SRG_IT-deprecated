import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { baLoginPage, baMainPage, baAggregatorModeratorOrderList } from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

describe(`БО. СМОК. Реестр заказов. Агрегатор для Модератора.`, function () {
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
      TestDataBa.Users.login.srg.moderator,
      TestDataBa.Users.password.srg.moderator
    );
    baMainPage.waitForLoad();
    expect(baMainPage.$button_newReportToModal.isExisting()).to.be.true;
  });
  it(`Перейти в реестр заказов "Агрегатор".`, function () {
    allureReporter.generateReport();
    baAggregatorModeratorOrderList.open();
    baAggregatorModeratorOrderList.waitForLoad();
    expect(browser.getUrl()).to.include(baAggregatorModeratorOrderList.path);
  });
  it(`Проверка наличия данных в таблице заказов`, function () {
    allureReporter.generateReport();
    let temp = baAggregatorModeratorOrderList.$$table_content;
    expect(temp).to.be.not.empty;

    makeScreenshot(screenshotName);
  });
});

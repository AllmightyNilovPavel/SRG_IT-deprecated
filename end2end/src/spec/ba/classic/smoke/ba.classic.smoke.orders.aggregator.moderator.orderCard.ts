import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import {
  baLoginPage,
  baMainPage,
  baAggregatorModeratorOrderList,
  baAggregatorModeratorOrdersCard,
} from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

describe(`БО. СМОК. Реестр заказов. SmartОценка(Аггрегатор). Модератор. Карточка заказа.`, function () {
  let testTitle: string = this.title;
  let screenshotName: string = testTitle;

  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.BA,
    story: testTitle,
  });
  it(`Логин в БО под Модератором`, function () {
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
  it(`Перейти в реестр заказов "SmartОценка".`, function () {
    allureReporter.generateReport();
    baAggregatorModeratorOrderList.open();
    baAggregatorModeratorOrderList.waitForLoad();
    expect(browser.getUrl()).to.include(baAggregatorModeratorOrderList.path);
  });
  it(`Открываем карточку первого заказа из списка`, function () {
    allureReporter.generateReport();
    let target = baAggregatorModeratorOrderList.$aggregatorOrdersTable_firstElement;

    target.scrollIntoView({ block: "center", inline: "center" });
    target.waitForClickable();
    target.click();
  });
  it(`Проверка загрузки карточки заказа`, function () {
    allureReporter.generateReport();
    browser.waitUntil(
      () =>
        browser.getUrl().match(baAggregatorModeratorOrdersCard.path) !== null &&
        $(`div.report-body`).isDisplayed(),
      {
        timeout: 20000,
        timeoutMsg: `Карточка заказа ${browser.getUrl()} не загрузилась за 20 секунд.`,
      }
    );

    makeScreenshot(screenshotName);
  });
});

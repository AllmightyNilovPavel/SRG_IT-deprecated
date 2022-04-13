import {
  AllureTestEnv,
  AllureReporterProducts,
  AllureReporterHelper,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { baAggregatorOrdersList, baLoginPage, baMainPage, refinOrdersCard } from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

describe(`БО. СМОК. Реестр заказов. SmartОценка(Аггрегатор). Оценщик. Карточка заказа.`, function () {
  let testTitle: string = this.title;
  let screenshotName: string = testTitle;

  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.BA,
    story: testTitle,
  });
  it(`Логин в БО под Ипотечным Центром`, function () {
    allureReporter.generateReport();
    baLoginPage.open();
    baLoginPage.waitForLoad();
    expect(baLoginPage.$input_login.isExisting()).to.be.true;
    expect(baLoginPage.$input_password.isExisting()).to.be.true;

    baLoginPage.login(
      TestDataBa.Users.login.srg.ipotechniyCenter,
      TestDataBa.Users.password.srg.ipotechniyCenter
    );
    baMainPage.waitForLoad();
    expect(baMainPage.$button_newReportToModal.isExisting()).to.be.true;
  });
  it(`Перейти в реестр заказов "SmartОценка".`, function () {
    allureReporter.generateReport();
    baAggregatorOrdersList.open();
    baAggregatorOrdersList.waitForLoad();
    expect(browser.getUrl()).to.include(baAggregatorOrdersList.path);
  });
  it(`Открываем карточку первого заказа из списка`, function () {
    allureReporter.generateReport();
    let target = baAggregatorOrdersList.$table_firstElement;
    target.scrollIntoView();
    target.click({ x: 0, y: 0 });
  });
  it(`Проверка загрузки карточки заказа`, function () {
    allureReporter.generateReport();
    browser.waitUntil(
      () =>
        browser.getUrl().match(refinOrdersCard.path) !== null && $(`div.report-body`).isDisplayed(),
      {
        timeout: 50000,
        timeoutMsg: `Карточка заказа ${browser.getUrl()} не загрузилась за 50 секунд.`,
      }
    );
    console.log(`Имя скриншота: [${screenshotName}]`);
    makeScreenshot(screenshotName);
  });
});

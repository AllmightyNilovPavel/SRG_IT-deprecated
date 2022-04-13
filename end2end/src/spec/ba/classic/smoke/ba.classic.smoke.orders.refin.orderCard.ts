import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { baLoginPage, baMainPage, refinOrdersList, refinOrdersCard } from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

describe(`БО. СМОК. Реестр заказов. Рефинансирование. Карточка заказа.`, function () {
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
      TestDataBa.Users.login.srg.ipotechniyCenter,
      TestDataBa.Users.password.srg.ipotechniyCenter
    );
    baMainPage.waitForLoad();
    expect(baMainPage.$button_newReportToModal.isExisting()).to.be.true;
  });
  it(`Перейти в реестр заказов "Рефинансирование".`, function () {
    allureReporter.generateReport();
    refinOrdersList.open();
    refinOrdersList.waitForLoad();
    expect(browser.getUrl()).to.include(refinOrdersList.path);
  });
  it(`Фильтруем заказы по "БЗО. Готово"`, function () {
    allureReporter.generateReport();
    let target = refinOrdersList.$table_firstElement;
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

    makeScreenshot(screenshotName);
  });
});

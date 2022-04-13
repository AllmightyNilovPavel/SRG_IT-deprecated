import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { baLoginPage, baMainPage, faOrdersList, faOrderCard } from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

describe(`БО. СМОК. Реестр заказов. Экспресс-оценка. Карточка заказа`, function () {
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
  it(`Перейти в реестр заказов "Экспресс-оценка".`, function () {
    allureReporter.generateReport();
    faOrdersList.open();
    faOrdersList.waitForLoad();
    expect(browser.getUrl()).to.include(faOrdersList.path);
  });
  it(`Переход в карточку первого заказа в таблице`, function () {
    allureReporter.generateReport();
    let target = faOrdersList.$table_firstElement;
    target.scrollIntoView({ block: "center", inline: "center" });
    target.click({ x: 0, y: 0 });
  });
  it(`Проверка загрузки карточки заказа`, function () {
    allureReporter.generateReport();
    let customTimeout = 10000;
    browser.waitUntil(
      () =>
        browser.getUrl().match(faOrderCard.path) !== null &&
        faOrderCard.$data_orderInfo.isDisplayed(),
      {
        timeout: customTimeout,
        timeoutMsg: `Карточка заказа ${browser.getUrl()} не загрузилась за ${
          customTimeout / 1000
        } секунд.`,
      }
    );

    makeScreenshot(screenshotName);
  });
});

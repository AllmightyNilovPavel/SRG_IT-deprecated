import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { baLoginPage, baMainPage, realtyOrderCard, realtyOrdersList } from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

describe(`БО. СМОК. Реестр заказов. Недвижимость. Карточка заказа.`, function () {
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
  it(`Перейти в реестр заказов "Недвижимость".`, function () {
    allureReporter.generateReport();
    realtyOrdersList.open();
    realtyOrdersList.waitForLoad();
    expect(browser.getUrl()).to.include(realtyOrdersList.path);
  });
  it(`Переход в карточку первого заказа в таблице`, function () {
    allureReporter.generateReport();
    let target = realtyOrdersList.$table_firstElement;
    target.scrollIntoView();
    target.waitForClickable();
    console.log("test ", target.getAttribute("class"));
    console.log("order id: ", target.$(`.//td`).getText());
    target.click();
  });
  it(`Проверка загрузки карточки заказа`, function () {
    allureReporter.generateReport();
    let customTimeout = 10000;
    browser.waitUntil(
      () =>
        browser.getUrl().match(realtyOrderCard.path) !== null &&
        realtyOrderCard.$data_orderInfo.isDisplayed(),
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

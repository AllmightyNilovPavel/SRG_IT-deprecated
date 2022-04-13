import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import {
  baLoginPage,
  baMainPage,
  vehicleOrdersList,
  BaOrdersVehicleStatus,
  vehicleOrderCard,
} from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

describe(`БО. СМОК. Реестр заказов. Автомобили. Карточка заказа.`, function () {
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
  it(`Перейти в реестр заказов "Автомобили".`, function () {
    allureReporter.generateReport();
    vehicleOrdersList.open();
    vehicleOrdersList.waitForLoad();
    expect(browser.getUrl()).to.include(vehicleOrdersList.path);
  });
  it(`Фильтруем заказы по "БЗО. Готово"`, function () {
    allureReporter.generateReport();
    vehicleOrdersList.filterOrdersByStatus(BaOrdersVehicleStatus.APPROVED);

    let target = vehicleOrdersList.$table_firstElement;
    target.scrollIntoView({ block: "center", inline: "center" });
    target.click();
  });
  it(`Проверка загрузки карточки заказа`, function () {
    allureReporter.generateReport();
    let customTimeout = 10000;
    browser.waitUntil(
      () =>
        browser.getUrl().match(vehicleOrderCard.path) !== null &&
        vehicleOrderCard.$data_orderInfo.isDisplayed(),
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

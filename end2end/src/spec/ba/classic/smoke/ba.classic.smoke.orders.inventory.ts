import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";

import { baLoginPage, baMainPage, inventoryOrdersList } from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";

describe(`БО. СМОК. Реестр заказов. Товарно-материальные ценности.`, function () {
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
  it(`Перейти в реестр заказов "Товарно-материальные ценности".`, function () {
    allureReporter.generateReport();
    inventoryOrdersList.open();
    inventoryOrdersList.waitForLoad();
    expect(browser.getUrl()).to.include(inventoryOrdersList.path);
  });
  it(`Проверка наличия данных в таблице заказов`, function () {
    allureReporter.generateReport();
    let temp = inventoryOrdersList.$$table_content;
    expect(temp).to.be.not.empty;

    makeScreenshot(screenshotName);
  });
});

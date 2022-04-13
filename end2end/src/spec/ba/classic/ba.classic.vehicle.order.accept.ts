import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";

import { baLoginPage, baMainPage } from "pages/ba/classic";
import { TestDataBa } from "options/testData/ba";
import { makeScreenshot } from "modules";
import { valuationOrderList } from "pages/ba/classic/classic.ValuationOrderList";

describe.skip(`БО. Автомобили. Заказ. Принять.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvBA,
    product: AllureReporterProducts.BA,
    story: this.title,
  });

  let buttonsArr;
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
  it(`Открыть реестр заказов авто`, function () {
    allureReporter.generateReport();
    valuationOrderList.open();
    buttonsArr = valuationOrderList.$$table_OrderButtons;
    expect(buttonsArr).to.not.be.empty;
  });
  it(`Перейти в первый заказ`, function () {
    allureReporter.generateReport();
    buttonsArr[0].scrollIntoView({ block: "center", inline: "center" });
    buttonsArr[0].click({ x: 1, y: 1 });
  });
  it(``, function () {});
  it(``, function () {});
  it(``, function () {});
  it(``, function () {});
  it(``, function () {});
  it(``, function () {});
  it(``, function () {});
  it(``, function () {});
  it(``, function () {});
  it(``, function () {});
});

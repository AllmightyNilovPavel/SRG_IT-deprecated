import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { sviazOcenka, sviazUserCabinet } from "pages/fa";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";

describe.skip(`FA. SMOKE. Связьбанк. Личный Кабинет.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    sviazOcenka.open();
    sviazOcenka.$header_title.waitForDisplayed({ timeout: 5000 });
    makeScreenshot(`SMOKE_Связь`);
  });
  it(`Зайти в кабинет`, function () {
    allureReporter.generateReport();
    sviazOcenka.$button_userCabinet.click();
    sviazOcenka.$input_login.waitForDisplayed({ timeout: 10000, reverse: false });
    sviazOcenka.$input_login.click();
    sviazOcenka.$input_login.clearValue();
    sviazOcenka.$input_login.setValue(TestDataFa.Users.login.nilov);
    sviazOcenka.$button_send.click();
    sviazOcenka.$input_password.waitForDisplayed({ timeout: 5000 });
    sviazOcenka.$input_password.setValue(TestDataFa.Users.password.nilov);
    sviazOcenka.$button_send.click();
  });
  it(`Скриншот личного кабинета`, function () {
    allureReporter.generateReport();
    sviazUserCabinet.waitForLoad();
    expect(sviazUserCabinet.$button_newOrder.isClickable()).to.be.true;
    makeScreenshot("SMOKE_Связь_КабинетЮзера");
  });
});

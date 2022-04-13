import { gpbUserCabinet, gpbOcenka } from "pages/fa";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";

describe(`FA. SMOKE. ГПБ. Личный Кабинет.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    gpbOcenka.open();
    // gpbOcenka.$header_title.waitForDisplayed({ timeout: 5000});
    gpbOcenka.$buttonCreditOrderLink.waitForDisplayed();
    makeScreenshot(`SMOKE_ГПБ`);
  });
  it(`Зайти в кабинет`, function () {
    allureReporter.generateReport();
    gpbOcenka.$buttonCreditOrderLink.click();
    gpbOcenka.$input_login.waitForDisplayed({ timeout: 10000, reverse: false });
    gpbOcenka.$input_login.click();
    gpbOcenka.$input_login.clearValue();
    gpbOcenka.$input_login.setValue(TestDataFa.Users.login.nilov);
    if (!gpbOcenka.$input_password.isDisplayed()) {
      gpbOcenka.$button_send.click();
      gpbOcenka.$input_password.waitForDisplayed({ timeout: 5000 });
    }
    gpbOcenka.$input_password.click();
    gpbOcenka.$input_password.setValue(TestDataFa.Users.password.nilov);
    gpbOcenka.$button_send.click();
  });
  it(`Скриншот личного кабинета`, function () {
    allureReporter.generateReport();
    gpbUserCabinet.waitForLoad();
    // Передача данных селектора данных таблицы в переменную
    let tableContentCheck = gpbUserCabinet.$OrderList_tableContent;

    expect(tableContentCheck).to.be.not.empty;
    makeScreenshot("SMOKE_ГПБ_КабинетЮзера");
  });
});

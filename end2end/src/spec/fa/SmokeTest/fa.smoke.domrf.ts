import { domrfOcenka, domrfUserCabinet } from "pages/fa";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";

describe(`FA. SMOKE. ДомРФ. Личный Кабинет.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    domrfOcenka.open();
    domrfOcenka.$header_title.waitForDisplayed({ timeout: 5000 });
    makeScreenshot(`SMOKE_ДомРФ`);
  });
  it(`Зайти в кабинет`, function () {
    allureReporter.generateReport();
    domrfOcenka.$button_userCabinet.click();
    domrfOcenka.$input_login.waitForDisplayed({ timeout: 10000, reverse: false });
    domrfOcenka.$input_login.click();
    domrfOcenka.$input_login.clearValue();
    domrfOcenka.$input_login.setValue(TestDataFa.Users.login.nilov);
    domrfOcenka.$button_send.click();
    domrfOcenka.$input_password.waitForDisplayed({ timeout: 5000 });
    domrfOcenka.$input_password.setValue(TestDataFa.Users.password.nilov);
    domrfOcenka.$button_send.click();
  });
  it(`Скриншот личного кабинета`, function () {
    allureReporter.generateReport();
    domrfUserCabinet.waitForLoad();
    // Передача данных селектора данных таблицы в переменную
    let tableContentCheck = domrfUserCabinet.$OrderList_tableContent;

    expect(tableContentCheck).to.be.not.empty;
    makeScreenshot("SMOKE_ДомРФ_КабинетЮзера");
  });
});

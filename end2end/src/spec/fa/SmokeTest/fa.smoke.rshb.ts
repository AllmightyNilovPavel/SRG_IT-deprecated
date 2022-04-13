import { rshbOcenka, rshbUserCabinet } from "pages/fa";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";

describe(`FA. SMOKE. Россельхоз. Личный Кабинет.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    rshbOcenka.open();
    // rshbOcenka.$header_title.waitForDisplayed({ timeout: 5000});
    makeScreenshot(`SMOKE_РСХБ`);
  });
  it(`Зайти в кабинет`, function () {
    allureReporter.generateReport();
    rshbOcenka.$button_userCabinet.click();
    rshbOcenka.$input_login.waitForDisplayed({ timeout: 10000, reverse: false });
    rshbOcenka.$input_login.click();
    rshbOcenka.$input_login.clearValue();
    rshbOcenka.$input_login.setValue(TestDataFa.Users.login.nilov);
    // rshbOcenka.$input_login.setValue(TestDataFa.Users.login.nilov);
    rshbOcenka.$button_send.click();
    rshbOcenka.$input_password.waitForDisplayed({ timeout: 5000 });
    rshbOcenka.$input_password.click();
    rshbOcenka.$input_password.setValue(TestDataFa.Users.password.nilov);
    rshbOcenka.$button_send.click();
  });
  it(`Скриншот личного кабинета`, function () {
    allureReporter.generateReport();
    rshbUserCabinet.waitForLoad();
    // Передача данных селектора данных таблицы в переменную
    let tableContentCheck = rshbUserCabinet.$OrderList_tableContent;

    expect(tableContentCheck).to.be.not.empty;
    makeScreenshot("SMOKE_РСХБ_КабинетЮзера");
  });
});

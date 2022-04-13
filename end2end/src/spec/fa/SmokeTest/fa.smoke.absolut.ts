import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { absolutOcenka, absolutUserCabinet } from "pages/fa";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";

describe(`FA. SMOKE. Абсолют. Личный Кабинет.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    absolutOcenka.open();
    absolutOcenka.$header_title.waitForDisplayed({ timeout: 5000 });
    makeScreenshot(`SMOKE_Абсолют`);
  });
  it(`Зайти в кабинет`, function () {
    allureReporter.generateReport();
    absolutOcenka.$button_userCabinet.click();
    absolutOcenka.$input_login.waitForDisplayed({ timeout: 10000, reverse: false });
    absolutOcenka.$input_login.click();
    absolutOcenka.$input_login.clearValue();
    absolutOcenka.$input_login.setValue(TestDataFa.Users.login.roman);
    absolutOcenka.$button_send.click();
    absolutOcenka.$input_password.waitForDisplayed({ timeout: 5000 });
    absolutOcenka.$input_password.setValue(TestDataFa.Users.password.roman);
    absolutOcenka.$button_send.click();
    // browser.pause(1000);
  });
  it(`Скриншот личного кабинета`, function () {
    allureReporter.generateReport();
    absolutUserCabinet.waitForLoad();
    // Передача данных селектора данных таблицы в переменную
    let tableContentCheck = absolutUserCabinet.$OrderList_tableContent;

    expect(tableContentCheck).to.be.not.empty;
    // absolutUserCabinet.$table_block.waitForDisplayed({timeout: 10000, reverse: false});
    makeScreenshot("SMOKE_Абсолют_КабинетЮзера");
  });
});

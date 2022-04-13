import { expressOcenka, expressUserCabinet } from "pages/fa";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";

describe(`FA. SMOKE. Экспресс-Сайт. Личный Кабинет.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    expressOcenka.open();
    expressOcenka.$header_title.waitForDisplayed({ timeout: 5000 });
    makeScreenshot(`SMOKE_Экспресс`);
  });
  it(`Зайти в кабинет`, function () {
    allureReporter.generateReport();
    expressOcenka.$button_userCabinet.click();
    expressOcenka.$input_login.waitForDisplayed({ timeout: 10000, reverse: false });
    expressOcenka.$input_login.click();
    expressOcenka.$input_login.clearValue();
    expressOcenka.$input_login.setValue(TestDataFa.Users.login.nilov);
    expressOcenka.$button_send.click();
    expressOcenka.$input_password.waitForDisplayed({ timeout: 5000 });
    expressOcenka.$input_password.click();
    expressOcenka.$input_password.setValue(TestDataFa.Users.password.nilov);
    expressOcenka.$button_send.click();
    // browser.pause(1000);
  });
  it(`Скриншот личного кабинета`, function () {
    allureReporter.generateReport();
    expressUserCabinet.waitForLoad();
    // Передача данных селектора данных таблицы в переменную
    let tableContentCheck = expressUserCabinet.$OrderList_tableContent;

    expect(tableContentCheck).to.be.not.empty;
    makeScreenshot("SMOKE_Экспресс_КабинетЮзера");
  });
});

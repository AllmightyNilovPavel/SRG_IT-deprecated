import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { unicreditOcenka, unicreditUserCabinet } from "pages/fa";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";

describe(`FA. SMOKE. Юникредит. Личный Кабинет.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    unicreditOcenka.open();
    unicreditOcenka.$header_title.waitForDisplayed({ timeout: 5000 });
    makeScreenshot(`SMOKE_Юникредит`);
  });
  it(`Зайти в кабинет`, function () {
    allureReporter.generateReport();
    unicreditOcenka.$button_userCabinet.click();
    unicreditOcenka.$input_login.waitForDisplayed({ timeout: 10000, reverse: false });
    unicreditOcenka.$input_login.click();
    unicreditOcenka.$input_login.clearValue();
    unicreditOcenka.$input_login.setValue(TestDataFa.Users.login.nilov);
    // unicreditOcenka.$input_login.setValue(TestDataFa.Users.login.nilov);
    unicreditOcenka.$button_send.click();
    unicreditOcenka.$input_password.waitForDisplayed({ timeout: 5000 });
    unicreditOcenka.$input_password.click();
    unicreditOcenka.$input_password.setValue(TestDataFa.Users.password.nilov);
    unicreditOcenka.$button_send.click();
  });
  it(`Скриншот личного кабинета`, function () {
    allureReporter.generateReport();
    unicreditUserCabinet.waitForLoad();
    // Передача данных селектора данных таблицы в переменную
    let tableContentCheck = unicreditUserCabinet.$OrderList_tableContent;

    expect(tableContentCheck).to.be.not.empty;
    makeScreenshot("SMOKE_Юникредит_КабинетЮзера");
  });
});

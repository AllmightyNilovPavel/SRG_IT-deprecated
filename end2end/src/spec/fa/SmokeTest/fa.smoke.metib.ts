import { metibOcenka, metibUserCabinet } from "pages/fa";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";

describe(`FA. SMOKE. МеталлИнвест.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    metibOcenka.open();
    metibOcenka.$header_title.waitForDisplayed({ timeout: 5000 });
    makeScreenshot(`SMOKE_МеталлИнвест`);
  });
  it(`Зайти в кабинет`, function () {
    allureReporter.generateReport();
    metibOcenka.$button_userCabinet.click();
    metibOcenka.$input_login.waitForDisplayed({ timeout: 10000, reverse: false });
    metibOcenka.$input_login.click();
    metibOcenka.$input_login.clearValue();
    metibOcenka.$input_login.setValue(TestDataFa.Users.login.nilov);
    metibOcenka.$button_send.click();
    metibOcenka.$input_password.waitForDisplayed({ timeout: 5000 });
    metibOcenka.$input_password.setValue(TestDataFa.Users.password.nilov);
    metibOcenka.$button_send.click();
  });
  it(`Скриншот личного кабинета`, function () {
    allureReporter.generateReport();
    metibUserCabinet.waitForLoad();
    // Передача данных селектора данных таблицы в переменную
    let tableContentCheck = metibUserCabinet.$OrderList_tableContent;

    expect(tableContentCheck).to.be.not.empty;
    makeScreenshot("SMOKE_МеталлИнвест_КабинетЮзера");
  });
});

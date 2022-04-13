import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { bgfOcenka, bgfUserCabinet } from "pages/fa";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";

describe(`FA. SMOKE. БЖФ. Личный Кабинет.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    bgfOcenka.open();
    bgfOcenka.$header_title.waitForDisplayed({ timeout: 5000 });
    makeScreenshot(`SMOKE_БЖФ`);
  });
  it(`Зайти в кабинет`, function () {
    allureReporter.generateReport();
    bgfOcenka.login(TestDataFa.Users.login.roman, TestDataFa.Users.password.roman);
    // browser.pause(1000);
  });
  it(`Скриншот личного кабинета`, function () {
    allureReporter.generateReport();
    bgfUserCabinet.waitForLoad();
    // Передача данных селектора данных таблицы в переменную
    let tableContentCheck = bgfUserCabinet.$OrderList_tableContent;

    expect(tableContentCheck).to.be.not.empty;
    makeScreenshot("SMOKE_БЖФ_КабинетЮзера");
  });
});

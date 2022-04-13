import { sovcomOcenka, sovcomUserCabinet } from "pages/fa";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";

describe(`FA. SMOKE. Совкомбанк. Личный Кабинет.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    sovcomOcenka.open();
    sovcomOcenka.$header_title.waitForDisplayed({ timeout: 5000 });
    makeScreenshot(`SMOKE_Совкомбанк`);
  });
  it(`Зайти в кабинет`, function () {
    allureReporter.generateReport();
    sovcomOcenka.$button_userCabinet.click();
    sovcomOcenka.$input_login.waitForDisplayed({ timeout: 10000, reverse: false });
    sovcomOcenka.$input_login.click();
    sovcomOcenka.$input_login.clearValue();
    sovcomOcenka.$input_login.setValue(TestDataFa.Users.login.nilov);
    // sovcomOcenka.input_login(options.FA.login1);
    sovcomOcenka.$button_send.click();
    sovcomOcenka.$input_password.waitForDisplayed({ timeout: 5000 });
    sovcomOcenka.$input_password.click();
    sovcomOcenka.$input_password.setValue(TestDataFa.Users.password.nilov);
    sovcomOcenka.$button_send.click();
  });
  it(`Скриншот личного кабинета`, function () {
    allureReporter.generateReport();
    sovcomUserCabinet.waitForLoad();
    // Передача данных селектора данных таблицы в переменную
    let tableContentCheck = sovcomUserCabinet.$OrderList_tableContent;

    expect(tableContentCheck).to.be.not.empty;
    makeScreenshot("SMOKE_Совкомбанк_КабинетЮзера");
  });
});

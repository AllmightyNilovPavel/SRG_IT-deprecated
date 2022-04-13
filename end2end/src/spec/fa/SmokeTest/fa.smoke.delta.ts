import { deltaOcenka, deltaUserCabinet } from "pages/fa";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { expect } from "chai";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";

describe(`FA. SMOKE. Росбанк(Дельтакредит). Личный Кабинет.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    deltaOcenka.open();
    deltaOcenka.$header_title.waitForDisplayed({ timeout: 5000 });
    makeScreenshot(`SMOKE_Дельта`);
  });
  it(`Зайти в кабинет`, function () {
    allureReporter.generateReport();
    deltaOcenka.$button_userCabinet.click();
    deltaOcenka.$input_login.waitForDisplayed({ timeout: 10000, reverse: false });
    deltaOcenka.$input_login.click();
    deltaOcenka.$input_login.clearValue();
    deltaOcenka.$input_login.setValue(TestDataFa.Users.login.nilov);
    // deltaOcenka.input_login(options.FA.login1);
    deltaOcenka.$button_send.click();
    deltaOcenka.$input_password.waitForDisplayed({ timeout: 5000 });
    deltaOcenka.$input_password.click();
    deltaOcenka.$input_password.setValue(TestDataFa.Users.password.nilov);
    deltaOcenka.$button_send.click();
    // browser.pause(1000);
  });
  it(`Скриншот личного кабинета`, function () {
    allureReporter.generateReport();
    deltaUserCabinet.waitForLoad();
    // Передача данных селектора данных таблицы в переменную
    let tableContentCheck = deltaUserCabinet.$OrderList_tableContent;

    expect(tableContentCheck).to.be.not.empty;
    makeScreenshot("SMOKE_Дельта_КабинетЮзера");
  });
});

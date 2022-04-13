import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { TestDataFa } from "options/testData/fa";
import { makeScreenshot } from "modules";
import { uralsibOcenka, uralsibUserCabinet } from "pages/fa";

const self = uralsibOcenka;

describe(`FA. SMOKE. Уралсиб. Личный Кабинет.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvFA,
    product: AllureReporterProducts.FA,
    story: this.title,
  });
  it(`Открыть урл`, function () {
    allureReporter.generateReport();
    self.open();
    self.waitForLoad();
    // self.$header_title.waitForDisplayed({ timeout: 20000, reverse: false });
    makeScreenshot(`SMOKE_Уралсиб`);
  });
  it(`Зайти в кабинет`, function () {
    allureReporter.generateReport();
    self.$button_userCabinet.click();
    self.$input_login.waitForDisplayed({ timeout: 10000, reverse: false });
    self.$input_login.click();
    self.$input_login.clearValue();
    self.$input_login.setValue(TestDataFa.Users.login.nilov);
    self.$button_send.click();
    self.$input_password.waitForDisplayed({ timeout: 5000 });
    self.$input_password.click;
    self.$input_password.setValue(TestDataFa.Users.password.nilov);
    self.$button_send.click();
    // browser.pause(1000);
  });
  it(`Скриншот личного кабинета`, function () {
    allureReporter.generateReport();
    uralsibUserCabinet.waitForLoad();
    uralsibUserCabinet.$table_block.waitForDisplayed({ timeout: 30000, reverse: false });
    makeScreenshot("SMOKE_Уралсиб_КабинетЮзера");
  });
});

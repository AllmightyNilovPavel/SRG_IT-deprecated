import { expect } from "chai";
import { makeScreenshot } from "modules";
import {
  AllureReporterHelper,
  AllureReporterProducts,
  AllureTestEnv,
} from "modules/allureReportGenerator";
import { BanksBasicUsers } from "options/testData/krona/testData/banks/krona.testData.banksBasicUsers";
import { KeyBanksBasicUsers } from "options/testData/krona/testData/banks/krona.testData.keyBanksBasicUsers";
import { kronaFooter, kronaLoginPage, kronaNavigationBar, KronaSupportPhones } from "pages/Krona";
import { TestDataKrona } from "options/testData/krona";
import { makeScreenshot } from "modules";

describe(`КРОНА. СМОК. Проверка соответствия телефонов техподдержки.`, function () {
  const allureReporter = new AllureReporterHelper({
    env: AllureTestEnv.EnvKrona,
    product: AllureReporterProducts.KRONA,
    story: this.title,
    issueId: "WEB-32816",
  });
  it(`Проверка телефона ЕКС на странице логина без авторизации.`, function () {
    allureReporter.generateReport();
    kronaLoginPage.open();
    expect(kronaFooter.$textSupportPhoneNumber.getText()).to.contain(KronaSupportPhones.BASIC);
    // console.log('text: ',kronaFooter.$textSupportPhoneNumber.getText());
  });
  it(`Проверка кастомного телефона ЕКС для КЛЮЧЕВЫХ банков.`, function () {
    allureReporter.generateReport();
    for (let i = 0; i < KeyBanksBasicUsers.length; i++) {
      const user = KeyBanksBasicUsers[i];
      kronaLoginPage.login(user[0], user[1]);
      kronaNavigationBar.waitForLoad();
      kronaFooter.waitForLoad();
      expect(kronaFooter.$textSupportPhoneNumber.getText()).to.contain(KronaSupportPhones.CUSTOM);
      makeScreenshot(`Телефон для пользователя ключевого банка ${KeyBanksBasicUsers[i]}`);
      kronaNavigationBar.logout();
    }
  });
  it(`Проверка стандартного телефона ЕКС для остальных банков.`, function () {
    allureReporter.generateReport();
    for (let i = 0; i < BanksBasicUsers.length; i++) {
      const user = BanksBasicUsers[i];
      kronaLoginPage.login(user[0], user[1]);
      kronaNavigationBar.waitForLoad();
      kronaFooter.waitForLoad();
      expect(kronaFooter.$textSupportPhoneNumber.getText()).to.contain(KronaSupportPhones.BASIC);
      makeScreenshot(`Телефон для пользователя не ключевого банка ${BanksBasicUsers[i]}`);
      kronaNavigationBar.logout();
    }
  });
});
